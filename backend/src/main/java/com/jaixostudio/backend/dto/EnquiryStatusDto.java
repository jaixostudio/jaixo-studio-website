package com.jaixostudio.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public class EnquiryStatusDto {

    @NotBlank(message = "Status cannot be blank")
    @Pattern(
        regexp = "^(New|Contacted|In Discussion|Proposal Sent|Confirmed|Completed|Rejected|In Review|Responded)$",
        message = "Status must be New, Contacted, In Discussion, Proposal Sent, Confirmed, Completed, Rejected, In Review, or Responded"
    )
    private String status;

    private String internalNotes;

    public EnquiryStatusDto() {}

    public EnquiryStatusDto(String status) {
        this.status = status;
    }

    public EnquiryStatusDto(String status, String internalNotes) {
        this.status = status;
        this.internalNotes = internalNotes;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getInternalNotes() {
        return internalNotes;
    }

    public void setInternalNotes(String internalNotes) {
        this.internalNotes = internalNotes;
    }
}
