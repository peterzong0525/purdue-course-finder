package com.purduecoursefinder.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.purduecoursefinder.exceptions.UserExistsException;
import com.purduecoursefinder.exceptions.LoginFailedException;
import com.purduecoursefinder.models.User;
import com.purduecoursefinder.models.dto.LoginDTO;
import com.purduecoursefinder.repositories.UserRepository;

@Service
public class AuthenticationService {
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    private AuthenticationManager authenticationManager;
    
    public void createUser(LoginDTO login) throws UserExistsException {
        if (userRepository.findByEmail(login.getEmail()).isPresent()) {
            throw new UserExistsException();
        }
        
        User user = new User(login.getEmail(), passwordEncoder.encode(login.getPassword()));
        userRepository.save(user);
    }
    
    public void loginUser(LoginDTO login) throws LoginFailedException {
        try {
            Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                    login.getEmail(), login.getPassword()));

            SecurityContextHolder.getContext().setAuthentication(authentication);
        } catch (Exception e){
            throw new LoginFailedException();
        }
    }

    public void deleteCurrentUser() {
        userRepository.deleteById(SecurityContextHolder.getContext().getAuthentication().getName());
        SecurityContextHolder.getContext().setAuthentication(null);
    }
}
