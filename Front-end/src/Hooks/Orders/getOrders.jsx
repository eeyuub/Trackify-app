import { useState, useEffect } from 'react';
import axios from 'axios';

const useOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchOrders = async () => {
        setLoading(true);
        setError(null);

        try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/orders`);
        setOrders(response.data);
        } catch (err) {
        setError({
            message: "Erreur lors de la récupération des commandes. Veuillez réessayer plus tard.",
            details: err.message,
        });
        } finally {
        setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    return { orders, loading, error, fetchOrders }; 
};

export default useOrders;