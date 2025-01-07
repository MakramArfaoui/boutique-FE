import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface Notification {
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationSubject = new Subject<Notification>();
  notifications$ = this.notificationSubject.asObservable();

  showSuccess(message: string) {
    this.show(message, 'success');
  }

  showError(message: string) {
    this.show(message, 'error');
  }

  showInfo(message: string) {
    this.show(message, 'info');
  }

  showWarning(message: string) {
    this.show(message, 'warning');
  }

  private show(message: string, type: 'success' | 'error' | 'info' | 'warning') {
    this.notificationSubject.next({ message, type });
  }
}
