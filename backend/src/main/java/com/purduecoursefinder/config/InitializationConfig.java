package com.purduecoursefinder.config;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.purduecoursefinder.services.PurdueApiService;

import lombok.extern.flogger.Flogger;

@Configuration
@Flogger
public class InitializationConfig {
    @Autowired
    private PurdueApiService purdueApiService;
    
    @Bean
    public void populateDatabase() throws IOException {
        log.atInfo().log("Gathering all courses...");
        purdueApiService.populateAllCourses();
        log.atInfo().log("Finished gathering all courses");
    }
}
