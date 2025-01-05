export class Produit {
    idProduit: number;
    nom: string;
    description: string;
    prix: number;
    quantiteEnStock: number;
    promotion: number;
    categorie: string;

    constructor(
        idProduit: number = 0,
        nom: string = '',
        description: string = '',
        prix: number = 0,
        quantiteEnStock: number = 0,
        promotion: number = 0,
        categorie: string = ''
    ) {
        this.idProduit = idProduit;
        this.nom = nom;
        this.description = description;
        this.prix = prix;
        this.quantiteEnStock = quantiteEnStock;
        this.promotion = promotion;
        this.categorie = categorie;
    }
}
