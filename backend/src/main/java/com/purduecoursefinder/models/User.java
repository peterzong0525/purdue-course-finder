package com.purduecoursefinder.models;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "users")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private int uniqueUserId;

    private String email;
    private String password;
    
    @ManyToMany
    private List<Course> favoriteCourses;
    
    @ManyToMany
    private List<Section> favoriteSections;
    
    @ManyToMany
    private List<Building> favoriteBuildings;
    
    @ManyToMany
    private List<Room> favoriteRooms;
}
