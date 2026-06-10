package com.tasks.taskback.task.service;

import com.tasks.taskback.exception.TaskNotFoundException;
import com.tasks.taskback.task.entity.Task;
import com.tasks.taskback.task.dto.create.CreateTaskDto;
import com.tasks.taskback.task.dto.update.UpdateTaskDto;
import com.tasks.taskback.task.repository.TaskRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {

    private final TaskRepository repository;

    public TaskService(TaskRepository repository) {
        this.repository = repository;
    }

    public List<Task> getAll() {
        return repository.findAll();
    }

    public Task getById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new TaskNotFoundException(id));
    }

    public Task create(CreateTaskDto dto) {
        Task task = Task.builder()
                .title(dto.getTitle())
                .description(dto.getDescription())
                .done(false)
                .build();

        return repository.save(task);
    }

    public Task update(Long id, UpdateTaskDto dto) {
        Task task = repository.findById(id)
                .orElseThrow(() -> new TaskNotFoundException(id));

        task.setTitle(dto.getTitle());
        task.setDescription(dto.getDescription());
        task.setDone(dto.getDone());

        return repository.save(task);
    }

    public void delete(Long id) {
        if (!repository.existsById(id)) {
            throw new TaskNotFoundException(id);
        }
        repository.deleteById(id);
    }
}
