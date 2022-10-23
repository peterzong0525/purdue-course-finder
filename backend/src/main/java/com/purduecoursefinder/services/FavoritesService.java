package com.purduecoursefinder.services;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.purduecoursefinder.models.User;
import com.purduecoursefinder.models.dto.CourseDTO;
import com.purduecoursefinder.models.dto.SectionDTO;
import com.purduecoursefinder.repositories.CourseRepository;
import com.purduecoursefinder.repositories.SectionRepository;
import com.purduecoursefinder.repositories.UserRepository;
import com.purduecoursefinder.security.PCFUserDetails;

@Service
public class FavoritesService {
    @Autowired
    private CourseRepository courseRepository;
    
    @Autowired
    private SectionRepository sectionRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    public void addFavoriteCourse(UUID courseId) {
        User user = ((PCFUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUser();
        user.getFavoriteCourses().add(courseRepository.findById(courseId).orElseThrow());
        userRepository.save(user);
    }
    
    public void addFavoriteSection(UUID sectionId) {
        User user = ((PCFUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUser();
        user.getFavoriteSections().add(sectionRepository.findById(sectionId).orElseThrow());
        userRepository.save(user);
    }
    
    public List<CourseDTO> getFavoriteCourses() {
        User user = ((PCFUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUser();
        return user.getFavoriteCourses().stream().map(course -> CourseDTO.fromCourse(course)).collect(Collectors.toList());
    }

    public List<SectionDTO> getFavoriteSections() {
        User user = ((PCFUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUser();
        return user.getFavoriteSections().stream().map(section -> SectionDTO.fromSection(section)).collect(Collectors.toList());
    }
    
    public void removeFavoriteCourse(UUID courseId) {
        User user = ((PCFUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUser();
        user.getFavoriteCourses().removeIf(filter -> filter.getCourseId().equals(courseId));
        userRepository.save(user);
    }
    
    public void removeFavoriteSection(UUID sectionId) {
        User user = ((PCFUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUser();
        user.getFavoriteSections().removeIf(filter -> filter.getSectionId().equals(sectionId));
        userRepository.save(user);
    }
}
