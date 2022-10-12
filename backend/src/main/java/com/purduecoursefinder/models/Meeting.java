package com.purduecoursefinder.models;

import java.util.Date;
import java.util.UUID;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.purduecoursefinder.models.dto.MeetingDTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "meetings")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Meeting {
    @Id
    UUID meetingId;

    String type;
    Date startDate;
    Date endDate;
    String daysOfWeek;
    Date startTime;
    String duration;
    
    @ManyToOne
    @JoinColumn(name = "sectionId")
    Section section;
    
    @ManyToOne
    @JoinColumn(name = "roomId")
    Room room;
    
    public static Meeting fromMeetingDTO(MeetingDTO meetingDTO) {
        return Meeting.builder()
            .meetingId(meetingDTO.getId())
            .type(meetingDTO.getType())
            .startDate(meetingDTO.getStartDate())
            .endDate(meetingDTO.getEndDate())
            .daysOfWeek(meetingDTO.getDaysOfWeek())
            .startTime(meetingDTO.getStartTime())
            .duration(meetingDTO.getDuration())
            .room(Room.fromRoomDTO(meetingDTO.getRoom())) // Might need changed
            .build();
    }
}
