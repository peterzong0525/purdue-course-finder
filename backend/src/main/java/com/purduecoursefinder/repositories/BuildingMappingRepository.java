package com.purduecoursefinder.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.purduecoursefinder.models.BuildingMapping;

public interface BuildingMappingRepository extends JpaRepository<BuildingMapping, UUID> {

}
