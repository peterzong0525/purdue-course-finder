package com.purduecoursefinder.models.dto.purdueapi;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

@Data
public class CourseDTO {
    @JsonProperty("Id")
    private String id;
    
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
}
