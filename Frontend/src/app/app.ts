import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TaskComponent } from './components/task-component/task-component';
import { NavComponent } from './components/nav-component/nav-component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FlashMessageService } from './services/messages/flash-message-service';
import { Flash } from './models/Flash';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TaskComponent, NavComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('frontend');

  constructor(
    private snackbar: MatSnackBar,
    private flashService: FlashMessageService,
  ) {
    this.flashService.message$.subscribe((flash: Flash) => {
      this.snackbar.open(flash.text, 'Close', {
        duration: 3000,
        panelClass: `snackbar-${flash.type}`,
      });
    });
  }
}
