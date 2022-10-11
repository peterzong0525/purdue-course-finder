package com.purduecoursefinder.models.dto.purdueapi;

import java.util.List;

import lombok.Data;

@Data
public class SubjectsRequestDTO {
    private List<SubjectDTO> value;
}
