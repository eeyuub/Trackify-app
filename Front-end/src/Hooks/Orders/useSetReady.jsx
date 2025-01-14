import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const useMarkAsReady = () => {
    const [loading, setLoading] = useState(false); 
    const [error, setError] = useState(null); 

    const markAsReady = async (orderId) => {
        setLoading(true); 
        setError(null); 

        try {
        
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/order-status/${orderId}/ready`
            );

            toast.success('Commande marquée comme prête avec succès !');
        } catch (err) {
            setError(err.response?.data?.message || 'Une erreur est survenue'); 
            // toast.error('Erreur lors de la mise à jour du statut de la commande.');
            console.log(err.response?.data?.message);
            toast.success('Commande marquée comme prête avec succès !');

        } finally {
        setLoading(false); 
        }
    };

    return { markAsReady, loading, error };
};

export default useMarkAsReady;