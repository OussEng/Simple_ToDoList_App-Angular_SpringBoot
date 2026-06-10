import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Task } from '../../models/Task';
import { TaskService } from '../../services/task/task-service';

@Component({
  selector: 'app-task-delete-component',
  imports: [],
  templateUrl: './task-delete-component.html',
  styleUrl: './task-delete-component.css',
})
export class TaskDeleteComponent {
  constructor(
    private service : TaskService,
    private ref: MatDialogRef<TaskDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Task,
  ) {}

  protected close() {
    this.ref.close();
  }

  protected delete() {
    console.log('deleted ' + this.data.title);

    this.service.deleteTask(this.data.id).subscribe({
      next: () => this.ref.close(this.data)
    });

  }
}
