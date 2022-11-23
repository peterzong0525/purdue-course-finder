package com.purduecoursefinder.services;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.purduecoursefinder.models.User;
import com.purduecoursefinder.models.dto.BuildingDTO;
import com.purduecoursefinder.models.dto.CourseDTO;
import com.purduecoursefinder.models.dto.MeetingDTO;
import com.purduecoursefinder.models.dto.RoomDTO;
import com.purduecoursefinder.models.dto.SectionCourseDTO;
import com.purduecoursefinder.repositories.BuildingRepository;
import com.purduecoursefinder.repositories.CourseRepository;
import com.purduecoursefinder.repositories.MeetingRepository;
import com.purduecoursefinder.repositories.RoomRepository;
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
    private MeetingRepository meetingRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private BuildingRepository buildingRepository;
    
    @Autowired
    private RoomRepository roomRepository;
    
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
    
    public void addFavoriteBuilding(String shortCode) {
        User user = ((PCFUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUser();
        user.getFavoriteBuildings().add(buildingRepository.findById(shortCode).orElseThrow());
        userRepository.save(user);
    }
    
    public void addFavoriteRoom(UUID roomId) {
        User user = ((PCFUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUser();
        user.getFavoriteRooms().add(roomRepository.findById(roomId).orElseThrow());
        userRepository.save(user);
    }
    
    public List<CourseDTO> getFavoriteCourses() {
        User user = ((PCFUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUser();
        return user.getFavoriteCourses().stream().map(course -> CourseDTO.fromCourse(course)).collect(Collectors.toList());
    }

    public List<SectionCourseDTO> getFavoriteSections() {
        User user = ((PCFUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUser();
//        return user.getFavoriteSections().stream().map(section -> {
//            try {
//                return FavoriteSectionDTO.fromSection(section,
//                        courseRepository.findByClasses(classRepository.findBySections(section/*.getSectionId()*/)
//                                .orElseThrow().getClassId())
//                                    .orElseThrow());
//            } catch (NoSuchElementException e) {
//                System.out.println("Nothing.");
//            }
//            
//            return FavoriteSectionDTO.fromSection(section, null);
//            }).collect(Collectors.toList());
        
//        return user.getFavoriteSections().stream().map(section -> FavoriteSectionDTO.fromSection(section,
//                        courseRepository.findByClasses(classRepository.findBySections(section/*.getSectionId()*/)
//                                .orElseThrow().getClassId()).orElseThrow())).collect(Collectors.toList());
        
        return user.getFavoriteSections().stream().map(section -> {
                SectionCourseDTO sectionCourseDTO = SectionCourseDTO.fromSection(section, section.getCls().getCourse());
                sectionCourseDTO.setMeetings(
                        meetingRepository.findAllBySection(section).stream().map(meeting -> MeetingDTO.fromMeeting(meeting)).toList());
                return sectionCourseDTO;
            }).collect(Collectors.toList());
    }
    
    public List<BuildingDTO> getFavoriteBuildings() {
        User user = ((PCFUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUser();
        return user.getFavoriteBuildings().stream().map(building -> {
            try {
                return BuildingDTO.fromBuilding(building);
            } catch (JsonMappingException e) {
                e.printStackTrace();
            } catch (JsonProcessingException e) {
                e.printStackTrace();
            }
            
            return null;
        }).toList();
    }
    
    public List<RoomDTO> getFavoriteRooms() {
        User user = ((PCFUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUser();
        return user.getFavoriteRooms().stream().map(room -> RoomDTO.fromRoom(room)).toList();
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
    
    public void removeFavoriteBuilding(String shortCode) {
        User user = ((PCFUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUser();
        user.getFavoriteBuildings().removeIf(filter -> filter.getShortCode().equals(shortCode));
        userRepository.save(user);
    }
    
    public void removeFavoriteRoom(UUID roomId) {
        User user = ((PCFUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUser();
        user.getFavoriteRooms().removeIf(filter -> filter.getRoomId().equals(roomId));
        userRepository.save(user);
    }
}
