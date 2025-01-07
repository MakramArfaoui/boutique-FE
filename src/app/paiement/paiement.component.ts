import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PaiementService } from '../services/paiement.service';
import { NotificationService } from '../services/notification.service';
import { NotificationComponent } from '../components/notification/notification.component';
import { Paiement } from '../models/paiement.model';

@Component({
  selector: 'app-paiement',
  templateUrl: './paiement.component.html',
  styleUrls: ['./paiement.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NotificationComponent]
})
export class PaiementComponent implements OnInit {
  paiementForm: FormGroup;
  loading = false;
  submitted = false;
  paiementSelectionne: Paiement | null = null;
  paiements: Paiement[] = [];
  modesPaiement = ['CARTE', 'ESPECES', 'CHEQUE'];
  idCommande: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private paiementService: PaiementService,
    private notificationService: NotificationService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.paiementForm = this.formBuilder.group({
      montant: ['', [Validators.required, Validators.min(0)]],
      modePaiement: ['', Validators.required],
      numeroCarte: [''],
      dateExpiration: [''],
      codeSecurite: ['']
    });
  }

  ngOnInit() {
    this.initializeFormFromUrl();
    this.chargerPaiements();

    // Écouter les changements du mode de paiement
    this.paiementForm.get('modePaiement')?.valueChanges.subscribe(mode => {
      this.updateValidationsCarte(mode);
    });
  }

  private initializeFormFromUrl() {
    const montantParam = this.route.snapshot.queryParamMap.get('montant');
    this.idCommande = this.route.snapshot.queryParamMap.get('commande');
    
    if (montantParam) {
      this.paiementForm.patchValue({ montant: parseFloat(montantParam) });
    }
  }

  private updateValidationsCarte(mode: string) {
    const carteControls = ['numeroCarte', 'dateExpiration', 'codeSecurite'];
    
    if (mode === 'CARTE') {
      carteControls.forEach(control => {
        this.paiementForm.get(control)?.setValidators([Validators.required]);
      });
    } else {
      carteControls.forEach(control => {
        this.paiementForm.get(control)?.clearValidators();
        this.paiementForm.get(control)?.setValue('');
      });
    }
    
    carteControls.forEach(control => {
      this.paiementForm.get(control)?.updateValueAndValidity();
    });
  }

  chargerPaiements() {
    this.loading = true;
    this.paiementService.getPaiements().subscribe({
      next: (data) => {
        this.paiements = data;
        this.loading = false;
      },
      error: (error) => {
        this.notificationService.showError('Erreur lors du chargement des paiements');
        console.error('Erreur:', error);
        this.loading = false;
      }
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.paiementForm.invalid) {
      return;
    }

    this.loading = true;
    const paiementData = {
      ...this.paiementForm.value,
      idCommande: this.idCommande
    };

    if (this.paiementSelectionne) {
      // Mise à jour d'un paiement existant
      this.paiementService.updatePaiement(this.paiementSelectionne.id!, paiementData).subscribe({
        next: () => {
          this.notificationService.showSuccess('Paiement modifié avec succès');
          this.resetForm();
          this.chargerPaiements();
        },
        error: (error) => {
          this.notificationService.showError('Erreur lors de la modification du paiement');
          console.error('Erreur:', error);
          this.loading = false;
        }
      });
    } else {
      // Création d'un nouveau paiement
      this.paiementService.creerPaiement(paiementData).subscribe({
        next: () => {
          this.notificationService.showSuccess('Paiement créé avec succès');
          this.resetForm();
          this.chargerPaiements();
        },
        error: (error) => {
          this.notificationService.showError('Erreur lors de la création du paiement');
          console.error('Erreur:', error);
          this.loading = false;
        }
      });
    }
  }

  selectionnerPaiement(paiement: Paiement) {
    this.paiementSelectionne = paiement;
    this.idCommande = paiement.idCommande || null;
    this.paiementForm.patchValue({
      montant: paiement.montant,
      modePaiement: paiement.modePaiement,
      numeroCarte: paiement.numeroCarte,
      dateExpiration: paiement.dateExpiration,
      codeSecurite: paiement.codeSecurite
    });
  }

  supprimerPaiement(id: number) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce paiement ?')) {
      this.loading = true;
      this.paiementService.deletePaiement(id).subscribe({
        next: () => {
          this.notificationService.showSuccess('Paiement supprimé avec succès');
          this.chargerPaiements();
        },
        error: (error) => {
          this.notificationService.showError('Erreur lors de la suppression du paiement');
          console.error('Erreur:', error);
          this.loading = false;
        }
      });
    }
  }

  resetForm() {
    this.submitted = false;
    this.loading = false;
    this.paiementSelectionne = null;
    this.paiementForm.reset();
  }

  // Getters pour accéder facilement aux contrôles du formulaire
  get f() { return this.paiementForm.controls; }
}
