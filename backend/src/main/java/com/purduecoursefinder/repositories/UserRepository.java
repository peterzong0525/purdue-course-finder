package com.purduecoursefinder.repositories;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

import com.purduecoursefinder.models.User;

@Repository
public interface UserRepository extends JpaRepository<User, String> {

}
