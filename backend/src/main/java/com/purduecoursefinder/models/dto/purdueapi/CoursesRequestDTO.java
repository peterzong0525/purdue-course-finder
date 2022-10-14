package com.purduecoursefinder.models.dto.purdueapi;

import java.util.List;

import com.purduecoursefinder.models.dto.CourseApiDTO;

import lombok.Data;

@Data
public class CoursesRequestDTO {
    private List<CourseApiDTO> value;
}
