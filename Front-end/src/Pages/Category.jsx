import React, { useState, useEffect } from 'react';
import { Plus, ExternalLink, Edit, Trash2, Folder, CircleOff } from 'lucide-react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useCategory } from '../Hooks/getCategory';
import { useDeleteCategory } from '../Hooks/Category/DeleteCategory';
import {useAddCategory} from '../Hooks/Category/useAddCategory';
import useUpdateCategory from '../Hooks/Category/useUpdateCategory'; 

const Category = () => {
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [isUpdatePopupVisible, setIsUpdatePopupVisible] = useState(false); 
    const [categoryName, setCategoryName] = useState('');
    const [categoryToUpdate, setCategoryToUpdate] = useState(null);
    const [deleteConfirmationVisible, setDeleteConfirmationVisible] = useState(false);
    const [categoryToDelete, setCategoryToDelete] = useState(null);

    const { category, isLoading: isCategoryLoading, error: categoryError, fetchCategory } = useCategory();
    const { deleteCategory } = useDeleteCategory(fetchCategory);
    const { addCategory, isLoading: isAddCategoryLoading, error: addCategoryError } = useAddCategory(fetchCategory);
    const { fetchCategoryById, updateCategory, isLoading: isUpdateCategoryLoading, error: updateCategoryError } = useUpdateCategory(fetchCategory); // Use the custom hook

    useEffect(() => {
        fetchCategory();
    }, [fetchCategory]);

    const handleDeleteClick = (categoryId) => {
        setCategoryToDelete(categoryId);
        setDeleteConfirmationVisible(true);
    };

    const handleConfirmDelete = async () => {
        if (categoryToDelete) {
            await deleteCategory(categoryToDelete);
            setDeleteConfirmationVisible(false);
            setCategoryToDelete(null);
        }
    };

    const handleCancelDelete = () => {
        setDeleteConfirmationVisible(false);
        setCategoryToDelete(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await addCategory(categoryName);
        setIsPopupVisible(false);
        setCategoryName('');
    };

    const handleUpdateClick = async (categoryId) => {
        const categoryData = await fetchCategoryById(categoryId); 
        if (categoryData) {
            setCategoryToUpdate(categoryData); 
            setCategoryName(categoryData.name); 
            setIsUpdatePopupVisible(true); 
        }
    };

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        await updateCategory(categoryToUpdate.id, { name: categoryName }); 
        setIsUpdatePopupVisible(false);
        setCategoryName('');
        setCategoryToUpdate(null);
    };

    return (
        <div className="p-6">
            <ToastContainer />

            {/* Header Section */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold mb-2">Gestion des Catégories</h1>
                <p className="text-gray-600">
                    Gérez efficacement vos catégories. Ajoutez, modifiez et organisez vos catégories pour structurer vos produits et services.
                </p>
            </div>

            {/* Buttons Section */}
            <div className="flex gap-4 mb-8 justify-end">
                <button className="flex items-center bg-gray-200 text-gray-800 px-4 py-2 rounded-md transition duration-400 hover:bg-gray-300">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Catégories Supprimées
                </button>
                <button
                    className="flex items-center bg-[#eec825] text-white px-4 py-2 rounded-md"
                    onClick={() => setIsPopupVisible(true)}
                >
                    <Plus className="mr-2 h-4 w-4" />
                    Ajouter une Catégorie
                </button>
            </div>

            {/* Categories List */}
            <div className="mt-8">
                {isCategoryLoading ? (
                    <div className="flex justify-center items-center h-32">
                        <span className="text-gray-600">Chargement des catégories...</span>
                    </div>
                ) : categoryError ? (
                    <div className="flex justify-center items-center h-32">
                        <span className="text-red-600">Erreur lors du chargement des catégories.</span>
                    </div>
                ) : category?.length === 0 ? (
                    <div className="flex flex-col justify-center items-center h-48 text-gray-600">
                        <CircleOff className="h-10 w-10 mb-2" />
                        <span>Aucune catégorie trouvée.</span>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {category?.map((cat) => (
                            <div key={cat.id} className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col">
                                <p className='text-sm'>Catégorie</p>
                                <h3 className="text-lg font-semibold text-gray-800 mb-5 flex items-center">
                                    <Folder className="h-5 w-5 mr-2 text-gray-600" />
                                    {cat.name}
                                </h3>
                                <div className="mt-auto flex justify-center gap-4 w-[100%] mx-auto">
                                    <button
                                        className="flex items-center justify-center w-[50%] bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors"
                                        onClick={() => handleUpdateClick(cat.id)} 
                                    >
                                        <Edit className="h-4 w-4 mr-1" />
                                        <span>Modifier</span>
                                    </button>
                                    <button
                                        className="flex items-center justify-center w-[50%] bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
                                        onClick={() => handleDeleteClick(cat.id)}
                                    >
                                        <Trash2 className="h-4 w-4 mr-1" />
                                        <span>Supprimer</span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Add Category Pop-up */}
            {isPopupVisible && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-xl font-bold mb-4">Ajouter une Catégorie</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="categoryName" className="block text-sm font-medium text-gray-700">
                                    Nom de la Catégorie
                                </label>
                                <input
                                    type="text"
                                    id="categoryName"
                                    value={categoryName}
                                    onChange={(e) => setCategoryName(e.target.value)}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />
                            </div>
                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={() => setIsPopupVisible(false)}
                                    className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
                                >
                                    Annuler
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-[#eec825] text-white rounded-md"
                                    disabled={isAddCategoryLoading}
                                >
                                    {isAddCategoryLoading ? 'Ajout en cours...' : 'Ajouter'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Update Category Pop-up */}
            {isUpdatePopupVisible && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-xl font-bold mb-4">Modifier la Catégorie</h2>
                        <form onSubmit={handleUpdateSubmit}>
                            <div className="mb-4">
                                <label htmlFor="categoryName" className="block text-sm font-medium text-gray-700">
                                    Nom de la Catégorie
                                </label>
                                <input
                                    type="text"
                                    id="categoryName"
                                    value={categoryName}
                                    onChange={(e) => setCategoryName(e.target.value)}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />
                            </div>
                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={() => setIsUpdatePopupVisible(false)}
                                    className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
                                >
                                    Annuler
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-[#eec825] text-white rounded-md"
                                    disabled={isUpdateCategoryLoading}
                                >
                                    {isUpdateCategoryLoading ? 'Mise à jour en cours...' : 'Mettre à jour'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Pop-up */}
            {deleteConfirmationVisible && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-xl font-bold mb-4">Confirmer la suppression</h2>
                        <p className="text-gray-600 mb-6">Êtes-vous sûr de vouloir supprimer cette catégorie ?</p>
                        <div className="flex justify-end gap-2">
                            <button
                                type="button"
                                onClick={handleCancelDelete}
                                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
                            >
                                Annuler
                            </button>
                            <button
                                type="button"
                                onClick={handleConfirmDelete}
                                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                            >
                                Supprimer
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Category;