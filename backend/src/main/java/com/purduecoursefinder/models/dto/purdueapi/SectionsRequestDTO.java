package com.purduecoursefinder.models.dto.purdueapi;

import java.util.List;

import com.purduecoursefinder.models.dto.SectionDTO;

import lombok.Data;

@Data
public class SectionsRequestDTO {
    private List<SectionDTO> value;
}
