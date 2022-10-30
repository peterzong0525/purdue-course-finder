package com.purduecoursefinder.controllers;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.purduecoursefinder.models.dto.BuildingDTO;
import com.purduecoursefinder.models.dto.CourseDTO;
import com.purduecoursefinder.models.dto.SectionDTO;
import com.purduecoursefinder.services.FavoritesService;

@RestController
@RequestMapping("/favorites")
public class FavoritesController {
    @Autowired
    private FavoritesService favoritesService;
    
    @GetMapping("/courses")
    public List<CourseDTO> courses() {
        return favoritesService.getFavoriteCourses();
    }
    
    @GetMapping("/sections")
    public List<SectionDTO> sections() {
        return favoritesService.getFavoriteSections();
    }
    
    @GetMapping("/buildings")
    public List<BuildingDTO> buildings() {
        return favoritesService.getFavoriteBuildings();
    }
    
    @PostMapping("/courses/{courseId}")
    public void addCourse(@PathVariable UUID courseId) {
        favoritesService.addFavoriteCourse(courseId);
    }
    
    @PostMapping("/sections/{sectionId}")
    public void addSection(@PathVariable UUID sectionId) {
        favoritesService.addFavoriteSection(sectionId);
    }
    
    @PostMapping("/buildings/{buildingId}")
    public void addBuilding(@PathVariable UUID buildingId) {
        favoritesService.addFavoriteBuilding(buildingId);
    }
    
    @DeleteMapping("/courses/{courseId}")
    public void removeCourse(@PathVariable UUID courseId) {
        favoritesService.removeFavoriteCourse(courseId);
    }
    
    @DeleteMapping("/sections/{sectionId}")
    public void removeSection(@PathVariable UUID sectionId) {
        favoritesService.removeFavoriteSection(sectionId);
    }
    
    @DeleteMapping("/buildings/{buildingId}")
    public void removeBuilding(@PathVariable UUID buildingId) {
        favoritesService.removeFavoriteBuilding(buildingId);
    }
}
