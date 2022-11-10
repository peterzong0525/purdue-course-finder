package com.purduecoursefinder.repositories;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.purduecoursefinder.models.Room;

public interface RoomRepository extends JpaRepository<Room, UUID> {
    List<Room> findAllByBuildingShortCode(String shortCode);
}
