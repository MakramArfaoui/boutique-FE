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

  supprimerProduit(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
      this.produitService.supprimerProduit(id).subscribe({
        next: () => {
          this.produits = this.produits.filter(p => p.idProduit !== id);
        },
        error: (err) => {
          this.error = 'Erreur lors de la suppression du produit';
          console.error('Erreur:', err);
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
