package com.purduecoursefinder.controllers;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.purduecoursefinder.models.dto.LoginDTO;
import com.purduecoursefinder.services.AuthenticationService;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {
    @Autowired
    private AuthenticationService authenticationService;
    
    @PostMapping(value = "/register")
    public void register(@RequestBody LoginDTO login) {
        authenticationService.createUser(login);
    }
    
    @PostMapping(value = "/login")
    public void login(@RequestBody LoginDTO login) {
        authenticationService.loginUser(login);
    }
    
    @DeleteMapping(value = "/delete-user")
    public void deleteAccount() {
        authenticationService.deleteCurrentUser();
    }
    
    @GetMapping(value = "/user")
    public String user(Principal user) {
        return user == null ? "No user..." : user.getName();
    }
}
