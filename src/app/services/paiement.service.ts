import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Paiement } from '../models/paiement.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaiementService {
  private apiUrl = environment.apiUrl + '/paiements';

  constructor(private http: HttpClient) {
    console.log('URL de l\'API:', this.apiUrl);
  }

  getPaiements(): Observable<Paiement[]> {
    console.log('Appel GET vers:', this.apiUrl);
    return this.http.get<Paiement[]>(this.apiUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  getPaiementById(id: number): Observable<Paiement> {
    return this.http.get<Paiement>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  creerPaiement(paiement: Paiement): Observable<Paiement> {
    return this.http.post<Paiement>(this.apiUrl, paiement)
      .pipe(
        catchError(this.handleError)
      );
  }

  updatePaiement(id: number, paiement: Paiement): Observable<Paiement> {
    return this.http.put<Paiement>(`${this.apiUrl}/${id}`, paiement)
      .pipe(
        catchError(this.handleError)
      );
  }

  deletePaiement(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Une erreur est survenue:', error);
    let errorMessage = 'Une erreur est survenue';
    
    if (error.error instanceof Error) {
      // Erreur côté client
      errorMessage = `Erreur: ${error.error.message}`;
    } else {
      // Erreur côté serveur
      errorMessage = `Code d'erreur ${error.status}, message: ${error.error?.message || error.message}`;
    }
    
    return throwError(() => errorMessage);
  }
}
