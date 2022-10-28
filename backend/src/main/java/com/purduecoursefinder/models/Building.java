package com.purduecoursefinder.models;

import java.util.UUID;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import com.purduecoursefinder.models.dto.BuildingDTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "buildings")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Building {
    @Id
    UUID buildingId;
    
    String name;
    String shortCode;
    
    public static Building fromBuildingDTO(BuildingDTO buildingDTO) {
        return Building.builder()
            .buildingId(buildingDTO.getId())
            .name(buildingDTO.getName())
            .shortCode(buildingDTO.getShortCode())
            .build();
    }
}
