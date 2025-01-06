import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produit } from '../models/produit.model';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {
  private apiUrl = 'http://localhost:8080/api/produits';

  constructor(private http: HttpClient) { }

  // Récupérer tous les produits
  getProduits(): Observable<Produit[]> {
    return this.http.get<Produit[]>(`${this.apiUrl}/getproduit`);
  }

  // Ajouter un nouveau produit
  ajouterProduit(produit: Produit): Observable<Produit> {
    return this.http.post<Produit>(`${this.apiUrl}/ajouter`, produit);
  }

  // Modifier un produit
  modifierProduit(id: number, produit: Produit): Observable<Produit> {
    return this.http.put<Produit>(`${this.apiUrl}/modifier/${id}`, produit);
  }

  // Mettre à jour le stock d'un produit
  mettreAJourStock(id: number, quantite: number): Observable<Produit> {
    return this.http.put<Produit>(`${this.apiUrl}/stock/${id}`, quantite);
  }

  // Supprimer un produit
  supprimerProduit(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/supprimer/${id}`);
  }

  // Gérer les erreurs (méthode utilitaire)
  private handleError(error: any): Observable<never> {
    console.error('Une erreur est survenue:', error);
    throw error;
  }
}
