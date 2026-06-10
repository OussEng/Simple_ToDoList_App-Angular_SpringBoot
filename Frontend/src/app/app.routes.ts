import { Routes } from '@angular/router';
import { TaskComponent } from './components/task-component/task-component';
import { HomeComponent } from './components/home-component/home-component';

export const routes: Routes = [
  {path: "", component : HomeComponent},
  {path: "tasks", component: TaskComponent }
];
