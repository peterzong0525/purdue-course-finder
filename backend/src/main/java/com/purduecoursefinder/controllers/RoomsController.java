package com.purduecoursefinder.controllers;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.purduecoursefinder.models.dto.RoomDTO;
import com.purduecoursefinder.services.PurdueApiService;

@RestController
public class RoomsController {
    @Autowired
    private PurdueApiService purdueApiService;
    
    @GetMapping("/rooms/{buildingShortCode}")
    public List<RoomDTO> rooms(@PathVariable String buildingShortCode) throws IOException {
        return purdueApiService.getRooms(buildingShortCode);
    }
}
