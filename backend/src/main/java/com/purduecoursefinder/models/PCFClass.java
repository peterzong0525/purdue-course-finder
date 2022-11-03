package com.purduecoursefinder.models;

import java.util.List;
import java.util.UUID;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.purduecoursefinder.models.dto.ClassDTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "classes")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PCFClass {
    @Id
    UUID classId;
    
    // Eager fetching isn't optimal but I can't spend
    // more time figuring out how to do it right.
    @OneToMany(fetch = FetchType.EAGER)
    List<Section> sections;
    
    @ManyToOne
    @JoinColumn(name = "courseId")
    @JsonIgnore // Avoid stack overflow
    Course course;
    
    public static PCFClass fromClassDTO(ClassDTO classDTO) {
        return PCFClass.builder()
            .classId(classDTO.getId())
            .build();
    }
}
