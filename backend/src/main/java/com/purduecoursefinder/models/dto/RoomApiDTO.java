package com.purduecoursefinder.models.dto;

import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

@Data
public class RoomApiDTO {
    @JsonProperty("Id")
    private UUID id;
    
    @JsonProperty("Number")
    private String number;
    
    @JsonProperty("BuildingId")
    private UUID buildingId;
}
