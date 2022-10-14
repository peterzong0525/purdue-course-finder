package com.purduecoursefinder.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class ExpiredJwtException extends ResponseStatusException {
    public ExpiredJwtException() {
        super(HttpStatus.UNAUTHORIZED, "Expired JWT");
    }
}
