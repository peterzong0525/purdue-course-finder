package com.purduecoursefinder.models.dto;

import java.util.Date;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

@Data
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
}
