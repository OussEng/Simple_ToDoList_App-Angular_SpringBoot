package com.tasks.taskback;

import com.tasks.taskback.exception.TaskNotFoundException;
import com.tasks.taskback.task.dao.ITaskDao;
import com.tasks.taskback.task.entity.Task;
import com.tasks.taskback.task.dto.create.CreateTaskDto;
import com.tasks.taskback.task.dto.update.UpdateTaskDto;
import com.tasks.taskback.task.service.TaskService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class TaskServiceTest {

    @Mock
    private ITaskDao repository;

    @InjectMocks
    private TaskService service;

    private Task sampleTask;

    @BeforeEach
    void setUp() {
        sampleTask = Task.builder()
                .id(1L)
                .title("gg")
                .description("test")
                .done(false)
                .build();
    }

    @Test
    void getAll_returns_All_Tasks() {
        when(repository.findAll()).thenReturn(List.of(sampleTask));

        List<Task> result = service.getAll();

        assertThat(result).hasSize(1);
        assertThat(result.getFirst().getTitle()).isEqualTo("gg");
    }

    @Test
    void getById_returns_Task() {
        when(repository.findById(1L)).thenReturn(Optional.of(sampleTask));

        Task result = service.getById(1L);

        assertThat(result).isNotNull();
        assertThat(result.getId()).isEqualTo(1L);
    }

    @Test
    void getById_Non_existing_task_throwsNotFound() {
        when(repository.findById(99L)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> service.getById(99L))
                .isInstanceOf(TaskNotFoundException.class)
                .hasMessageContaining("99");
    }


    @Test
    void create_saves_Task_And_Returns_It() {
        CreateTaskDto dto = new CreateTaskDto();
        dto.setTitle("Some task");
        dto.setDescription("Desc");

        when(repository.save(any(Task.class))).thenReturn(sampleTask);

        Task result = service.create(dto);

        assertThat(result).isNotNull();
        verify(repository, times(1)).save(any(Task.class));
    }

    @Test
    void update_Task() {
        UpdateTaskDto dto = new UpdateTaskDto();
        dto.setTitle("Some other title");
        dto.setDescription("some other description");
        dto.setDone(true);

        when(repository.findById(1L)).thenReturn(Optional.of(sampleTask));
        when(repository.save(any(Task.class))).thenAnswer(inv -> inv.getArgument(0));

        Task result = service.update(1L, dto);

        assertThat(result.getTitle()).isEqualTo("Some other title");
        assertThat(result.isDone()).isTrue();
    }

    @Test
    void delete_Task() {
        when(repository.existsById(1L)).thenReturn(true);

        service.delete(1L);

        verify(repository).delete(1L);
    }

    @Test
    void delete_Non_existing_Task_throws_NotFound() {
        when(repository.existsById(99L)).thenReturn(false);

        assertThatThrownBy(() -> service.delete(99L))
                .isInstanceOf(TaskNotFoundException.class);
    }
}
