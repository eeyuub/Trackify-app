import { useState } from 'react';
import { toast } from 'react-toastify';

export function useAddCategory(fetchCategory) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const addCategory = async (categoryName) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch('http://127.0.0.1:3000/categories', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: categoryName }),
            });

            if (response.ok) {
                toast.success('Catégorie ajoutée avec succès!');
                fetchCategory(); // Refresh the category list
            } else {
                toast.error('Erreur lors de l\'ajout de la catégorie.');
                setError('Erreur lors de l\'ajout de la catégorie.');
            }
        } catch (error) {
            toast.error('Une erreur s\'est produite.');
            setError('Une erreur s\'est produite.');
            console.error('Error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return { addCategory, isLoading, error };
};
