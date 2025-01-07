import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageproduitComponent } from './pageproduit/pageproduit.component';
import {LoginComponent} from './login/login.component';

const routes: Routes = [
  { path: '', redirectTo: '/produits', pathMatch: 'full' },
  { path: 'produits', component: PageproduitComponent },
  { path: 'login', component: LoginComponent },
  { path: 'Paiement', loadChildren: () => import('./paiement/paiement.module').then(m => m.PaiementModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
