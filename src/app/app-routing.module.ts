import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageproduitComponent } from './pageproduit/pageproduit.component';

const routes: Routes = [
  { path: '', redirectTo: '/produits', pathMatch: 'full' },
  { path: 'produits', component: PageproduitComponent },
  { path: 'Paiement', loadChildren: () => import('./paiement/paiement.module').then(m => m.PaiementModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
