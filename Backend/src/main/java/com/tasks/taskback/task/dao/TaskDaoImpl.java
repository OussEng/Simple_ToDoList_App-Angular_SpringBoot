package com.tasks.taskback.task.dao;

import com.tasks.taskback.exception.TaskNotFoundException;
import com.tasks.taskback.task.entity.Task;
import com.tasks.taskback.task.repository.TaskRepository;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;


@Component
public class TaskDaoImpl implements ITaskDao{

    private final TaskRepository repository;

    public TaskDaoImpl(TaskRepository repository) {
        this.repository = repository;
    }


    @Override
    public List<Task> findAll() {
        return repository.findAll();
    }

    @Override
    public Optional<Task> findById(Long id) {
        return repository.findById(id);
    }

    @Override
    public Task save(Task task) {
        return repository.save(task);
    }



    @Override
    public void delete(Long id) {
        if (!repository.existsById(id)) {
            throw new TaskNotFoundException(id);
        }
        repository.deleteById(id);
    }

    @Override
    public boolean existsById(Long id) {
        return repository.existsById(id);
    }
}
