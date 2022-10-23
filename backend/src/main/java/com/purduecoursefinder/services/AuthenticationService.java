package com.purduecoursefinder.services;

import java.util.ArrayList;
import java.util.Optional;
import java.util.UUID;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.purduecoursefinder.exceptions.LoginFailedException;
import com.purduecoursefinder.exceptions.UserExistsException;
import com.purduecoursefinder.models.Course;
import com.purduecoursefinder.models.Section;
import com.purduecoursefinder.models.User;
import com.purduecoursefinder.models.dto.LoginDTO;
import com.purduecoursefinder.models.dto.ModifyAccountDTO;
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
        
        User user = User.builder()
                .email(login.getEmail())
                .password(passwordEncoder.encode(login.getPassword()))
                .favoriteCourses(new ArrayList<Course>())
                .favoriteSections(new ArrayList<Section>())
                .build();
        user.getFavoriteSections().add(Section.builder().sectionId(UUID.fromString("28230dfd-d5e4-4529-ac60-0b4d44eb17c5")).build());
        userRepository.save(user);
    }
    
    public String loginUser(LoginDTO login) {
        try { 
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                    login.getEmail(), login.getPassword()));
        } catch (Exception e) {
            throw new LoginFailedException();
        }
        
        
        return jwtUtil.generateJwt(login.getEmail());
    }

    public String modifyUser(ModifyAccountDTO account) {
        Optional<User> user = userRepository.findByEmail(account.getOldEmail());
        if (user.isPresent()) {
            User existingUser = user.get();

            if (!account.getNewEmail().equals(account.getOldEmail()))
                if (userRepository.findByEmail(account.getNewEmail()).isPresent()) {
                    throw new UserExistsException();
                }
                existingUser.setEmail(account.getNewEmail());

            if (!account.getNewPassword().equals("........."))
                existingUser.setPassword(passwordEncoder.encode(account.getNewPassword()));

            existingUser = userRepository.save(existingUser);
            return jwtUtil.generateJwt(account.getNewEmail());
        } else {
            System.out.println("OLD EMAIL NOT FOUND... THIS SHOULD NEVER HAPPEN"); // TODO: Replace with log, throw 500
            return "";
        }

    }

    @Transactional
    public void deleteCurrentUser() {
        userRepository.deleteByEmail(SecurityContextHolder.getContext().getAuthentication().getName());
        SecurityContextHolder.getContext().setAuthentication(null);
    }

}
