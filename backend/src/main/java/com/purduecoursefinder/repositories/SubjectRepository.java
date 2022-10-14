package com.purduecoursefinder.repositories;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.purduecoursefinder.models.Subject;

public interface SubjectRepository extends JpaRepository<Subject, UUID> {
    Optional<Subject> findByAbbreviation(String abbreviation);
}
