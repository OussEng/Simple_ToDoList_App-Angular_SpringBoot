package com.tasks.taskback.task.controller;

import com.tasks.taskback.task.entity.Task;
import com.tasks.taskback.apiResponse.ApiResponse;
import com.tasks.taskback.task.dto.create.CreateTaskDto;
import com.tasks.taskback.task.dto.update.UpdateTaskDto;
import com.tasks.taskback.task.service.TaskService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class TaskController {

    private final TaskService service;

    public TaskController(TaskService service) {
        this.service = service;
    }

    @GetMapping("/tasks/all")
    public ResponseEntity<ApiResponse<List<Task>>> getAll() {
        List<Task> tasks = service.getAll();
        return ResponseEntity.ok(ApiResponse.success(tasks, "Tasks retrieved successfully"));
    }


    @GetMapping("/task/{id}")
    public ResponseEntity<ApiResponse<Task>> getById(@PathVariable Long id) {
        Task task = service.getById(id);
        return ResponseEntity.ok(ApiResponse.success(task, "Task retrieved successfully"));
    }


    @PostMapping("/task/create")
    public ResponseEntity<Task> create(@Valid @RequestBody CreateTaskDto dto) {
        Task created = service.create(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PutMapping("/task/update/{id}")
    public ResponseEntity<ApiResponse<Task>> update(
            @PathVariable Long id,
            @Valid @RequestBody UpdateTaskDto dto
    ) {
        Task updated = service.update(id, dto);
        return ResponseEntity.ok(ApiResponse.success(updated, "Task updated successfully"));
    }


    @DeleteMapping("/task/delete/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok(ApiResponse.success(null, "Task deleted successfully"));
    }
}
