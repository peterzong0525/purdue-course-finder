package com.purduecoursefinder.models;

import java.util.UUID;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.purduecoursefinder.models.dto.RoomDTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "rooms")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Room {
    @Id
    UUID roomId;
    
    String number;
    
    @ManyToOne
    @JoinColumn(name = "shortCode")
    Building building;
    
    public static Room fromRoomDTO(RoomDTO roomDTO) {
        return Room.builder()
            .roomId(roomDTO.getId())
            .number(roomDTO.getNumber())
            .build();
    }
}
