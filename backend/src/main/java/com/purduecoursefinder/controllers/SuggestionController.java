package com.purduecoursefinder.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.purduecoursefinder.services.SuggestionService;

@RestController
public class SuggestionController {
    @Autowired
    private SuggestionService suggestionService;
    
    @PostMapping("/suggestion")
    public void suggestion(@RequestBody String suggestion) {
        suggestionService.saveSuggestion(suggestion);
    }
}
