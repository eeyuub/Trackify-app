export enum OrderStatus {
    PROCESSING = 'en-preparation',
    READY = 'prêt',
    DELIVERED = 'livré',
    CANCELLED = 'annulé'
}

export function getStatus(status: OrderStatus) {
   switch (status) {
    case OrderStatus.PROCESSING:
        return 'En préparation';
    case OrderStatus.READY:
        return 'Prêt';
    case OrderStatus.DELIVERED:
        return 'Livré';
    case OrderStatus.CANCELLED:
        return 'Annulé';
   }
}

export function getInformelDescription(status: OrderStatus) {
    switch (status) {
        case OrderStatus.PROCESSING:
            return 'En préparation - rta7 db N3lmok b la commande dyalk';
        case OrderStatus.READY:
            return 'Prêt - Doz Takhed La commande dyalk';
        case OrderStatus.DELIVERED:
            return 'Livré - Bseeha';
        case OrderStatus.CANCELLED:
            return 'Annulé - Machi Mochkil 3awed Rje3 ';
    }
}


export function getFormelDescription(status: OrderStatus) {
    switch (status) {
        case OrderStatus.PROCESSING:
            return 'En préparation - Votre commande est en cours de préparation';
        case OrderStatus.READY:
            return 'Prêt - Votre commande est prête à être récupérée.';
        case OrderStatus.DELIVERED:
            return 'Livré - Bon appetit';
        case OrderStatus.CANCELLED:
            return 'Annulé - Votre commande a été annulée';
    }
}
