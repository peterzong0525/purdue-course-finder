package com.purduecoursefinder.models.dto;

import java.util.List;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

@Data
public class CourseDTO {
    @JsonProperty("Id")
    private UUID id;
    
    @JsonProperty("Number")
    private String number;
    
    @JsonProperty("SubjectId")
    private String subjectId;
    
    @JsonProperty("Title")
    private String title;
    
    @JsonProperty("CreditHours")
    private Double creditHours;
    
    @JsonProperty("Description")
    private String description;
    
    @JsonProperty("Classes")
    private List<ClassDTO> classes;
}
