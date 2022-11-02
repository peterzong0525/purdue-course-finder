package com.purduecoursefinder.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.purduecoursefinder.models.Building;

public interface BuildingRepository extends JpaRepository<Building, String> {

}
