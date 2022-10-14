package com.purduecoursefinder.models;

import java.util.UUID;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.purduecoursefinder.models.dto.ClassDTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "classes")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Class {
    @Id
    UUID classId;
    
    @ManyToOne
    @JoinColumn(name = "courseId")
    Course course;
    
    public static Class fromClassDTO(ClassDTO classDTO) {
        return Class.builder()
            .classId(classDTO.getId())
            .build();
    }
}
