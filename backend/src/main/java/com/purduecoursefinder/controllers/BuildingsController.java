package com.purduecoursefinder.controllers;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.purduecoursefinder.models.dto.BuildingDTO;
import com.purduecoursefinder.services.PurdueApiService;

@RestController
public class BuildingsController {
    @Autowired
    private PurdueApiService purdueApiService;
    
    @GetMapping("/buildings")
    public List<BuildingDTO> buildings() throws IOException {
        return purdueApiService.getBuildings();
    }
}
