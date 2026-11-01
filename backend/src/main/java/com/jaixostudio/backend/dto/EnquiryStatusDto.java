package com.jaixostudio.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public class EnquiryStatusDto {

    @NotBlank(message = "Status cannot be blank")
    @Pattern(regexp = "^(New|In Review|Responded)$", message = "Status must be New, In Review, or Responded")
    private String status;

    public EnquiryStatusDto() {}

    public EnquiryStatusDto(String status) {
        this.status = status;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
