package com.purduecoursefinder.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
    
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
//        http.authorizeHttpRequests((auths) -> 
//            auths
//                .antMatchers("/login").permitAll()
//                .antMatchers("/register").permitAll()
//                .anyRequest().authenticated());
        http.cors().and().csrf().disable().authorizeRequests().anyRequest().permitAll();
        return http.build();
    }
    
}
