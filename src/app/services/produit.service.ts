import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produit } from '../models/produit.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {
  private apiUrl = `${environment.apiUrl}/MS-PRODUIT/api/produits`;

  constructor(private http: HttpClient) { }

  // Get all products
  getProduits(): Observable<Produit[]> {
    return this.http.get<Produit[]>(`${this.apiUrl}/getproduit`);
  }

  // Add a new product
  ajouterProduit(produit: Produit): Observable<Produit> {
    return this.http.post<Produit>(`${this.apiUrl}/ajouter`, produit);
  }

  // Update a product
  modifierProduit(id: number, produit: Produit): Observable<Produit> {
    return this.http.put<Produit>(`${this.apiUrl}/modifier/${id}`, produit);
  }

  // Update product stock
  mettreAJourStock(id: number, quantite: number): Observable<Produit> {
    return this.http.put<Produit>(`${this.apiUrl}/stock/${id}`, quantite);
  }

  // Delete a product
  supprimerProduit(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/supprimer/${id}`);
  }
}
