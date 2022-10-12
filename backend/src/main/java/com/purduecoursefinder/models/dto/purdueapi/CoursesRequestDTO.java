package com.purduecoursefinder.models.dto.purdueapi;

import java.util.List;

import com.purduecoursefinder.models.dto.CourseDTO;

import lombok.Data;

@Data
public class CoursesRequestDTO {
    private List<CourseDTO> value;
}
