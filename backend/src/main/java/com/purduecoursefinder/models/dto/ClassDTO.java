package com.purduecoursefinder.models.dto;

import java.util.List;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ClassDTO {
    @JsonProperty("Id")
    private UUID id;
    
    @JsonProperty("CampusId")
    private UUID campusId;
    
    @JsonProperty("Sections")
    private List<SectionDTO> sections;
}
