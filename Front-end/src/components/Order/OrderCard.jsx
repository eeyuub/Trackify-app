import React from 'react';
import ConfirmationModal from './ConfirmationModal'; 

const OrderCard = ({ order, handleStatusChange, GetStyleOfStatus }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 h-fit">
        {/* Order ID and Status */}
        <h2 className="text-xl font-semibold mb-2">Commande ID : {order.id}</h2>
        <p className="text-gray-600 mb-4">
            Statut actuel : 
            <span className={`inline-block ml-2 px-3 py-1 rounded-full text-sm font-semibold ${GetStyleOfStatus(order.status)}`}>
            {order.status}
            </span>
        </p>

        {/* Total Price */}
        <p className="text-gray-700 mb-2">
            <span className="font-semibold">Prix total :</span> {order.totalPrice} DH
        </p>

        {/* Product Details */}
        <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Détails de la commande :</h3>
            <ul className="list-disc list-inside text-gray-700">
            {order.products.map((item, index) => (
                <li key={index} className="mb-2">
                <span className="font-semibold">{item.product.name} x {item.quantity}</span> →  {item.totalPrice} DH
                </li>
            ))}
            </ul>
        </div>

        {/* Buttons for Status Change */}
        <div className="grid grid-cols-2 gap-2 mt-4">
            <button
            onClick={() => handleStatusChange(order.id, 'en-preparation')}
            className={`px-4 py-2 rounded-md transition duration-200 ${GetStyleOfStatus('en-preparation')}`}
            >
            En préparation
            </button>

            <button
            onClick={() => handleStatusChange(order.id, 'prêt')}
            className={`px-4 py-2 rounded-md transition duration-200 ${GetStyleOfStatus('prêt')}`}
            >
            Prêt
            </button>

            <button
            onClick={() => handleStatusChange(order.id, 'livré')}
            className={`px-4 py-2 rounded-md transition duration-200 ${GetStyleOfStatus('livré')}`}
            >
            Livré
            </button>

            <button
            onClick={() => handleStatusChange(order.id, 'annulé')}
            className={`px-4 py-2 rounded-md transition duration-200 ${GetStyleOfStatus('annulé')}`}
            >
            Annulé
            </button>
        </div>
    </div>
  );
};

export default OrderCard;