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
import com.purduecoursefinder.models.Course;
import com.purduecoursefinder.models.Subject;
import com.purduecoursefinder.models.dto.purdueapi.CourseDTO;
import com.purduecoursefinder.models.dto.purdueapi.CoursesRequestDTO;
import com.purduecoursefinder.models.dto.purdueapi.SubjectDTO;
import com.purduecoursefinder.models.dto.purdueapi.SubjectsRequestDTO;
import com.purduecoursefinder.repositories.CourseRepository;
import com.purduecoursefinder.repositories.SubjectRepository;

@Service
public class PurdueApiService {
    @Autowired
    private RestTemplate restTemplate;
    
    @Autowired
    private CourseRepository courseRepository;
    
    @Autowired
    private SubjectRepository subjectRepository;
    
    @Value("${pcf.api-url}")
    private String apiUrl;
    
    @Value("${pcf.refresh-cache-millis}")
    private long refreshCacheMillis;
    
    public List<Course> getCourses(String subjectAbbreviation) {
        Optional<Subject> subjectOpt = subjectRepository.findByAbbreviation(subjectAbbreviation);
        Subject subject;
        
        if (subjectOpt.isPresent() && System.currentTimeMillis() - subjectOpt.get().getLastRefresh() < refreshCacheMillis) {
            subject = subjectOpt.get();
            
            System.out.println("Returning cached courses...");
            return courseRepository.findBySubjectId(subject.getId());
        }
        
        subject = createSubjectFromAbbreviation(subjectAbbreviation);
        subjectRepository.save(subject);
        
        
        String url = UriComponentsBuilder.fromHttpUrl(apiUrl + "/odata/Courses")
                .queryParam("$filter", "Subject/Abbreviation eq '" + subject.getAbbreviation() + "'")
                .queryParam("$orderby", "Number asc")
                .build().toUriString();
        
        CoursesRequestDTO apiCourses = restTemplate.getForObject(url, CoursesRequestDTO.class);
        
        if (apiCourses == null) {
            throw new UnableToRetrieveCoursesException();
        }
        
        List<Course> courses = new ArrayList<Course>();
        
        for (CourseDTO courseDTO : apiCourses.getValue()) {
            Course c = Course.fromCourseDTO(courseDTO);
            courses.add(c);
        }

        courseRepository.saveAll(courses);
        
        System.out.println("Returning courses from API...");
        return courses;
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
