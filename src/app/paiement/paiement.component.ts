import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { PaiementService } from '../services/paiement.service';
import { NotificationService } from '../services/notification.service';
import { Paiement } from '../models/paiement.model';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NotificationComponent } from '../components/notification/notification.component';

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
  modesPaiement = ['CARTE', 'PAYPAL', 'VIREMENT'];
  
  constructor(
    private formBuilder: FormBuilder,
    private paiementService: PaiementService,
    private notificationService: NotificationService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.paiementForm = this.formBuilder.group({
      montant: ['', [Validators.required, Validators.min(0)]],
      modePaiement: ['', Validators.required],
      idCommande: ['', Validators.required],
      numeroCarte: ['', [Validators.required, Validators.pattern('^[0-9]{16}$')]],
      dateExpiration: ['', [Validators.required, Validators.pattern('^(0[1-9]|1[0-2])/[0-9]{2}$')]],
      cvv: ['', [Validators.required, Validators.pattern('^[0-9]{3,4}$')]]
    });
  }

  ngOnInit(): void {
    // Récupérer les paramètres de l'URL
    this.route.queryParams.subscribe(params => {
      if (params['montant']) {
        this.paiementForm.patchValue({
          montant: params['montant']
        });
      }
      if (params['idProduit']) {
        this.paiementForm.patchValue({
          idCommande: params['idProduit']
        });
      }
    });

    // Gérer la validation conditionnelle pour les champs de carte
    this.paiementForm.get('modePaiement')?.valueChanges.subscribe(mode => {
      const cartControls = ['numeroCarte', 'dateExpiration', 'cvv'];
      
      if (mode === 'CARTE') {
        cartControls.forEach(control => {
          this.paiementForm.get(control)?.enable();
        });
      } else {
        cartControls.forEach(control => {
          this.paiementForm.get(control)?.disable();
          this.paiementForm.get(control)?.clearValidators();
          this.paiementForm.get(control)?.updateValueAndValidity();
        });
      }
    });
  }

  onSubmit() {
    if (this.paiementForm.valid) {
      this.loading = true;
      
      const paiement: Paiement = {
        montant: this.paiementForm.get('montant')?.value,
        datePaiement: new Date(),
        modePaiement: this.paiementForm.get('modePaiement')?.value,
        idCommande: this.paiementForm.get('idCommande')?.value
      };

      this.paiementService.creerPaiement(paiement).subscribe(
        (response) => {
          this.notificationService.showSuccess('Paiement effectué avec succès !');
          this.loading = false;
          this.router.navigate(['/confirmation-paiement']);
        },
        (error) => {
          this.notificationService.showError('Erreur lors du paiement. Veuillez réessayer.');
          this.loading = false;
        }
      );
    } else {
      this.markFormGroupTouched(this.paiementForm);
    }
  }

  resetForm() {
    this.paiementForm.reset();
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.paiementForm.get(fieldName);
    return field ? (field.invalid && (field.dirty || field.touched)) : false;
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
