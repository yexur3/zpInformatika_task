package com.zp.app.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class ErrorLogResponseDto {
    private Integer id;
    private LocalDateTime createdAt;
}