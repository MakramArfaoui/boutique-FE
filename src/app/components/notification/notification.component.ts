import { Component, OnInit, OnDestroy } from '@angular/core';
import { NotificationService } from '../../services/notification.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Notification } from '../../services/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class NotificationComponent implements OnInit, OnDestroy {
  notifications: Notification[] = [];
  private subscription: Subscription | null = null;

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.subscription = this.notificationService.notifications$.subscribe(
      (notification: Notification) => {
        this.notifications.push(notification);
        setTimeout(() => {
          this.notifications = this.notifications.filter(n => n !== notification);
        }, 5000);
      }
    );
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  getNotificationClass(type: string): string {
    const classes = {
      success: 'alert-success',
      error: 'alert-danger',
      info: 'alert-info',
      warning: 'alert-warning'
    };
    return `alert ${classes[type as keyof typeof classes] || 'alert-secondary'}`;
  }

  removeNotification(notification: Notification) {
    this.notifications = this.notifications.filter(n => n !== notification);
  }
}
