import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Task } from '../../models/Task';
import { CreateTaskDto } from '../../models/DTO/create-task-dto';
import { TaskService } from '../../services/task/task-service';
import {Router} from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-task-create-component',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './task-create-component.html',
  styleUrl: './task-create-component.css',
})
export class TaskCreateComponent {

  constructor(private service : TaskService, private router : Router,private ref : MatDialogRef<TaskCreateComponent>) {
  }


  taskForm = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
  });

  protected submitForm() {
    if (this.taskForm.invalid){
      return;
    }else {
      const task : CreateTaskDto ={
          title : this.taskForm.value.title!,
          description : this.taskForm.value.description!,
      }

      this.service.createTask(task).subscribe(
        {
          next: createdTask => {
            this.ref.close(createdTask)
          }
        }
      )
    }
  }

}
