import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PageproduitComponent } from './pageproduit.component';
import { FormsModule } from '@angular/forms';
import { NotificationComponent } from '../components/notification/notification.component';
import { PageproduitRoutingModule } from './pageproduit-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NgbModule,
    PageproduitRoutingModule,
    PageproduitComponent,
    NotificationComponent
  ]
})
export class PageproduitModule { }
