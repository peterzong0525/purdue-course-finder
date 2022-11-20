package com.purduecoursefinder.models.dto;

import java.util.Date;
import java.util.List;
import java.util.UUID;

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
    private UUID id;
    private String crn;
    private String type;
    private String registrationStatus;
    private Date startDate;
    private Date endDate;
    private Integer capacity;
    private Integer enrolled;
    private Integer remainingSpace; // Redundant?
    private Integer waitListCapacity;
    private Integer waitListCount;
    private Integer waitListSpace;
    private List<MeetingDTO> meetings;
    
    private Course course;
    
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
                .course(course)
                .build();
    }
}
