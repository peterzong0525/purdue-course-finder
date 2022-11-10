package com.purduecoursefinder.models.dto.purdueapi;

import java.util.List;

import com.purduecoursefinder.models.dto.RoomApiDTO;

import lombok.Data;

@Data
public class RoomsRequestDTO {
    private List<RoomApiDTO> value;
}
