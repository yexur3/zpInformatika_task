package com.zp.app.dto;

import lombok.Data;

@Data
public class GlobalControlDto {
    private Integer id;
    private String page;
    private Boolean isButtonDisabled;
    private Boolean isInputDisabled;
    private Boolean isTableVisible;
}