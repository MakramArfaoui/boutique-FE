import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageproduitComponent } from './pageproduit.component';

const routes: Routes = [{ path: '', component: PageproduitComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageproduitRoutingModule { }
