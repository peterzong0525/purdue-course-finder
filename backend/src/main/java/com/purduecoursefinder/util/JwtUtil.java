package com.purduecoursefinder.util;

import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.purduecoursefinder.exceptions.ExpiredJwtException;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Component
public class JwtUtil {
    @Value("${jwt.secret}")
    private String secret;
    
    public String generateJwt(String email) {
        return Jwts.builder()
            .setSubject(email)
            .setIssuedAt(new Date())
            .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 2))
            .signWith(SignatureAlgorithm.HS512,  secret)
            .compact();
    }
    
    public String getTokenEmail(String token) {
        Claims parsed = Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody();
        
        if (parsed.getExpiration().before(new Date())) {
            throw new ExpiredJwtException();
        }
        
        return parsed.getSubject();
    }
}
