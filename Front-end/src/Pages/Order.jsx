import React from 'react';
import useOrders from '../Hooks/Orders/getOrders';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useMarkAsReady from '../Hooks/Orders/useSetReady';
import useMarkAsDelivered from '../Hooks/Orders/useSetDelivred';
import useCancelOrder from '../Hooks/Orders/useSetCancel';
import useMarkAsPreparing from '../Hooks/Orders/useSetPreparation';
import OrderCard from '../components/Order/OrderCard'; 

const Order = () => {
    const { orders, loading, error, fetchOrders } = useOrders();

    const { markAsReady } = useMarkAsReady();
    const { markAsDelivered } = useMarkAsDelivered();
    const { cancelOrder } = useCancelOrder();
    const { markAsPreparing } = useMarkAsPreparing();

    const GetStyleOfStatus = (status) => {
        switch (status) {
        case 'en-preparation':
            return 'bg-gray-200 text-gray-800';
        case 'prêt':
            return 'bg-yellow-200 text-yellow-800';
        case 'livré':
            return 'bg-green-200 text-green-800';
        case 'annulé':
            return 'bg-red-200 text-red-800';
        default:
            return 'bg-gray-200 text-gray-800';
        }
    };

    const handleStatusChange = async (orderId, newStatus) => {
        try {
        switch (newStatus) {
            case 'en-preparation':
            await markAsPreparing(orderId);
            break;
            case 'prêt':
            await markAsReady(orderId);
            break;
            case 'livré':
            await markAsDelivered(orderId);
            break;
            case 'annulé':
            await cancelOrder(orderId);
            break;
            default:
            break;
        }

        await fetchOrders(); // Refetch orders after updating status
        } catch (err) {
        console.error('Erreur lors de la mise à jour du statut:', err);
        }
    };

    if (error) {
        return (
        <div>
            <p style={{ color: 'red' }}>{error.message}</p>
            {error.details && <p>Détails : {error.details}</p>}
        </div>
        );
    }

  return (
    <div className="p-6">
        <ToastContainer />

        <div className="mb-8">
            <h1 className="text-2xl font-bold mb-2">Gestion des Commandes</h1>
            <p className="text-gray-600">
            Gérez efficacement vos commandes. Suivez, modifiez et organisez vos commandes pour une meilleure gestion de vos clients. Simplifiez votre workflow et offrez une expérience client exceptionnelle.
            </p>
        </div>

        {loading && (
            <div className="flex flex-col justify-center items-center h-40">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                <p className="ml-4 mt-4">Chargement des commandes...</p>
            </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {!loading && orders.length === 0 ? (
            <p>Aucune commande trouvée.</p>
            ) : (
            orders.map((order) => (
                <OrderCard
                key={order.id}
                order={order}
                handleStatusChange={handleStatusChange}
                GetStyleOfStatus={GetStyleOfStatus}
                />
            ))
            )}
        </div>
    </div>
  );
};

export default Order;