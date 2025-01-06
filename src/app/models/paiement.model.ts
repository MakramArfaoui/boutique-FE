export interface Paiement {
    idPaiement?: number;
    montant: number;
    datePaiement: Date;
    modePaiement: string;
    idCommande: number;
}

// Optionnel : Builder pattern pour la création de Paiement
export class PaiementBuilder {
    private paiement: Partial<Paiement> = {};

    idPaiement(idPaiement: number): PaiementBuilder {
        this.paiement.idPaiement = idPaiement;
        return this;
    }

    montant(montant: number): PaiementBuilder {
        this.paiement.montant = montant;
        return this;
    }

    datePaiement(datePaiement: Date): PaiementBuilder {
        this.paiement.datePaiement = datePaiement;
        return this;
    }

    modePaiement(modePaiement: string): PaiementBuilder {
        this.paiement.modePaiement = modePaiement;
        return this;
    }

    idCommande(idCommande: number): PaiementBuilder {
        this.paiement.idCommande = idCommande;
        return this;
    }

    build(): Paiement {
        // Vérification que tous les champs requis sont présents
        if (!this.paiement.montant || !this.paiement.datePaiement || 
            !this.paiement.modePaiement || !this.paiement.idCommande) {
            throw new Error('Tous les champs requis doivent être renseignés');
        }
        return this.paiement as Paiement;
    }
}

// Exemple d'utilisation du builder :
/*
const paiement = new PaiementBuilder()
    .montant(100.50)
    .datePaiement(new Date())
    .modePaiement('CARTE')
    .idCommande(1)
    .build();
*/
