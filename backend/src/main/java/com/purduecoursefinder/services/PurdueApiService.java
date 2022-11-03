package com.purduecoursefinder.services;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.purduecoursefinder.exceptions.UnableToRetrieveCoursesException;
import com.purduecoursefinder.exceptions.UnableToRetrieveSubjectsException;
import com.purduecoursefinder.exceptions.UnknownSubjectException;
import com.purduecoursefinder.models.Building;
import com.purduecoursefinder.models.BuildingMapping;
import com.purduecoursefinder.models.Course;
import com.purduecoursefinder.models.Instructor;
import com.purduecoursefinder.models.Meeting;
import com.purduecoursefinder.models.PCFClass;
import com.purduecoursefinder.models.Room;
import com.purduecoursefinder.models.Section;
import com.purduecoursefinder.models.Subject;
import com.purduecoursefinder.models.dto.BuildingDTO;
import com.purduecoursefinder.models.dto.BuildingMappingDTO;
import com.purduecoursefinder.models.dto.BuildingsFileDTO;
import com.purduecoursefinder.models.dto.ClassDTO;
import com.purduecoursefinder.models.dto.CourseApiDTO;
import com.purduecoursefinder.models.dto.CourseDTO;
import com.purduecoursefinder.models.dto.MeetingDTO;
import com.purduecoursefinder.models.dto.SectionDTO;
import com.purduecoursefinder.models.dto.SubjectDTO;
import com.purduecoursefinder.models.dto.purdueapi.BuildingsRequestDTO;
import com.purduecoursefinder.models.dto.purdueapi.CoursesRequestDTO;
import com.purduecoursefinder.models.dto.purdueapi.SubjectsRequestDTO;
import com.purduecoursefinder.repositories.BuildingMappingRepository;
import com.purduecoursefinder.repositories.BuildingRepository;
import com.purduecoursefinder.repositories.ClassRepository;
import com.purduecoursefinder.repositories.CourseRepository;
import com.purduecoursefinder.repositories.InstructorRepository;
import com.purduecoursefinder.repositories.MeetingRepository;
import com.purduecoursefinder.repositories.RoomRepository;
import com.purduecoursefinder.repositories.SectionRepository;
import com.purduecoursefinder.repositories.SubjectRepository;

@Service
public class PurdueApiService {
    @Autowired
    private RestTemplate restTemplate;
    
    @Autowired
    private SubjectRepository subjectRepository;
    
    @Autowired
    private CourseRepository courseRepository;
    
    @Autowired
    private ClassRepository classRepository;
    
    @Autowired
    private SectionRepository sectionRepository;
    
    @Autowired
    private MeetingRepository meetingRepository;
    
    @Autowired
    private InstructorRepository instructorRepository;
    
    @Autowired
    private RoomRepository roomRepository;
    
    @Autowired
    private BuildingMappingRepository buildingMappingRepository;
    
    @Autowired
    private BuildingRepository buildingRepository;
    
    @Value("${pcf.buildings-data-file-location}")
    private Resource buildingsDataFile;
    
    @Value("${pcf.api-url}")
    private String apiUrl;
    
    @Value("${pcf.refresh-cache-millis}")
    private long refreshCacheMillis;
    
    public List<SectionDTO> getSections(UUID courseId) {
        List<PCFClass> classes = courseRepository.findById(courseId).orElseThrow().getClasses();
        List<SectionDTO> sections = new ArrayList<SectionDTO>();
        
        for (PCFClass cls : classes) {
            sections.addAll(sectionRepository.findAllByCls(cls).stream().map(section -> {
                SectionDTO s = SectionDTO.fromSection(section);
                s.setMeetings(meetingRepository.findAllBySection(section).stream().map(meeting -> MeetingDTO.fromMeeting(meeting)).collect(Collectors.toList()));
                return s;
            }).collect(Collectors.toList()));
        }
        
        return sections;
    }
    
    public List<CourseDTO> getCourses(String subjectAbbreviation) throws IOException {
        getBuildings(); // Make sure buildings are populated.
        
        Optional<Subject> subjectOpt = subjectRepository.findByAbbreviation(subjectAbbreviation.toUpperCase());
        Subject subject;
        
        if (subjectOpt.isEmpty()) {
            populateSubjectRepository();
            
            subjectOpt = subjectRepository.findByAbbreviation(subjectAbbreviation.toUpperCase());
            
            if (subjectOpt.isPresent()) {
                subject = subjectOpt.get();
            } else {
                throw new UnknownSubjectException();
            }
        } else {
            subject = subjectOpt.get();
        }
        
        if (System.currentTimeMillis() - subjectOpt.get().getLastRefresh() < refreshCacheMillis) {
            System.out.println("Returning cached courses...");
            return courseRepository.findBySubjectId(subject.getId()).stream().map(course -> course.getClasses().size() > 0 ? course : null).filter(Objects::nonNull).map(course -> CourseDTO.fromCourse(course)).collect(Collectors.toList());
        }
        
        subject.setLastRefresh(System.currentTimeMillis());
        subjectRepository.save(subject);

        // In the future implement something similar to what is commented below.
//        String url = UriComponentsBuilder.fromHttpUrl(apiUrl + "/odata/Courses")
//                .queryParam("$filter", "Subject/Abbreviation eq '" + subject.getAbbreviation() + "'")
//                .queryParam("$orderby", "Number asc")
//                .build().toUriString();
        
        String url = apiUrl + "/odata/Courses?$expand=Classes($filter=Term/Code eq '202310';$expand=Sections($expand=Meetings($expand=Room($expand=Building)&$expand=Instructors)))&$filter=Subject/Abbreviation eq '" + subjectAbbreviation.toUpperCase() + "'";
        
        CoursesRequestDTO apiCourses = restTemplate.getForObject(url, CoursesRequestDTO.class);
        
        if (apiCourses == null) {
            throw new UnableToRetrieveCoursesException();
        }
        
        for (CourseApiDTO courseDTO : apiCourses.getValue()) {
            Course course = Course.fromCourseApiDTO(courseDTO);
            course.setSubject(subject);
            courseRepository.save(course);
            
            List<PCFClass> classes = new ArrayList<PCFClass>();
            
            for (ClassDTO classDTO : courseDTO.getClasses()) {
                // Test against Purdue West Lafayette ID
                if (!classDTO.getCampusId().toString().equals("69fe4158-6eaf-4d27-8c81-74806f770db3")) {
                    continue;
                }
                
                PCFClass cls = PCFClass.fromClassDTO(classDTO);
                cls.setCourse(course);
                classes.add(cls);
                classRepository.save(cls);
                
                for (SectionDTO sectionDTO : classDTO.getSections()) {
                    Section section = Section.fromSectionDTO(sectionDTO);
                    section.setCls(cls);
                    sectionRepository.save(section);
                    
                    for (MeetingDTO meetingDTO : sectionDTO.getMeetings()) {
                        // Test against Purdue West Lafayette ID (potentially redundant check)
                        if (!meetingDTO.getRoom().getBuilding().getCampusId().toString().equals("69fe4158-6eaf-4d27-8c81-74806f770db3")) {
                            continue;
                        }
                        
                        Meeting meeting = Meeting.fromMeetingDTO(meetingDTO);
                        meeting.setSection(section);
                        
                        for (Instructor instructor : meeting.getInstructors()) {
                            instructorRepository.save(instructor);
                        }
                        
                        Room room = meeting.getRoom();
                        room.setBuilding(buildingRepository.findById(meetingDTO.getRoom().getBuilding().getShortCode()).orElse(buildingRepository.findById("N/A").orElseThrow()));
                        Building building = room.getBuilding();
                        
                        buildingRepository.save(building);
                        roomRepository.save(room);
                        meetingRepository.save(meeting);
                    }
                    
                    classRepository.save(cls);
                }
            }
            
            course.setClasses(classes);
            courseRepository.save(course);
        }
        
        System.out.println("Returning courses from API...");
        return courseRepository.findBySubjectId(subject.getId()).stream().map(course -> course.getClasses().size() > 0 ? course : null).filter(Objects::nonNull).map(course -> CourseDTO.fromCourse(course)).collect(Collectors.toList());
    }
    
    public List<SubjectDTO> getSubjects() {
        List<SubjectDTO> subjects = subjectRepository.findAll().stream().map(SubjectDTO::fromSubject).collect(Collectors.toList());
        
        if (subjects.size() == 0) {
            populateSubjectRepository();
            subjects = subjectRepository.findAll().stream().map(SubjectDTO::fromSubject).collect(Collectors.toList());
        }
        
        return subjects;
    }
    
    public List<BuildingDTO> getBuildings() throws IOException {
        if (buildingMappingRepository.count() == 0L) {
            populateBuildingMappingsRepository();
            loadBuildingsFile();
        }
        
        return buildingRepository.findAll().stream().map(t -> {
            try {
                return BuildingDTO.fromBuilding(t);
            } catch (JsonMappingException e) {
                e.printStackTrace();
            } catch (JsonProcessingException e) {
                e.printStackTrace();
            }
            return null;
        }).toList();
    }
    
    private void populateSubjectRepository() {
        SubjectsRequestDTO subjectsRequestDTO = restTemplate.getForObject(apiUrl + "/odata/Subjects", SubjectsRequestDTO.class);
        
        if (subjectsRequestDTO == null) {
            throw new UnableToRetrieveSubjectsException();
        }
        
        for (SubjectDTO subjectDTO : subjectsRequestDTO.getValue()) {
                subjectRepository.save(Subject.builder()
                    .id(subjectDTO.getId())
                    .name(subjectDTO.getName())
                    .abbreviation(subjectDTO.getAbbreviation())
                    .lastRefresh(0L)
                    .build());
        }
    }
    
    private void loadBuildingsFile() throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        
        BuildingsFileDTO bf = objectMapper.readValue(buildingsDataFile.getInputStream(), BuildingsFileDTO.class);
        
        for (BuildingDTO buildingDTO : bf.getBuildings()) {
            buildingRepository.save(Building.fromBuildingDTO(buildingDTO));
        }
        
        buildingRepository.save(Building.builder().name("N/A").shortCode("N/A").shortCodeLocation("{}").outlineCoords("[]").build());
    }
    
    // TODO: Figure out if this is necessary. It probably isn't.
    private void populateBuildingMappingsRepository() {
        BuildingsRequestDTO buildingsRequestDTO = restTemplate.getForObject(apiUrl + "/odata/Buildings", BuildingsRequestDTO.class);
        
        if (buildingsRequestDTO == null) {
            throw new UnableToRetrieveSubjectsException();
        }
        
        for (BuildingMappingDTO buildingMappingDTO : buildingsRequestDTO.getValue()) {
                buildingMappingRepository.save(BuildingMapping.fromBuildingDTO(buildingMappingDTO));
        }
    }
}
