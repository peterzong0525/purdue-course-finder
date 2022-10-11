package com.purduecoursefinder.models.dto.purdueapi;

import java.util.List;

import lombok.Data;

@Data
public class CoursesRequestDTO {
    private List<CourseDTO> value;
}
