package com.zp.app.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class ErrorLogRequestDto {
    @NotBlank(message = "Page cannot be blank")
    private String page;
    @NotBlank(message = "Input name cannot be blank")
    private String inputName;
}