package com.tasks.taskback.task.dto.create;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CreateTaskDto {

    @NotBlank(message = "Title is required")
    private String title;

    @NotBlank(message = "Description is required")
    private String description;
}
