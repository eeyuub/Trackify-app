import axios from 'axios';
import { toast } from 'react-toastify';

export function useDeleteCategory(fetcheCategory) {

    const deleteCategory = async (id) => {
        try {
            const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/categories/${id}`);
            toast.success(response?.data?.message || "Categorie supprimée avec succès", {
                icon: '✅',
                position: "top-right",
                autoClose: 3000,
            });
            fetcheCategory();
        } catch (error) {
            console.error('Error deleting category:', error.response?.data?.message || error.message);
            toast.error(error.response?.data?.message || error.message, {
                icon: '❌',
                position: "top-right",
                autoClose: 7000,
            });
        }
    };

    return {deleteCategory};
}
