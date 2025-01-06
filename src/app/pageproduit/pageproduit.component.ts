import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NotificationService } from '../services/notification.service';
import { NotificationComponent } from '../components/notification/notification.component';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

interface Produit {
  idProduit?: number;
  nom: string;
  description: string;
  prix: number;
  quantiteStock: number;
  categorie: string;
}

@Component({
  selector: 'app-pageproduit',
  templateUrl: './pageproduit.component.html',
  styleUrls: ['./pageproduit.component.css'],
  standalone: true,
  imports: [CommonModule, NgbModule, FormsModule, NotificationComponent]
})
export class PageproduitComponent implements OnInit {
  @ViewChild('productForm') productForm!: NgForm;
  
  searchTerm: string = '';
  produits: Produit[] = [];
  produitsAffiches: Produit[] = [];
  produitAModifier: Produit | null = null;
  loading: boolean = false;
  error: string | null = null;
  successMessage: string | null = null;
  
  nouveauProduit: Produit = {
    nom: '',
    description: '',
    prix: 0,
    quantiteStock: 0,
    categorie: ''
  };

  constructor(
    private modalService: NgbModal,
    private notificationService: NotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.chargerProduits();
  }

  chargerProduits() {
    this.loading = true;
    this.error = null;
    
    try {
      // Charger les produits depuis le localStorage
      const produitsStockes = localStorage.getItem('produits');
      if (produitsStockes) {
        this.produits = JSON.parse(produitsStockes);
      } else {
        // Données initiales si le localStorage est vide
        this.produits = [
          {
            idProduit: 1,
            nom: 'Produit 1',
            description: 'Description du produit 1',
            prix: 29.99,
            quantiteStock: 100,
            categorie: 'Catégorie 1'
          },
          {
            idProduit: 2,
            nom: 'Produit 2',
            description: 'Description du produit 2',
            prix: 49.99,
            quantiteStock: 75,
            categorie: 'Catégorie 2'
          }
        ];
        this.sauvegarderDansLocalStorage();
      }
      this.produitsAffiches = [...this.produits];
      this.loading = false;
    } catch (err) {
      this.error = 'Une erreur est survenue lors du chargement des produits.';
      this.loading = false;
    }
  }

  sauvegarderDansLocalStorage() {
    localStorage.setItem('produits', JSON.stringify(this.produits));
  }

  searchProducts() {
    if (!this.searchTerm.trim()) {
      this.produitsAffiches = [...this.produits];
      return;
    }
    
    const searchTermLower = this.searchTerm.toLowerCase();
    this.produitsAffiches = this.produits.filter(produit => 
      produit.nom.toLowerCase().includes(searchTermLower) ||
      produit.description.toLowerCase().includes(searchTermLower) ||
      produit.categorie.toLowerCase().includes(searchTermLower)
    );
  }

  openAddProductModal(content: any) {
    this.resetNouveauProduit();
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  resetNouveauProduit() {
    this.nouveauProduit = {
      nom: '',
      description: '',
      prix: 0,
      quantiteStock: 0,
      categorie: ''
    };
  }

  sauvegarderProduit(form: NgForm, modal: any) {
    if (form.valid) {
      try {
        const maxId = Math.max(...this.produits.map(p => p.idProduit || 0));
        const nouveauProduitAvecId = {
          ...this.nouveauProduit,
          idProduit: maxId + 1
        };
        
        this.produits.push(nouveauProduitAvecId);
        this.produitsAffiches = [...this.produits];
        this.sauvegarderDansLocalStorage();
        modal.close();
        this.resetNouveauProduit();
        form.resetForm();
        this.notificationService.showSuccess('Produit ajouté avec succès !');
      } catch (error) {
        console.error('Erreur lors de la sauvegarde du produit:', error);
        this.notificationService.showError('Une erreur est survenue lors de la sauvegarde du produit.');
      }
    } else {
      Object.keys(form.controls).forEach(key => {
        const control = form.controls[key];
        if (control.invalid) {
          control.markAsTouched();
        }
      });
    }
  }

  supprimerProduit(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
      const index = this.produits.findIndex(p => p.idProduit === id);
      if (index !== -1) {
        this.produits.splice(index, 1);
        this.produitsAffiches = [...this.produits];
        this.sauvegarderDansLocalStorage();
        this.notificationService.showSuccess('Produit supprimé avec succès !');
      } else {
        this.notificationService.showError('Produit non trouvé.');
      }
    }
  }

  naviguerVersPaiement(produit: Produit) {
    this.router.navigate(['/Paiement'], {
      queryParams: {
        montant: produit.prix,
        idProduit: produit.idProduit
      }
    });
  }

  openEditProductModal(content: any, produit: Produit) {
    this.produitAModifier = { ...produit };
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  modifierProduit(form: NgForm, modal: any) {
    if (form.valid && this.produitAModifier) {
      try {
        const index = this.produits.findIndex(p => p.idProduit === this.produitAModifier!.idProduit);
        if (index !== -1) {
          this.produits[index] = { ...this.produitAModifier };
          this.produitsAffiches = [...this.produits];
          this.sauvegarderDansLocalStorage();
          modal.close();
          this.produitAModifier = null;
          this.notificationService.showSuccess('Produit modifié avec succès !');
        } else {
          this.notificationService.showError('Produit non trouvé.');
        }
      } catch (error) {
        console.error('Erreur lors de la modification du produit:', error);
        this.notificationService.showError('Une erreur est survenue lors de la modification du produit.');
      }
    } else {
      Object.keys(form.controls).forEach(key => {
        const control = form.controls[key];
        if (control.invalid) {
          control.markAsTouched();
        }
      });
    }
  }
}
