package com.purduecoursefinder.models.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.purduecoursefinder.models.Building;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BuildingDTO {
    @JsonProperty("Name")
    String name;
    
    @JsonProperty("ShortCode")
    String shortCode;
    
    @JsonProperty("ShortCode_Location")
    JsonNode shortCodeLocation;
    
    @JsonProperty("OutlineCoords")
    JsonNode outlineCoords;
    
    public static BuildingDTO fromBuilding(Building building) throws JsonMappingException, JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        
        return BuildingDTO.builder()
                .name(building.getName())
                .shortCode(building.getShortCode())
                .shortCodeLocation(mapper.readTree(building.getShortCodeLocation()))
                .outlineCoords(mapper.readTree(building.getOutlineCoords()))
                .build();
    }
}
