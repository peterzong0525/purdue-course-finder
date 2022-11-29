package com.purduecoursefinder.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.purduecoursefinder.models.dto.BuildingStatisticsDTO;
import com.purduecoursefinder.services.StatisticsService;

@RestController
public class StatisticsController {
    @Autowired
    private StatisticsService statisticsService;
    
    @GetMapping("/statistics/{shortCode}")
    public BuildingStatisticsDTO buildingStatistics(@PathVariable String shortCode) throws JsonMappingException, JsonProcessingException {
        return statisticsService.getBuildingStatistics(shortCode);
    }
}
