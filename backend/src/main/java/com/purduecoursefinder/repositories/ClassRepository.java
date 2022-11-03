package com.purduecoursefinder.repositories;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.purduecoursefinder.models.PCFClass;
import com.purduecoursefinder.models.Section;

public interface ClassRepository extends JpaRepository<PCFClass, UUID> {
    Optional<PCFClass> findBySections(Section section);
}
