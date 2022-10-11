package com.purduecoursefinder.controllers;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.purduecoursefinder.models.dto.LoginDTO;
import com.purduecoursefinder.services.PCFUserDetailsService;

@RestController
public class AuthenticationController {
    @Autowired
    private PCFUserDetailsService userDetailsService;
    
    @Autowired
    private AuthenticationManager authenticationManager;
    
    @PostMapping(value = "/register")
    public String register(@RequestBody LoginDTO login) {
        userDetailsService.createUser(login);

        return "User successfully registered";
    }
    
    @PostMapping(value = "/login")
    public String login(@RequestBody LoginDTO login) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                login.getEmail(), login.getPassword()));
        
        SecurityContextHolder.getContext().setAuthentication(authentication);
        
        return "User successfully logged in";
    }
    
    @GetMapping(value = "/user")
    public String user(Principal user) {
        return user == null ? "No user..." : user.getName();
    }
}
