package com.purduecoursefinder.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class InvalidAuthorizationHeaderException extends ResponseStatusException {
    public InvalidAuthorizationHeaderException() {
        super(HttpStatus.UNAUTHORIZED, "Invalid Authorization Header");
    }
}
