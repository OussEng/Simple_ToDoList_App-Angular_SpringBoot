package com.tasks.taskback.task.dao;

import com.tasks.taskback.task.entity.Task;

import java.util.List;
import java.util.Optional;


public interface ITaskDao {

    List<Task> findAll();
    Optional<Task> findById(Long id);
    Task save(Task task);
    void delete(Long id);
    boolean existsById(Long id);

}
