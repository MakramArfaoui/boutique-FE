import { Component, OnInit, OnDestroy } from '@angular/core';
import { NotificationService } from '../../services/notification.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class NotificationComponent implements OnInit, OnDestroy {
  message: string = '';
  type: string = '';
  show: boolean = false;
  private subscription: Subscription;

  constructor(private notificationService: NotificationService) {
    this.subscription = this.notificationService.notification$.subscribe(
      notification => {
        this.message = notification.message;
        this.type = notification.type;
        this.show = true;
        setTimeout(() => {
          this.show = false;
        }, 3000);
      }
    );
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
