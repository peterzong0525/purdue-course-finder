package com.purduecoursefinder.repositories;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.purduecoursefinder.models.Meeting;
import com.purduecoursefinder.models.Section;

public interface MeetingRepository extends JpaRepository<Meeting, UUID> {
    List<Meeting> findAllBySection(Section section);
}
