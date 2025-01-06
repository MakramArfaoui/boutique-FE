import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Paiement } from '../models/paiement.model';

@Injectable({
  providedIn: 'root'
})
export class PaiementService {
  private apiUrl = 'http://localhost:8080/api/paiements';

  constructor(private http: HttpClient) { }

  // Récupérer tous les paiements
  getPaiements(): Observable<Paiement[]> {
    return this.http.get<Paiement[]>(`${this.apiUrl}/all`)
      .pipe(catchError(this.handleError));
  }

  // Récupérer un paiement par ID
  getPaiementById(id: number): Observable<Paiement> {
    return this.http.get<Paiement>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  // Créer un nouveau paiement
  creerPaiement(paiement: Paiement): Observable<Paiement> {
    return this.http.post<Paiement>(`${this.apiUrl}/create`, paiement)
      .pipe(catchError(this.handleError));
  }

  // Mettre à jour un paiement
  updatePaiement(id: number, paiement: Paiement): Observable<Paiement> {
    return this.http.put<Paiement>(`${this.apiUrl}/update/${id}`, paiement)
      .pipe(catchError(this.handleError));
  }

  // Supprimer un paiement
  deletePaiement(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`)
      .pipe(catchError(this.handleError));
  }

  // Récupérer les paiements par ID de commande
  getPaiementsParCommande(idCommande: number): Observable<Paiement[]> {
    return this.http.get<Paiement[]>(`${this.apiUrl}/commande/${idCommande}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Une erreur est survenue';
    
    if (error.error instanceof ErrorEvent) {
      // Erreur côté client
      errorMessage = `Erreur: ${error.error.message}`;
    } else {
      // Erreur côté serveur
      switch (error.status) {
        case 400:
          errorMessage = 'Requête invalide';
          break;
        case 404:
          errorMessage = 'Ressource non trouvée';
          break;
        case 500:
          errorMessage = 'Erreur serveur';
          break;
        default:
          errorMessage = `Code d'erreur: ${error.status}, Message: ${error.message}`;
      }
    }
    
    console.error('Une erreur est survenue:', error);
    return throwError(() => new Error(errorMessage));
  }
}
