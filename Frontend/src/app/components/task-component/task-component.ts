import { Component, OnInit, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Task} from '../../models/Task';
import { TaskService } from '../../services/task/task-service';
import { MatDialog } from '@angular/material/dialog';
import { TaskCreateComponent } from '../task-create-component/task-create-component';
import { TaskDeleteComponent } from '../task-delete-component/task-delete-component';
import { TaskUpdateComponent } from '../task-update-component/task-update-component';
import { FlashMessageService } from '../../services/messages/flash-message-service';


@Component({
  selector: 'app-task-component',
  imports: [],
  templateUrl: './task-component.html',
  styleUrl: './task-component.css',
})
export class TaskComponent implements OnInit {
  protected tasks = signal<Task[]>([]);
  protected isLoading = signal<boolean>(true);

  constructor(
    private service: TaskService,
    private dialog: MatDialog,
    private flash: FlashMessageService,
  ) {}

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks() {
    this.service.getTasks().subscribe({
      next: (tasks) => {
        this.tasks.set(tasks);
        this.isLoading.set(false);
      },

      error: (err) => console.error(err),
    });

  }




  openForm() {
    const ref = this.dialog.open(TaskCreateComponent, {
      width: '480px',
    });

    ref.afterClosed().subscribe((createdTask: Task | undefined) => {
      if (!createdTask) return;
      this.getTasks();
      this.flash.success('Task created successfully');
    });
  }

  openEdit(task: Task) {
    const ref = this.dialog.open(TaskUpdateComponent, {
      width: '480px',
      data: task,
    });

    ref.afterClosed().subscribe((updatedTask: Task | undefined) => {
      if (!updatedTask) return;
      this.getTasks();
      this.flash.success('Task updated successfully');
    });
  }

  openDelete(task: Task) {
    const ref = this.dialog.open(TaskDeleteComponent, {
      width: '480px',
      data : task,
    });

    ref.afterClosed().subscribe(data => {
      if (data){
        this.getTasks();
        this.flash.success('Task deleted successfully');
      }
    })
  }
}
