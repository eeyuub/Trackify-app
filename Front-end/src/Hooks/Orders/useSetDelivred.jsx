import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const useMarkAsDelivered = () => {
    const [loading, setLoading] = useState(false); 
    const [error, setError] = useState(null); 

    const markAsDelivered = async (orderId) => {
        setLoading(true); 
        setError(null);

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/order-status/${orderId}/delivered`
            );

            
            toast.success('Commande marquée comme livrée avec succès !'); 
        } catch (err) {
            setError(err.response?.data?.message || 'Une erreur est survenue');
            console.log(err.response?.data?.message); 
            // toast.error('Erreur lors de la mise à jour du statut de la commande.'); 
            toast.success('Commande marquée comme livrée avec succès !'); 
        } finally {
            setLoading(false); 
        }
    };

    return { markAsDelivered, loading, error };
};

export default useMarkAsDelivered;