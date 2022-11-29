package com.purduecoursefinder.services;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.purduecoursefinder.models.Building;
import com.purduecoursefinder.models.Course;
import com.purduecoursefinder.models.Meeting;
import com.purduecoursefinder.models.Room;
import com.purduecoursefinder.models.Section;
import com.purduecoursefinder.models.dto.BuildingDTO;
import com.purduecoursefinder.models.dto.BuildingStatisticsDTO;
import com.purduecoursefinder.repositories.BuildingRepository;
import com.purduecoursefinder.repositories.MeetingRepository;
import com.purduecoursefinder.repositories.RoomRepository;

@Service
public class StatisticsService {
    
    @Autowired
    private RoomRepository roomRepository;
    
    @Autowired
    private MeetingRepository meetingRepository;
    
    @Autowired
    private BuildingRepository buildingRepository;
    
    public BuildingStatisticsDTO getBuildingStatistics(String shortCode) throws JsonMappingException, JsonProcessingException {
        BuildingStatisticsDTO buildingStatisticsDTO = new BuildingStatisticsDTO();
        Building building = buildingRepository.findById(shortCode).orElseThrow();
        List<Room> rooms = roomRepository.findAllByBuildingShortCode(shortCode);
        Set<Meeting> meetingSet = new HashSet<Meeting>();
        Set<Section> sectionSet = new HashSet<Section>();
        Set<Course> courseSet = new HashSet<Course>();
        
        for (Room room : rooms) {
            List<Meeting> meetingList = meetingRepository.findAllByRoomRoomId(room.getRoomId());
            meetingSet.addAll(meetingList);
            
            for (Meeting meeting : meetingList) {
                sectionSet.add(meeting.getSection());
                courseSet.add(meeting.getSection().getCls().getCourse());
            }
        }
        
        buildingStatisticsDTO.setRooms(rooms.size());
        buildingStatisticsDTO.setMeetings(meetingSet.size());
        buildingStatisticsDTO.setSections(sectionSet.size());
        buildingStatisticsDTO.setCourses(courseSet.size());
        buildingStatisticsDTO.setBuilding(BuildingDTO.fromBuilding(building));
        
        return buildingStatisticsDTO;
    }
}
