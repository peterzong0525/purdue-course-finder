package com.purduecoursefinder.models;

import java.util.UUID;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import com.purduecoursefinder.models.dto.BuildingMappingDTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "building_mappings")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BuildingMapping {
    @Id
    UUID buildingId;
    
    String name;
    String shortCode;
    
    public static BuildingMapping fromBuildingDTO(BuildingMappingDTO buildingMappingDTO) {
        return BuildingMapping.builder()
            .buildingId(buildingMappingDTO.getId())
            .name(buildingMappingDTO.getName())
            .shortCode(buildingMappingDTO.getShortCode())
            .build();
    }
}
