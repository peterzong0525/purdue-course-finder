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
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private int uniqueuserid;

    private String email;
    
    private String password;

    public User() {
        this.email = null;
        this.password = null;
    }

    public User(String email, String password) {
        this.email = email;
        this.password = password;
    }

    public int getUniqueUserID() {
        return uniqueuserid;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
