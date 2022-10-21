package com.purduecoursefinder.models;

import java.util.UUID;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import com.purduecoursefinder.models.dto.InstructorDTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "instructors")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Instructor {
    @Id
    UUID instructorId;
    
    String name;
    String email;
    
    public static Instructor fromInstructorDTO(InstructorDTO instructor) {
        return Instructor.builder()
                .instructorId(instructor.getId())
                .name(instructor.getName())
                .email(instructor.getEmail())
                .build();
    }
}
