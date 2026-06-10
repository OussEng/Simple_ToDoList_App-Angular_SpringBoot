import { Component, Inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Task } from '../../models/Task';
import { UpdateTaskDto } from '../../models/DTO/update-task-dto';
import { TaskService } from '../../services/task/task-service';

@Component({
  selector: 'app-task-update-component',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './task-update-component.html',
  styleUrl: './task-update-component.css',
})
export class TaskUpdateComponent {
  taskForm = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    done: new FormControl(false),
  });

  constructor(
    private service: TaskService,
    private ref: MatDialogRef<TaskUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Task,
  ) {
    // Pre-fill the form with the existing task data
    this.taskForm.patchValue({
      title: data.title,
      description: data.description,
      done: data.done,
    });
  }

  protected close() {
    this.ref.close();
  }

  protected submitForm() {
    if (this.taskForm.invalid) return;

    const dto: UpdateTaskDto = {
      title: this.taskForm.value.title!,
      description: this.taskForm.value.description!,
      done: this.taskForm.value.done!,
    };

    this.service.updateTask(this.data.id, dto).subscribe({
      next: (updatedTask) => this.ref.close(updatedTask),
      error: (err) => console.error(err),
    });
  }
}
