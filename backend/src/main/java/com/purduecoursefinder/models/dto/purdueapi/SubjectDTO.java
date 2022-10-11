package com.purduecoursefinder.models.dto.purdueapi;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

@Data
public class SubjectDTO {
    @JsonProperty("Id")
    private String id;
    
    @JsonProperty("Name")
    private String name;
    
    @JsonProperty("Abbreviation")
    private String abbreviation;
}
