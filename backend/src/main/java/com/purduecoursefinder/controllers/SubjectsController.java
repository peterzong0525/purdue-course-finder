package com.purduecoursefinder.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.purduecoursefinder.models.dto.SubjectDTO;
import com.purduecoursefinder.services.PurdueApiService;

@RestController
public class SubjectsController {
    @Autowired
    private PurdueApiService purdueApiService;

    @CrossOrigin
    @GetMapping("/subjects")
    public List<SubjectDTO> subjects() {
        return purdueApiService.getSubjects();
    }
}
