package com.purduecoursefinder.models;

import javax.persistence.Column;
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
    String shortCode;
    
    String name;
    
    @Column(columnDefinition="TEXT")
    String shortCodeLocation;
    
    @Column(columnDefinition="TEXT")
    String outlineCoords;
    
    public static Building fromBuildingDTO(BuildingDTO buildingDTO) {
        return Building.builder()
                .shortCode(buildingDTO.getShortCode())
                .name(buildingDTO.getName())
                .shortCodeLocation(buildingDTO.getShortCodeLocation().toString())
                .outlineCoords(buildingDTO.getOutlineCoords().toString())
                .build();
    }
}
