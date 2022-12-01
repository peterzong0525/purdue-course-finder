package com.purduecoursefinder.controllers;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
public class SuggestionControllerTests {
    @Autowired
    private MockMvc mvc;
    
    @Test
    public void postSuggestionTest() throws Exception {
        mvc.perform(post("/suggestion")
                .contentType(MediaType.APPLICATION_JSON)
                .content("Test suggestion"))
                .andExpect(status().isOk());
    }
    
    @Test
    @WithMockUser
    public void postSuggestionAuthenticatedTest() throws Exception {
        mvc.perform(post("/suggestion")
                .contentType(MediaType.APPLICATION_JSON)
                .content("Test suggestion"))
                .andExpect(status().isOk());
    }
}
