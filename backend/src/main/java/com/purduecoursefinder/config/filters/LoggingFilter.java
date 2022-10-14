package com.purduecoursefinder.config.filters;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import lombok.extern.flogger.Flogger;

@Component
@Flogger
public class LoggingFilter extends OncePerRequestFilter {
    
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {
        
        log.atInfo().log("Client [%s:%d] requested %s - %s", request.getRemoteAddr(), request.getRemotePort(),
                request.getMethod(), request.getRequestURL().toString());
        
        chain.doFilter(request, response);
    }
}
