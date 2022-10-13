package com.purduecoursefinder.models;

import java.util.List;
import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.purduecoursefinder.models.dto.CourseApiDTO;

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
    UUID courseId;
    
    String title;
    String courseNumber;
    Double creditHours;
    
    @Column(columnDefinition="TEXT")
    String description;
    
    @ManyToOne
    @JoinColumn(name = "subjectId")
    Subject subject;
    
    @OneToMany
    List<Class> classes;
    
    public static Course fromCourseApiDTO(CourseApiDTO courseApiDTO) {
        return Course.builder()
            .courseId(courseApiDTO.getId())
            .title(courseApiDTO.getTitle())
            .courseNumber(courseApiDTO.getNumber())
            .creditHours(courseApiDTO.getCreditHours())
            .description(courseApiDTO.getDescription())
            .build();
    }
}
