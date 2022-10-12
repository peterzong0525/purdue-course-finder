package com.purduecoursefinder.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.purduecoursefinder.models.Meeting;

public interface MeetingRepository extends JpaRepository<Meeting, UUID> {

}
