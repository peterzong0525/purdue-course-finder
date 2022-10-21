package com.purduecoursefinder.models.dto;

import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.purduecoursefinder.models.Instructor;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class InstructorDTO {
    @JsonProperty("Id")
    private UUID id;
    
    @JsonProperty("Name")
    private String name;
    
    @JsonProperty("Email")
    private String email;
    
    public static InstructorDTO fromInstructor(Instructor instructor) {
        return InstructorDTO.builder()
                .id(instructor.getInstructorId())
                .name(instructor.getName())
                .email(instructor.getEmail())
                .build();
    }
}
