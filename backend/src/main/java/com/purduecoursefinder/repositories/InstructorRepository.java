package com.purduecoursefinder.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.purduecoursefinder.models.Instructor;

public interface InstructorRepository extends JpaRepository<Instructor, UUID> {

}
