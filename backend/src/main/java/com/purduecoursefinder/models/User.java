package com.purduecoursefinder.models;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Entity
@Table(name = "users")
@Data
@Builder
@AllArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    int uniqueuserid;

    String email;
    
    String password;

    public User() {
        this.email = null;
        this.password = null;
    }

    public User(String email, String password) {
        this.email = email;
        this.password = password;
    }
}
