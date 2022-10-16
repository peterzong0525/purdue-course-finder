package com.purduecoursefinder.models.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ModifyAccountDTO {
    String oldEmail;
    String newEmail;
    String newPassword;
}
