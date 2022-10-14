package com.purduecoursefinder.controllers;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.purduecoursefinder.models.User;
import com.purduecoursefinder.repositories.UserRepository;

@RestController
@RequestMapping(value = "/test")
public class TestController {
    @Autowired
    private UserRepository userRepository;
    
    @GetMapping()
    public String index(@RequestParam(name = "number", required = false) String number) {
        int num;
        if (number == null) {
            return "It works!";
        }

        try {
            num = Integer.parseInt(number);
            return "It works! Param: " + num;
        } catch (Exception e) {
            return "Error: Provided parameter is not an integer";
        }
    }

    @GetMapping(value = "/signup")
    public String signup(@RequestParam(name = "email", required = true) String email, @RequestParam(name = "password", required = true) String password) {
        userRepository.save(User.builder().email(email).password(password).build());
        return "Signed up, please login.";
    }
    
    @GetMapping(value = "/login")
    public String login(@RequestParam(name = "email", required = true) String email, @RequestParam(name = "password", required = true) String password) {
        Optional<User> user = userRepository.findById(email);
        
        if (user.isEmpty()) {
            return "No user exists for that email.";
        }
        
        if (user.get().getPassword().equals(password)) {
            return "Congratulations, you are logged in.";
        }
        
        return "Unable to login, incorrect password.";
    }

	@GetMapping(value = "/delete-login")
	public String deleteLogin(@RequestParam(name = "email", required = true) String email, @RequestParam(name = "password", required = true) String password) {
        Optional<User> user = userRepository.findById(email);
        
        if (user.isEmpty()) {
            return "No user exists for that email.";
        }
        
        if (user.get().getPassword().equals(password)) {
            userRepository.delete(user.get());
            return "Congratulations, you deleted your account.";
        }
        
        return "Unable to login, incorrect password.";
    }
}
