package com.purduecoursefinder.models.dto.purdueapi;

import java.util.List;

import com.purduecoursefinder.models.dto.BuildingDTO;

import lombok.Data;

@Data
public class BuildingsRequestDTO {
    private List<BuildingDTO> value;
}
