import { useState, useCallback } from "react";
import axios from "axios";

export const useCategory = () => {
  const [category, setCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCategory = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/categories`;
      const response = await axios.get(url);
      setCategory(response.data);
      console.log(response.data);
    } catch (err) {
      console.error("Failed to fetch category:", err);
      setError("Erreur lors de la récupération des données de la catégorie.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { category, isLoading, error, fetchCategory };
};