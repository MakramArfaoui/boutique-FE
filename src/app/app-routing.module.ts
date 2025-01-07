import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageproduitComponent } from './pageproduit/pageproduit.component';

const routes: Routes = [
  { path: '', redirectTo: '/produits', pathMatch: 'full' },
  { path: 'produits', loadChildren: () => import('./pageproduit/pageproduit.module').then(m => m.PageproduitModule) },
  { path: 'Paiement', loadChildren: () => import('./paiement/paiement.module').then(m => m.PaiementModule) },
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
