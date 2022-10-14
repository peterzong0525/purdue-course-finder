package com.purduecoursefinder.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.purduecoursefinder.exceptions.UserExistsException;
import com.purduecoursefinder.models.User;
import com.purduecoursefinder.models.dto.LoginDTO;
import com.purduecoursefinder.repositories.UserRepository;
import com.purduecoursefinder.util.JwtUtil;

@Service
public class AuthenticationService {
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    private AuthenticationManager authenticationManager;
    
    @Autowired
    private JwtUtil jwtUtil;
    
    public void createUser(LoginDTO login) throws UserExistsException {
        if (userRepository.findByEmail(login.getEmail()).isPresent()) {
            throw new UserExistsException();
        }
        
        User user = new User(login.getEmail(), passwordEncoder.encode(login.getPassword()));
        userRepository.save(user);
    }
    
    public String loginUser(LoginDTO login) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                login.getEmail(), login.getPassword()));
        
        return jwtUtil.generateJwt(login.getEmail());
    }

    public void deleteCurrentUser() {
        userRepository.deleteById(SecurityContextHolder.getContext().getAuthentication().getName());
        SecurityContextHolder.getContext().setAuthentication(null);
    }
}
