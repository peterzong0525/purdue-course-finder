package com.purduecoursefinder.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.purduecoursefinder.models.Class;

public interface ClassRepository extends JpaRepository<Class, UUID> {

}
