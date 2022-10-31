package com.purduecoursefinder.controllers;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.UUID;

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

import com.purduecoursefinder.services.FavoritesService;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
public class FavoritesControllerTests {
    @Autowired
    private MockMvc mvc;
    
    @MockBean
    private FavoritesService favoritesService;
    
    @Test
    @WithMockUser
    public void getFavoriteCoursesTest() throws Exception {
        mvc.perform(get("/favorites/courses")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }
    
    @Test
    @WithMockUser
    public void getFavoriteSectionsTest() throws Exception {
        mvc.perform(get("/favorites/sections")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }
    
    @Test
    @WithMockUser
    public void getFavoriteBuildingsTest() throws Exception {
        mvc.perform(get("/favorites/buildings")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }
    
    @Test
    @WithMockUser
    public void postFavoriteCoursesTest() throws Exception {
        mvc.perform(post("/favorites/courses/" + UUID.randomUUID().toString())
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }
    
    @Test
    @WithMockUser
    public void postFavoriteSectionsTest() throws Exception {
        mvc.perform(post("/favorites/sections/" + UUID.randomUUID().toString())
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }
    
    @Test
    @WithMockUser
    public void postFavoriteBuildingsTest() throws Exception {
        mvc.perform(post("/favorites/buildings/" + UUID.randomUUID().toString())
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }
    
    @Test
    @WithMockUser
    public void deleteFavoriteCoursesTest() throws Exception {
        mvc.perform(delete("/favorites/courses/" + UUID.randomUUID().toString())
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }
    
    @Test
    @WithMockUser
    public void deleteFavoriteSectionsTest() throws Exception {
        mvc.perform(delete("/favorites/sections/" + UUID.randomUUID().toString())
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }
    
    @Test
    @WithMockUser
    public void deleteFavoriteBuildingsTest() throws Exception {
        mvc.perform(delete("/favorites/buildings/" + UUID.randomUUID().toString())
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }
    
    @Test
    public void getCoursesUnauthenticated() throws Exception {
        mvc.perform(get("/favorites/courses")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().is4xxClientError());
    }
    
    @Test
    public void getSectionsUnauthenticated() throws Exception {
        mvc.perform(get("/favorites/sections")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().is4xxClientError());
    }
    
    @Test
    public void getBuildingsUnauthenticated() throws Exception {
        mvc.perform(get("/favorites/buildings")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().is4xxClientError());
    }
}
