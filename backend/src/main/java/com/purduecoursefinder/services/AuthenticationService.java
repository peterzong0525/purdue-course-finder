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
import com.purduecoursefinder.models.dto.ModifyAccountDTO;
import com.purduecoursefinder.repositories.UserRepository;

import java.util.Optional;

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

    public void modifyUser(ModifyAccountDTO account) {


        Optional<User> user = userRepository.findByEmail(account.getOldEmail());
        if (user.isPresent()) {
            User existingUser = user.get();

            if (!account.getNewEmail().equals(account.getOldEmail()))
                if (userRepository.findByEmail(account.getNewEmail()).isPresent()) {
                    throw new UserExistsException();
                }
                existingUser.setEmail(account.getNewEmail());

            if (!account.getNewPassword().equals(account.getOldPassword()))
                existingUser.setPassword(passwordEncoder.encode(account.getNewPassword()));

            existingUser = userRepository.save(existingUser);
        } else
            System.out.println("OLD EMAIL NOT FOUND... THIS SHOULD NEVER HAPPEN");


    }

    public void deleteCurrentUser() {
        userRepository.deleteById(SecurityContextHolder.getContext().getAuthentication().getName());
        SecurityContextHolder.getContext().setAuthentication(null);
    }
}
