package com.purduecoursefinder.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class UnknownSubjectException extends ResponseStatusException {
    public UnknownSubjectException() {
        super(HttpStatus.BAD_REQUEST, "Unknown subject");
    }
}
