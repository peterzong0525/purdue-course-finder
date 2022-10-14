package com.purduecoursefinder.models.dto;

import java.util.Date;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.purduecoursefinder.models.Meeting;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MeetingDTO {
    @JsonProperty("Id")
    private UUID id;
    
    @JsonProperty("Type")
    private String type;
    
    @JsonProperty("StartDate")
    private Date startDate;
    
    @JsonProperty("EndDate")
    private Date endDate;
    
    @JsonProperty("DaysOfWeek")
    private String daysOfWeek;
    
    @JsonProperty("StartTime")
    private Date startTime;
    
    @JsonProperty("Duration")
    private String duration;
    
    @JsonProperty("Room")
    private RoomDTO room;
    
    public static MeetingDTO fromMeeting(Meeting meeting) {
        return MeetingDTO.builder()
                .id(meeting.getMeetingId())
                .type(meeting.getType())
                .startDate(meeting.getStartDate())
                .endDate(meeting.getEndDate())
                .daysOfWeek(meeting.getDaysOfWeek())
                .startTime(meeting.getStartTime())
                .duration(meeting.getDuration())
                .room(RoomDTO.fromRoom(meeting.getRoom()))
                .build();
    }
}
