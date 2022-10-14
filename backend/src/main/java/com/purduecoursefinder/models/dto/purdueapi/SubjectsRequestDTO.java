package com.purduecoursefinder.models.dto.purdueapi;

import java.util.List;

import com.purduecoursefinder.models.dto.SubjectDTO;

import lombok.Data;

@Data
public class SubjectsRequestDTO {
    private List<SubjectDTO> value;
}
