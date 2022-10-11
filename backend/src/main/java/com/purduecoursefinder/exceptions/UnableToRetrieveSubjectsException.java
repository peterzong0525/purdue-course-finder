package com.purduecoursefinder.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class UnableToRetrieveSubjectsException extends ResponseStatusException {
    public UnableToRetrieveSubjectsException() {
        super(HttpStatus.INTERNAL_SERVER_ERROR, "Unable to retrieve subjects.");
    }
}
