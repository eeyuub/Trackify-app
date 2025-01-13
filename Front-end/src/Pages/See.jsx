import React, { useEffect, useState } from 'react';

const SSEClient = () => {
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    // Créer une instance EventSource pour se connecter au endpoint SSE
    const eventSource = new EventSource('http://localhost:3000/orders/new-order');

    // Écouter les messages du serveur
    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setOrderData(data.order); // Mettre à jour l'état avec les nouvelles données de commande
    };

    // Gérer les erreurs
    eventSource.onerror = (error) => {
      console.error('Échec de EventSource :', error);
      eventSource.close(); // Fermer la connexion en cas d'erreur
    };

    // Fonction de nettoyage pour fermer la connexion lorsque le composant est démonté
    return () => {
      eventSource.close();
    };
  }, []);


  const GetStyleOfStatus = (status) => {
    switch (status) {
      case 'en-preparation':
        return 'bg-yellow-200 text-yellow-800';
      case 'prêt':
        return 'bg-blue-200 text-blue-800';
      case 'livré':
        return 'bg-green-200 text-green-800';
      case 'annulé':
        return 'bg-red-200 text-red-800';
      default:
        return 'bg-gray-200 text-gray-800';
    }
  }


  return (
    <div className="flex flex-col items-center justify-center min-h-screen  p-4">
      {orderData ? (
        <div className="bg-white p-6 rounded-lg w-full max-w-2xl">
          {orderData.qrCode && (
            <div className="flex flex-col items-center justify-center mt-6 mb-4 border-b border-gray-200 pb-6">
              <h2 className="text-xl font-semibold mb-2">Numero de commande :{orderData.id}</h2>
              <img src={orderData.qrCode} alt="Code QR" className="w-60 h-60" />
            </div>
          )}
          <div className="mb-6 text-center">
            <p><strong>Statut :</strong> {orderData.status}</p>
            <p><strong>Prix Total :</strong> {orderData.totalPrice} DH</p>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Détails de la commande</h2>
            <div className="border border-gray-200 rounded-lg p-4">
              {orderData.products.map((product, index) => (
                <div key={index} className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
                  <div className="flex-1">
                    <p className="font-medium">{product.product.name}</p>
                    <p className="text-sm text-gray-600">Quantité : {product.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{product.price} DH</p>
                    <p className="text-sm text-gray-600">Total : {product.totalPrice} DH</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <p className="text-gray-600">En attente de nouvelles commandes...</p>
      )}
    </div>
  );
};

export default SSEClient;