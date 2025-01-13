import { useState } from 'react';
import { toast } from 'react-toastify';

const useUpdateCategory = (fetchCategory) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchCategoryById = async (categoryId) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(`http://127.0.0.1:3000/categories/${categoryId}`);
            if (response.ok) {
                const data = await response.json();
                return data; // Return the category data
            } else {
                toast.error('Erreur lors de la récupération de la catégorie.');
                setError('Erreur lors de la récupération de la catégorie.');
            }
        } catch (error) {
            toast.error('Une erreur s\'est produite.');
            setError('Une erreur s\'est produite.');
            console.error('Error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const updateCategory = async (categoryId, updatedData) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(`http://127.0.0.1:3000/categories/${categoryId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedData),
            });

            if (response.ok) {
                toast.success('Catégorie mise à jour avec succès!');
                fetchCategory(); // Refresh the category list
            } else {
                toast.error('Erreur lors de la mise à jour de la catégorie.');
                setError('Erreur lors de la mise à jour de la catégorie.');
            }
        } catch (error) {
            toast.error('Une erreur s\'est produite.');
            setError('Une erreur s\'est produite.');
            console.error('Error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return { fetchCategoryById, updateCategory, isLoading, error };
};

export default useUpdateCategory;