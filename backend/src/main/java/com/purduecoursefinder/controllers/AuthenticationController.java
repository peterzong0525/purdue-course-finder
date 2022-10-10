package com.purduecoursefinder.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.purduecoursefinder.models.dto.LoginDTO;
import com.purduecoursefinder.services.PCFUserDetailsService;

@RestController
public class AuthenticationController {
    @Autowired
    private PCFUserDetailsService userDetailsService;
    
    @PostMapping(value = "/register", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public String register(@RequestBody LoginDTO login) {
        System.out.println("Called!");
        userDetailsService.createUser(login);
        
        System.out.println("User successfully registered!");
        return "User successfully registered";
    }
}
