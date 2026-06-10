import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Flash } from '../../models/Flash';

@Injectable({
  providedIn: 'root',
})
export class FlashMessageService {
  private message = new Subject<Flash>();

  message$ = this.message.asObservable();

  success(text: string) {
    this.message.next({ text, type: 'success' });
  }

  error(text: string) {
    this.message.next({ text, type: 'error' });
  }

  warning(text: string) {
    this.message.next({
      text,
      type: 'warning',
    });
  }
}
