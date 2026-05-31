package com.zp.app.controller;

import com.zp.app.dto.ErrorLogRequestDto;
import com.zp.app.dto.ErrorLogResponseDto;
import com.zp.app.model.ErrorLog;
import com.zp.app.service.ErrorLogService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/logs")
public class ErrorLogController {

    private final ErrorLogService errorLogService;

    public ErrorLogController(ErrorLogService errorLogService) {
        this.errorLogService = errorLogService;
    }

    @PostMapping
    public ResponseEntity<ErrorLogResponseDto> createErrorLog(@Valid @RequestBody ErrorLogRequestDto requestDto) {
        try {
            ErrorLog errorLog = errorLogService.createErrorLog(requestDto);
            ErrorLogResponseDto responseDto = new ErrorLogResponseDto();
            responseDto.setId(errorLog.getId());
            responseDto.setCreatedAt(errorLog.getCreatedAt());
            return ResponseEntity.status(HttpStatus.CREATED).body(responseDto);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
