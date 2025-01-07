export interface Paiement {
  id?: number;
  montant: number;
  modePaiement: string;
  numeroCarte?: string;
  dateExpiration?: string;
  codeSecurite?: string;
  statut?: string;
  idCommande?: string;
}

// Optionnel : Builder pattern pour la création de Paiement
export class PaiementBuilder {
  private paiement: Partial<Paiement> = {};

  montant(montant: number): PaiementBuilder {
    this.paiement.montant = montant;
    return this;
  }

  modePaiement(modePaiement: string): PaiementBuilder {
    this.paiement.modePaiement = modePaiement;
    return this;
  }

  numeroCarte(numeroCarte: string): PaiementBuilder {
    this.paiement.numeroCarte = numeroCarte;
    return this;
  }

  dateExpiration(dateExpiration: string): PaiementBuilder {
    this.paiement.dateExpiration = dateExpiration;
    return this;
  }

  codeSecurite(codeSecurite: string): PaiementBuilder {
    this.paiement.codeSecurite = codeSecurite;
    return this;
  }

  idCommande(idCommande: string): PaiementBuilder {
    this.paiement.idCommande = idCommande;
    return this;
  }

  build(): Paiement {
    // Vérification que tous les champs requis sont présents
    if (!this.paiement.montant || !this.paiement.modePaiement) {
      throw new Error('Tous les champs requis doivent être renseignés');
    }
    return this.paiement as Paiement;
  }
}

/* Example usage:
const paiement = new PaiementBuilder()
  .montant(100.50)
  .modePaiement('CARTE')
  .idCommande('123')
  .build();
*/
