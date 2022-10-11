package com.purduecoursefinder.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class UnableToRetrieveCoursesException extends ResponseStatusException {
    public UnableToRetrieveCoursesException() {
        super(HttpStatus.INTERNAL_SERVER_ERROR, "Unable to retrieve courses.");
    }
}
