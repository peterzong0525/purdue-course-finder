package com.purduecoursefinder.models;

import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.purduecoursefinder.models.dto.purdueapi.CourseDTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "courses")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Course {
    @Id
    UUID id;
    
    String title;
    String courseNumber;
    Double creditHours;
    
    @Column(columnDefinition="TEXT")
    String description;
    
    @ManyToOne
    @JoinColumn(name = "subject")
    Subject subject;
    
    public static Course fromCourseDTO(CourseDTO courseDTO) {
        return Course.builder()
            .id(UUID.fromString(courseDTO.getId()))
            .title(courseDTO.getTitle())
            .courseNumber(courseDTO.getNumber())
            .creditHours(courseDTO.getCreditHours())
            .description(courseDTO.getDescription())
            .subject(Subject.builder().id(UUID.fromString(courseDTO.getSubjectId())).build())
            .build();
    }
}
