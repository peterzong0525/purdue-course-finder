package com.purduecoursefinder.models.dto;

import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.purduecoursefinder.models.Room;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RoomDTO {
    @JsonProperty("Id")
    private UUID id;
    
    @JsonProperty("Number")
    private String number;
    
    @JsonProperty("Building")
    private BuildingDTO building;
    
    public static RoomDTO fromRoom(Room room) {
        return RoomDTO.builder()
                .id(room.getRoomId())
                .number(room.getNumber())
                .building(BuildingDTO.fromBuilding(room.getBuilding()))
                .build();
    }
}
