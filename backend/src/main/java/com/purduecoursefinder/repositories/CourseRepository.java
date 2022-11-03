package com.purduecoursefinder.repositories;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.purduecoursefinder.models.Course;

public interface CourseRepository extends JpaRepository<Course, UUID> {
    List<Course> findBySubjectId(UUID subjectId);
    Optional<Course> findByClasses(UUID classId);
}
