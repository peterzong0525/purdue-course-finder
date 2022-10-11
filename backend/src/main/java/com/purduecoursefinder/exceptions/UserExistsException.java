package com.purduecoursefinder.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class UserExistsException extends ResponseStatusException {
    public UserExistsException() {
        super(HttpStatus.CONFLICT, "A user with that email address already exists.");
    }
    
}
