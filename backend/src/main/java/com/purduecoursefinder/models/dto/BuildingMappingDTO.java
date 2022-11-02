package com.purduecoursefinder.models.dto;

import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.purduecoursefinder.models.Building;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BuildingMappingDTO {
    @JsonProperty("Id")
    private UUID id;
    
    @JsonProperty("CampusId")
    private UUID campusId;
    
    @JsonProperty("Name")
    private String name;
    
    @JsonProperty("ShortCode")
    private String shortCode;
    
    public static BuildingMappingDTO fromBuilding(Building building) {
        return BuildingMappingDTO.builder()
                .name(building.getName())
                .shortCode(building.getShortCode())
                .build();
    }
}
