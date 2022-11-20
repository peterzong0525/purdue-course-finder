package com.purduecoursefinder.models.dto;

import java.util.Date;
import java.util.List;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.purduecoursefinder.models.Course;
import com.purduecoursefinder.models.Section;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SectionCourseDTO {
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
    
    private CourseDTO course;
    
    public static SectionCourseDTO fromSection(Section section, Course course) {
        return SectionCourseDTO.builder()
                .id(section.getSectionId())
                .crn(section.getCrn())
                .type(section.getType())
                .registrationStatus(section.getRegistrationStatus())
                .startDate(section.getStartDate())
                .endDate(section.getEndDate())
                .capacity(section.getCapacity())
                .enrolled(section.getEnrolled())
                .remainingSpace(section.getRemainingSpace())
                .waitListCapacity(section.getWaitListCapacity())
                .waitListCount(section.getWaitListCount())
                .waitListSpace(section.getWaitListSpace())
                .course(CourseDTO.fromCourse(course))
                .build();
    }
}
