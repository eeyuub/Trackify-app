import { useState, useCallback } from "react";
import axios from "axios";

export const useProductsByCategory = () => {
  const [products, setProducts] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProductsByCategory = useCallback(async (id) => {
    setIsLoading(true);
    setError(null);

    try {
        const url = `${import.meta.env.VITE_BACKEND_URL}/products/category/${id}`;
        const response = await axios.get(url);
        setProducts(response.data);
    } catch (err) {
        console.error("Failed to fetch products:", err);
        setError("Erreur lors de la récupération des données des produits.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { products, isLoading, error, fetchProductsByCategory };
};