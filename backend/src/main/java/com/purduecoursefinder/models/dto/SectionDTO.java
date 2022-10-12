package com.purduecoursefinder.models.dto;

import java.util.Date;
import java.util.List;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

@Data
public class SectionDTO {
    @JsonProperty("Id")
    private UUID id;
    
    @JsonProperty("Crn")
    private String crn;
    
    @JsonProperty("Type")
    private String type;
    
    @JsonProperty("RegistrationStatus")
    private String registrationStatus;
    
    @JsonProperty("StartDate")
    private Date startDate;
    
    @JsonProperty("EndDate")
    private Date endDate;
    
    @JsonProperty("Capacity")
    private Integer capacity;
    
    @JsonProperty("Enrolled")
    private Integer enrolled;
    
    @JsonProperty("RemainingSpace")
    private Integer remainingSpace; // Redundant?
    
    @JsonProperty("WaitListCapacity")
    private Integer waitListCapacity;
    
    @JsonProperty("WaitListCount")
    private Integer waitListCount;
    
    @JsonProperty("WaitListSpace")
    private Integer waitListSpace;
    
    @JsonProperty("Meetings")
    private List<MeetingDTO> meetings;
}
