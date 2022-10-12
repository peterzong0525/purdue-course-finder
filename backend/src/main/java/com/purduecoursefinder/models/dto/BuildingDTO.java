package com.purduecoursefinder.models.dto;

import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

@Data
public class BuildingDTO {
    @JsonProperty("Id")
    private UUID id;
    
    @JsonProperty("CampusId")
    private UUID campusId;
    
    @JsonProperty("Name")
    private String name;
    
    @JsonProperty("ShortCode")
    private String shortCode;
}
