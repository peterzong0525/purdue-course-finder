package com.purduecoursefinder.services;

import javax.transaction.Transactional;

import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.purduecoursefinder.models.User;
import com.purduecoursefinder.repositories.UserRepository;
import com.purduecoursefinder.security.PCFUserDetails;

@Service
public class PCFUserDetailsService implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;
    
    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(username).orElseThrow(() -> new UsernameNotFoundException("User with that email does not exist."));
        
        // After this method the lists in user will not be able to be initialized
        // because the session context is closed (or something like that) I believe.
        // That is why they are manually initialized here. Usually they would be loaded
        // when accessed. This might cause a Catesian product problem, not sure.
        // This ate away so much time I'm sticking with this working solution for now.
        // This is worth returning to later.
        Hibernate.initialize(user.getFavoriteCourses());
        Hibernate.initialize(user.getFavoriteSections());        
        Hibernate.initialize(user.getFavoriteBuildings());
        
        return new PCFUserDetails(user);
    }
}
