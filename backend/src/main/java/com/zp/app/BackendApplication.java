package com.zp.app;

import com.zp.app.model.GlobalControl;
import com.zp.app.repository.GlobalControlRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.List;

@SpringBootApplication
public class BackendApplication {

    private final GlobalControlRepository globalControlRepository;

    public BackendApplication(GlobalControlRepository globalControlRepository) {
        this.globalControlRepository = globalControlRepository;
    }

    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }

    @PostConstruct
    public void seedGlobalControl() {
        List<String> pages = List.of("/page-one", "/page-two", "/page-three");
        for (String page : pages) {
            if (globalControlRepository.findByPage(page).isEmpty()) {
                GlobalControl control = new GlobalControl();
                control.setPage(page);
                control.setIsButtonDisabled(false);
                control.setIsInputDisabled(false);
                control.setIsTableVisible(true);
                globalControlRepository.save(control);
            }
        }
    }
}