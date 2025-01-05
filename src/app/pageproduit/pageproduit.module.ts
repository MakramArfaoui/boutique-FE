import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PageproduitRoutingModule } from './pageproduit-routing.module';
import { PageproduitComponent } from './pageproduit.component';

@NgModule({
  declarations: [
    PageproduitComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    PageproduitRoutingModule
  ],
  exports: [
    PageproduitComponent
  ]
})
export class PageproduitModule { }
