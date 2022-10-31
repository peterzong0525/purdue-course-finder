package com.purduecoursefinder.controllers;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import com.purduecoursefinder.services.AuthenticationService;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
public class AuthenticationControllerTests {
    @Autowired
    private MockMvc mvc;
    
    @MockBean
    private AuthenticationService authenticationService;
    
    @Test
    public void registerTest() throws Exception {
        mvc.perform(post("/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\r\n" + 
                        "    \"email\": \"test2@test2.com\",\r\n" + 
                        "    \"password\": \"password123\"\r\n" + 
                        "}"))
                .andExpect(status().isOk());
    }
    
    @Test
    public void registerBadInputTest() throws Exception {
        mvc.perform(post("/auth/register")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().is4xxClientError());
    }
    
    @Test
    public void loginTest() throws Exception {
        mvc.perform(post("/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\r\n" + 
                        "    \"email\": \"test2@test2.com\",\r\n" + 
                        "    \"password\": \"password123\"\r\n" + 
                        "}"))
                .andExpect(status().isOk());
    }
    
    @Test
    public void loginBadInputTest() throws Exception {
        mvc.perform(post("/auth/login")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().is4xxClientError());
    }
    
    @Test
    public void modifyAccountUnauthenticatedTest() throws Exception {
        mvc.perform(post("/auth/modify-account")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().is4xxClientError());
    }
    
    @Test
    @WithMockUser
    public void modifyAccountTest() throws Exception {
        mvc.perform(post("/auth/modify-account")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\r\n" + 
                        "    \"oldemail\": \"test@test.com\",\r\n" + 
                        "    \"newemail\": \"modified@modified.com\",\r\n" + 
                        "    \"newpassword\": \"modifiedpassword\"\r\n" + 
                        "}"))
                .andExpect(status().isOk());
    }
    
    @Test
    @WithMockUser
    public void modifyAccountBadInputTest() throws Exception {
        mvc.perform(post("/auth/modify-account")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().is4xxClientError());
    }
    
    @Test
    public void deleteAccountUnauthenticatedTest() throws Exception {
        mvc.perform(delete("/auth/delete-user")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().is4xxClientError());
    }
    
    @Test
    @WithMockUser
    public void deleteAccountTest() throws Exception {
        mvc.perform(delete("/auth/delete-user")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }
}
