package com.purduecoursefinder.controllers;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.purduecoursefinder.models.dto.BuildingDTO;
import com.purduecoursefinder.models.dto.CourseDTO;
import com.purduecoursefinder.models.dto.RoomDTO;
import com.purduecoursefinder.models.dto.SectionCourseDTO;
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
    public List<SectionCourseDTO> sections() {
        return favoritesService.getFavoriteSections();
    }
    
    @GetMapping("/buildings")
    public List<BuildingDTO> buildings() {
        return favoritesService.getFavoriteBuildings();
    }
    
    @GetMapping("/rooms")
    public List<RoomDTO> rooms() {
        return favoritesService.getFavoriteRooms();
    }
    
    @PostMapping("/courses/{courseId}")
    public void addCourse(@PathVariable UUID courseId) {
        favoritesService.addFavoriteCourse(courseId);
    }
    
    @PostMapping("/sections/{sectionId}")
    public void addSection(@PathVariable UUID sectionId) {
        favoritesService.addFavoriteSection(sectionId);
    }
    
    @PostMapping("/buildings/{buildingShortCode}")
    public void addBuilding(@PathVariable String buildingShortCode) {
        favoritesService.addFavoriteBuilding(buildingShortCode);
    }
    
    @PostMapping("/rooms/{roomId}")
    public void addRoom(@PathVariable UUID roomId) {
        favoritesService.addFavoriteRoom(roomId);
    }

    @CrossOrigin
    @DeleteMapping("/courses/{courseId}")
    public void removeCourse(@PathVariable UUID courseId) {
        favoritesService.removeFavoriteCourse(courseId);
    }

    @CrossOrigin
    @DeleteMapping("/sections/{sectionId}")
    public void removeSection(@PathVariable UUID sectionId) {
        favoritesService.removeFavoriteSection(sectionId);
    }

    @CrossOrigin
    @DeleteMapping("/buildings/{buildingShortCode}")
    public void removeBuilding(@PathVariable String buildingShortCode) {
        favoritesService.removeFavoriteBuilding(buildingShortCode);
    }
    
    @CrossOrigin
    @DeleteMapping("/rooms/{roomId}")
    public void removeRoom(@PathVariable UUID roomId) {
        favoritesService.removeFavoriteRoom(roomId);
    }
}
