import { useState, useCallback } from "react";
import axios from "axios";

export const useProducts = () => {
  const [products, setProducts] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
        const url = `${import.meta.env.VITE_BACKEND_URL}/products`;
        const response = await axios.get(url);
        setProducts(response.data);
    } catch (err) {
        console.error("Failed to fetch products:", err);
        setError("Erreur lors de la récupération des données des produits.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { products, isLoading, error, fetchProducts };
};