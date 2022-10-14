package com.purduecoursefinder.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class LoginFailedException extends ResponseStatusException {
    public LoginFailedException() {
        super(HttpStatus.UNAUTHORIZED);
    }

}
