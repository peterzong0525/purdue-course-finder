package com.purduecoursefinder.models.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BuildingStatisticsDTO {
    private int rooms;
    private int courses;
    private int sections;
    private int meetings;
    
    private BuildingDTO building;
}
