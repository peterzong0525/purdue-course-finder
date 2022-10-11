package com.purduecoursefinder.services;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.purduecoursefinder.exceptions.UserExistsException;
import com.purduecoursefinder.models.User;
import com.purduecoursefinder.models.dto.LoginDTO;
import com.purduecoursefinder.repositories.UserRepository;

@Service
public class PCFUserDetailsService implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(username).orElseThrow(() -> new UsernameNotFoundException("User with that email does not exist."));
        return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(), new ArrayList<GrantedAuthority>());
    }
    
    public void createUser(LoginDTO login) throws UserExistsException {
        if (userRepository.findByEmail(login.getEmail()).isPresent()) {
            throw new UserExistsException();
        }
        
        User user = new User(login.getEmail(), passwordEncoder.encode(login.getPassword()));
        userRepository.save(user);
    }

}
