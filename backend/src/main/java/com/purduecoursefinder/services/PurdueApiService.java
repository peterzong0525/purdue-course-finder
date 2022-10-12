package com.purduecoursefinder.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import com.purduecoursefinder.exceptions.UnableToRetrieveCoursesException;
import com.purduecoursefinder.exceptions.UnableToRetrieveSubjectsException;
import com.purduecoursefinder.models.Building;
import com.purduecoursefinder.models.Class;
import com.purduecoursefinder.models.Course;
import com.purduecoursefinder.models.Meeting;
import com.purduecoursefinder.models.Room;
import com.purduecoursefinder.models.Section;
import com.purduecoursefinder.models.Subject;
import com.purduecoursefinder.models.dto.ClassDTO;
import com.purduecoursefinder.models.dto.CourseDTO;
import com.purduecoursefinder.models.dto.MeetingDTO;
import com.purduecoursefinder.models.dto.SectionDTO;
import com.purduecoursefinder.models.dto.SubjectDTO;
import com.purduecoursefinder.models.dto.purdueapi.CoursesRequestDTO;
import com.purduecoursefinder.models.dto.purdueapi.SubjectsRequestDTO;
import com.purduecoursefinder.repositories.BuildingRepository;
import com.purduecoursefinder.repositories.ClassRepository;
import com.purduecoursefinder.repositories.CourseRepository;
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
    private RoomRepository roomRepository;
    
    @Autowired
    private BuildingRepository buildingRepository;
    
    @Value("${pcf.api-url}")
    private String apiUrl;
    
    @Value("${pcf.refresh-cache-millis}")
    private long refreshCacheMillis;
    
    public List<Class> getCourses(String subjectAbbreviation) {
//String url = apiUrl + "/odata/Courses?$expand=Classes($filter=Term/Code eq '202210';$expand=Sections($expand=Meetings($expand=Room($expand=Building))))&$filter=Subject/Abbreviation eq 'CS'";
//        
//        CoursesRequestDTO apiCourses = restTemplate.getForObject(url, CoursesRequestDTO.class);
//        return apiCourses.getValue();
        
        Optional<Subject> subjectOpt = subjectRepository.findByAbbreviation(subjectAbbreviation);
        Subject subject;
        
        if (subjectOpt.isPresent() && System.currentTimeMillis() - subjectOpt.get().getLastRefresh() < refreshCacheMillis) {
            subject = subjectOpt.get();
            
            System.out.println("Returning cached courses...");
//            return courseRepository.findBySubjectId(subject.getId());
        }
        
        subject = createSubjectFromAbbreviation(subjectAbbreviation);
        subjectRepository.save(subject);
        

        // In the future implement something similar to what is commented below.
//        String url = UriComponentsBuilder.fromHttpUrl(apiUrl + "/odata/Courses")
//                .queryParam("$filter", "Subject/Abbreviation eq '" + subject.getAbbreviation() + "'")
//                .queryParam("$orderby", "Number asc")
//                .build().toUriString();
        
        String url = apiUrl + "/odata/Courses?$expand=Classes($filter=Term/Code eq '202210';$expand=Sections($expand=Meetings($expand=Room($expand=Building))))&$filter=Subject/Abbreviation eq '" + subjectAbbreviation + "'";
        
        CoursesRequestDTO apiCourses = restTemplate.getForObject(url, CoursesRequestDTO.class);
        
        if (apiCourses == null) {
            throw new UnableToRetrieveCoursesException();
        }
        
        List<Course> courses = new ArrayList<Course>();
        
        for (CourseDTO courseDTO : apiCourses.getValue()) {
            Course course = Course.fromCourseDTO(courseDTO);
            course.setSubject(subject);
            courseRepository.save(course);
            courses.add(course);
            
            for (ClassDTO classDTO : courseDTO.getClasses()) {
                // Test against Purdue West Lafayette ID
                if (!classDTO.getCampusId().toString().equals("69fe4158-6eaf-4d27-8c81-74806f770db3")) {
                    continue;
                }
                
                Class cls = Class.fromClassDTO(classDTO);
                cls.setCourse(course);
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
                        
                        Room room = meeting.getRoom();
                        Building building = room.getBuilding();
                        
                        buildingRepository.save(building);
                        roomRepository.save(room);
                        meetingRepository.save(meeting);
                    }
                }
            }
        }
        
        System.out.println("Returning courses from API...");
        return classRepository.findAll();
    }
    
    private Subject createSubjectFromAbbreviation(String abbreviation) {
        String url = UriComponentsBuilder.fromHttpUrl(apiUrl + "/odata/Subjects")
                .queryParam("$filter", "Abbreviation eq '" + abbreviation.toUpperCase() + "'")
                .build().toUriString();
        
        SubjectsRequestDTO subjectsRequestDTO = restTemplate.getForObject(url, SubjectsRequestDTO.class);
        
        if (subjectsRequestDTO == null) {
            throw new UnableToRetrieveSubjectsException();
        }
        
        for (SubjectDTO subjectDTO : subjectsRequestDTO.getValue()) {
            if (subjectDTO.getAbbreviation().equals(abbreviation)) {
                return Subject.builder()
                        .id(UUID.fromString(subjectDTO.getId()))
                        .name(subjectDTO.getName())
                        .abbreviation(subjectDTO.getAbbreviation())
                        .lastRefresh(System.currentTimeMillis())
                        .build();
            }
        }
        
        return null; // TODO: Better error handling
    }
}
