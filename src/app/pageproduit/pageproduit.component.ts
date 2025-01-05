import { Component, OnInit } from '@angular/core';
import { ProduitService } from '../services/produit.service';
import { Produit } from '../models/produit.model';

@Component({
  selector: 'app-pageproduit',
  standalone: false,
  templateUrl: './pageproduit.component.html',
  styleUrls: ['./pageproduit.component.css']
})
export class PageproduitComponent implements OnInit {
  produits: Produit[] = [];
  loading: boolean = false;
  error: string = '';
  produitAModifier: Produit | null = null;
  modeEdition: boolean = false;

  constructor(private produitService: ProduitService) {}

  ngOnInit(): void {
    this.chargerProduits();
  }

  chargerProduits(): void {
    this.loading = true;
    this.error = '';
    
    this.produitService.getProduits().subscribe({
      next: (data) => {
        this.produits = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Erreur lors du chargement des produits';
        this.loading = false;
        console.error('Erreur:', err);
      }
    });
  }

  modifierProduit(produit: Produit): void {
    this.produitAModifier = { ...produit };
    this.modeEdition = true;
  }

  sauvegarderModification(): void {
    if (this.produitAModifier) {
      this.produitService.modifierProduit(this.produitAModifier.idProduit!, this.produitAModifier).subscribe({
        next: (produitMisAJour) => {
          const index = this.produits.findIndex(p => p.idProduit === produitMisAJour.idProduit);
          if (index !== -1) {
            this.produits[index] = produitMisAJour;
          }
          this.annulerModification();
        },
        error: (err) => {
          this.error = 'Erreur lors de la modification du produit';
          console.error('Erreur:', err);
        }
      });
    }
  }

  annulerModification(): void {
    this.produitAModifier = null;
    this.modeEdition = false;
  }

  supprimerProduit(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
      // First, remove from UI immediately
      this.produits = this.produits.filter(p => p.idProduit !== id);
      
      this.produitService.supprimerProduit(id).subscribe({
        next: () => {
          // Product already removed from UI
          console.log('Produit supprimé avec succès');
        },
        error: (err) => {
          if (err.status === 0 || (err.status === 200 && err.statusText === 'OK')) {
            // If we get a CORS error but status is 200, or if we get a status 0,
            // the deletion was probably successful
            console.log('Produit probablement supprimé malgré l\'erreur CORS');
          } else {
            // If it's a real error, revert the UI change and show error
            console.error('Erreur lors de la suppression:', err);
            this.error = 'Erreur lors de la suppression du produit';
            // Reload the products to ensure UI is in sync
            this.chargerProduits();
          }
        }
      });
    }
  }

  mettreAJourStock(id: number, nouvelleQuantite: number): void {
    this.produitService.mettreAJourStock(id, nouvelleQuantite).subscribe({
      next: (produitMisAJour) => {
        const index = this.produits.findIndex(p => p.idProduit === id);
        if (index !== -1) {
          this.produits[index] = produitMisAJour;
        }
      },
      error: (err) => {
        this.error = 'Erreur lors de la mise à jour du stock';
        console.error('Erreur:', err);
      }
    });
  }
}
