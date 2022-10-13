package com.purduecoursefinder.models.dto;

import java.util.UUID;

import com.purduecoursefinder.models.Course;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CourseDTO {
    private UUID courseId;
    private String subjectAbbreviation;
    private String courseNumber;
    private String title;
    private Double creditHours;
    private String description;
    
    public static CourseDTO fromCourse(Course course) {
        return CourseDTO.builder()
                .courseId(course.getCourseId())
                .subjectAbbreviation(course.getSubject().getAbbreviation())
                .courseNumber(course.getCourseNumber())
                .title(course.getTitle())
                .creditHours(course.getCreditHours())
                .description(course.getDescription())
                .build();
    }
}
