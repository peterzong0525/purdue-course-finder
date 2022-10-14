package com.purduecoursefinder.models.dto;

import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.purduecoursefinder.models.Subject;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SubjectDTO {
    @JsonProperty("Id")
    private UUID id;
    
    @JsonProperty("Name")
    private String name;
    
    @JsonProperty("Abbreviation")
    private String abbreviation;
    
    public static SubjectDTO fromSubject(Subject subject) {
        return SubjectDTO.builder()
                .id(subject.getId())
                .name(subject.getName())
                .abbreviation(subject.getAbbreviation())
                .build();
    }
}
