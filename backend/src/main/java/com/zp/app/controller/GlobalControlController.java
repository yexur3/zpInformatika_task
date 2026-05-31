package com.zp.app.controller;

import com.zp.app.dto.GlobalControlDto;
import com.zp.app.dto.GlobalControlUpdateDto;
import com.zp.app.model.GlobalControl;
import com.zp.app.service.GlobalControlService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import org.springframework.validation.annotation.Validated;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/control")
@Validated
public class GlobalControlController {

    private final GlobalControlService globalControlService;

    public GlobalControlController(GlobalControlService globalControlService) {
        this.globalControlService = globalControlService;
    }

    @GetMapping
    public ResponseEntity<GlobalControlDto> getControlByPage(@RequestParam @NotBlank(message = "Page parameter cannot be empty") String page) {
        return globalControlService.getControlByPage(page)
                .map(this::convertToDto)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/all")
    public ResponseEntity<List<GlobalControlDto>> getAllControls() {
        List<GlobalControlDto> controls = globalControlService.getAllControls().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(controls);
    }

    @PatchMapping
    public ResponseEntity<GlobalControlDto> updateControl(@Valid @RequestBody GlobalControlUpdateDto updateDto) {
        if (updateDto.getPage() == null || updateDto.getPage().isBlank()) {
            return ResponseEntity.badRequest().build();
        }
        try {
            GlobalControl updatedControl = globalControlService.updateControl(updateDto.getPage(), updateDto);
            return ResponseEntity.ok(convertToDto(updatedControl));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    private GlobalControlDto convertToDto(GlobalControl globalControl) {
        GlobalControlDto dto = new GlobalControlDto();
        dto.setId(globalControl.getId());
        dto.setPage(globalControl.getPage());
        dto.setIsButtonDisabled(globalControl.getIsButtonDisabled());
        dto.setIsInputDisabled(globalControl.getIsInputDisabled());
        dto.setIsTableVisible(globalControl.getIsTableVisible());
        return dto;
    }

    @ExceptionHandler(jakarta.validation.ConstraintViolationException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    ResponseEntity<String> handleConstraintViolationException(jakarta.validation.ConstraintViolationException e) {
        return new ResponseEntity<>("Validation error: " + e.getMessage(), HttpStatus.BAD_REQUEST);
    }
}