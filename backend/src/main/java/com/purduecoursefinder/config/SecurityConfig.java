package com.purduecoursefinder.config;

import javax.servlet.http.HttpServletResponse;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
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
        http.authorizeHttpRequests()
            .antMatchers("/auth/register").permitAll()
            .antMatchers("/auth/login").permitAll()
            .antMatchers("/courses/*").permitAll()
            .antMatchers("/subjects").permitAll()
            .antMatchers("/auth/modify-account").permitAll()
            .anyRequest().authenticated()
            .and().cors().disable().csrf().disable() // TODO: Fix the security issues this line implies
            .logout().logoutUrl("/auth/logout").logoutSuccessHandler((request, response, authentication) -> {
                response.setStatus(HttpServletResponse.SC_OK);
            });
        return http.build();
    }
    
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration)
            throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }
    
}
