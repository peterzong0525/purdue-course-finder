package com.purduecoursefinder.controllers;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.purduecoursefinder.models.dto.LoginDTO;
import com.purduecoursefinder.models.dto.ModifyAccountDTO;
import com.purduecoursefinder.services.AuthenticationService;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {
    @Autowired
    private AuthenticationService authenticationService;

    @CrossOrigin
    @PostMapping(value = "/register")
    public void register(@RequestBody LoginDTO login) {
        authenticationService.createUser(login);
    }

    @CrossOrigin
    @PostMapping(value = "/login")
    public String login(@RequestBody LoginDTO login) {
        return authenticationService.loginUser(login);
    }

    @CrossOrigin
    @PostMapping(value = "/modify-account")
    public void modifyAccount(@RequestBody ModifyAccountDTO account) {
        authenticationService.modifyUser(account);
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
