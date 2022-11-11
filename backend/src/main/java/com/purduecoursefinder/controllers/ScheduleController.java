package com.purduecoursefinder.controllers;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.purduecoursefinder.models.dto.SectionDTO;
import com.purduecoursefinder.services.PurdueApiService;

@RestController
@RequestMapping("/schedule")
public class ScheduleController {
    @Autowired
    private PurdueApiService purdueApiService;
    
    @GetMapping("/room/{roomId}")
    public List<SectionDTO> roomSchedule(@PathVariable UUID roomId) throws IOException {
        return purdueApiService.getMeetings(roomId);
    }
}
