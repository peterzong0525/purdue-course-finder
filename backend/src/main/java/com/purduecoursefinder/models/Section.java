package com.purduecoursefinder.models;

import java.util.Date;
import java.util.UUID;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.purduecoursefinder.models.dto.SectionDTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "sections")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Section {
    @Id
    UUID sectionId;

    String crn;
    String type;
    String registrationStatus;
    Date startDate;
    Date endDate;
    Integer capacity;
    Integer enrolled;
    Integer remainingSpace; // Redundant?
    Integer waitListCapacity;
    Integer waitListCount;
    Integer waitListSpace;
    
    @ManyToOne
    @JoinColumn(name = "classId")
    PCFClass cls;
    
    public static Section fromSectionDTO(SectionDTO sectionDTO) {
        return Section.builder()
            .sectionId(sectionDTO.getId())
            .crn(sectionDTO.getCrn())
            .type(sectionDTO.getType())
            .registrationStatus(sectionDTO.getRegistrationStatus())
            .startDate(sectionDTO.getStartDate())
            .endDate(sectionDTO.getEndDate())
            .capacity(sectionDTO.getCapacity())
            .enrolled(sectionDTO.getEnrolled())
            .remainingSpace(sectionDTO.getRemainingSpace())
            .waitListCapacity(sectionDTO.getWaitListCapacity())
            .waitListCount(sectionDTO.getWaitListCount())
            .waitListSpace(sectionDTO.getWaitListSpace())
            .build();
    }
}
