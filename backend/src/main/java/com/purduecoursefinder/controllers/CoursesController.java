package com.purduecoursefinder.controllers;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.purduecoursefinder.models.dto.CourseDTO;
import com.purduecoursefinder.services.PurdueApiService;

@RestController
public class CoursesController {
    @Autowired
    private PurdueApiService purdueApiService;

    @GetMapping("/courses/{subject}")
    public List<CourseDTO> courses(@PathVariable String subject) throws IOException {
//        String url = UriComponentsBuilder.fromHttpUrl("https://api.purdue.io/odata/Courses")
//                .queryParam("$filter", "Subject/Abbreviation eq '" + subject.toUpperCase() + "'")
//                .queryParam("$orderby", "Number asc")
//                .build().toUriString();
//        
//        CoursesRequestDTO courses = restTemplate.getForObject(url, CoursesRequestDTO.class);
        
        return purdueApiService.getCourses(subject);
    }
}
