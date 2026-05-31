package com.zp.app.service;

import com.zp.app.model.GlobalControl;
import com.zp.app.repository.GlobalControlRepository;
import com.zp.app.dto.GlobalControlUpdateDto;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class GlobalControlService {

    private final GlobalControlRepository globalControlRepository;

    public GlobalControlService(GlobalControlRepository globalControlRepository) {
        this.globalControlRepository = globalControlRepository;
    }

    public Optional<GlobalControl> getControlByPage(String page) {
        return globalControlRepository.findByPage(page);
    }

    public List<GlobalControl> getAllControls() {
        return globalControlRepository.findAll();
    }

    @Transactional
    public GlobalControl updateControl(String page, GlobalControlUpdateDto updateDto) {
        GlobalControl globalControl = globalControlRepository.findByPage(page)
                .orElseThrow(() -> new IllegalArgumentException("Page not found: " + page));

        if (updateDto.getIsButtonDisabled() != null) {
            globalControl.setIsButtonDisabled(updateDto.getIsButtonDisabled());
        }
        if (updateDto.getIsInputDisabled() != null) {
            globalControl.setIsInputDisabled(updateDto.getIsInputDisabled());
        }
        if (updateDto.getIsTableVisible() != null) {
            globalControl.setIsTableVisible(updateDto.getIsTableVisible());
        }

        return globalControlRepository.save(globalControl);
    }
}