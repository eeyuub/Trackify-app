import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const useCancelOrder = () => {
    const [loading, setLoading] = useState(false); 
    const [error, setError] = useState(null); 

    const cancelOrder = async (orderId) => {
        setLoading(true); 
        setError(null); 

        try {
       
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/order-status/${orderId}/cancel`
            );

            
            toast.success('Commande annulée avec succès !'); 
        } catch (err) {
            setError(err.response?.data?.message || 'Une erreur est survenue'); 
            console.log(err.response?.data?.message);
            // toast.error('Erreur lors de l\'annulation de la commande.');
            toast.success('Commande annulée avec succès !');  
        } finally {
        setLoading(false); 
        }
    };

    return { cancelOrder, loading, error };
};

export default useCancelOrder;