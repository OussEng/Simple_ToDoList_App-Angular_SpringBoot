import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { map, Observable } from 'rxjs';
import {Response} from '../../models/Response';
import {Task} from '../../models/Task';
import { CreateTaskDto } from '../../models/DTO/create-task-dto';
import { UpdateTaskDto } from '../../models/DTO/update-task-dto';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private readonly api = 'http://localhost:8080/api/v1';

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http.get<Response<Task[]>>(this.api + '/tasks/all').pipe(
      map((res) => {
        if (res.code === '200') {
          return res.data;
        } else {
          throw new Error(res.message);
        }
      }),
    );
  }

  createTask(task: CreateTaskDto): Observable<Task> {
    return this.http.post<Task>(this.api + '/task/create', task);
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<Response<null>>(this.api + '/task/delete/' + id).pipe(
      map((res) => {
        if (res.code !== '200') throw new Error(res.message);
      }),
    );
  }

  updateTask(id: number, task: UpdateTaskDto): Observable<Task> {
    return this.http.put<Response<Task>>(this.api + '/task/update/' + id, task).pipe(
      map((res) => {
        if (res.code === '200') {
          return res.data;
        } else {
          throw new Error(res.message);
        }
      }),
    );
  }

  getTask(id: number): Observable<Task> {
    return this.http.get<Response<Task>>(this.api + '/task/' + id).pipe(
      map((res) => {
        if (res.code === '200') {
          return res.data;
        } else {
          throw new Error(res.message);
        }
      }),
    );
  }

}
