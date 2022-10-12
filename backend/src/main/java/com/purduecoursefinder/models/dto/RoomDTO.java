package com.purduecoursefinder.models.dto;

import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

@Data
public class RoomDTO {
    @JsonProperty("Id")
    private UUID id;
    
    @JsonProperty("Number")
    private String number;
    
    @JsonProperty("Building")
    private BuildingDTO building;
}
