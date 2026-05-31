package com.zp.app.service;

import com.zp.app.model.ErrorLog;
import com.zp.app.repository.ErrorLogRepository;
import com.zp.app.dto.ErrorLogRequestDto;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class ErrorLogService {

    private final ErrorLogRepository errorLogRepository;

    public ErrorLogService(ErrorLogRepository errorLogRepository) {
        this.errorLogRepository = errorLogRepository;
    }

    public ErrorLog createErrorLog(ErrorLogRequestDto errorLogRequestDto) {
        ErrorLog errorLog = new ErrorLog();
        errorLog.setPage(errorLogRequestDto.getPage());
        errorLog.setInputName(errorLogRequestDto.getInputName());
        errorLog.setCreatedAt(LocalDateTime.now()); // FR-BE-004
        return errorLogRepository.save(errorLog);
    }
}