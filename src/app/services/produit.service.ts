import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produit } from '../models/produit.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {
  private apiUrl = `${environment.apiUrl}/MS-PRODUIT/api/produits`;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }),
    withCredentials: false
  };

  constructor(private http: HttpClient) { }

  // Get all products
  getProduits(): Observable<Produit[]> {
    return this.http.get<Produit[]>(`${this.apiUrl}/getproduit`, this.httpOptions);
  }

  // Add a new product
  ajouterProduit(produit: Produit): Observable<Produit> {
    return this.http.post<Produit>(`${this.apiUrl}/ajouter`, produit, this.httpOptions);
  }

  // Update a product
  modifierProduit(id: number, produit: Produit): Observable<Produit> {
    return this.http.put<Produit>(`${this.apiUrl}/modifier/${id}`, produit, this.httpOptions);
  }

  // Update product stock
  mettreAJourStock(id: number, quantite: number): Observable<Produit> {
    return this.http.put<Produit>(`${this.apiUrl}/stock/${id}`, quantite, this.httpOptions);
  }

  // Delete a product
  supprimerProduit(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/supprimer/${id}`, this.httpOptions);
  }
}
