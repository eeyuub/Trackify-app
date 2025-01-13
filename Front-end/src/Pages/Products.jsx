import React, { useEffect } from 'react';
import { ExternalLink, Plus, Edit, Trash2,Utensils } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '../Hooks/getProducts';

const Products = () => {
    const navigate = useNavigate();

    const { products, isLoading: isProductsLoading, error: productsError, fetchProducts } = useProducts();
    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    return (
        <>
            <div className="p-6">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold mb-2">Gestion des Produits de Menu</h1>
                    <p className="text-gray-600">
                        Gérez efficacement vos produits de menu. Ajoutez, modifiez et organisez vos produits de menu pour structurer vos produits et services.
                    </p>
                </div>

                <div className="flex gap-4 mb-8 justify-end">
                    <button className="flex items-center bg-gray-200 text-gray-800 px-4 py-2 rounded-md transition duration-400 hover:bg-gray-300">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Produits Supprimées
                    </button>
                    <button
                        className="flex items-center bg-[#eec825] text-white px-4 py-2 rounded-md"
                        onClick={() => navigate('/Ajouter-produits')}
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        Ajouter un produit
                    </button>
                </div>

                {/* Products List */}
                <div className="mt-8">
                    {isProductsLoading ? (
                        <div className="flex justify-center items-center h-32">
                            <span className="text-gray-600">Chargement des produits...</span>
                        </div>
                    ) : productsError ? (
                        <div className="flex justify-center items-center h-32">
                            <span className="text-red-600">Erreur lors du chargement des produits.</span>
                        </div>
                    ) : products?.length === 0 ? (
                        <div className="flex flex-col justify-center items-center h-48 text-gray-600">
                            <span>Aucun produit trouvé.</span>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {products?.map((product) => (
                                <div key={product.id} className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-2 flex "> <Utensils className="h-5 w-5 mr-2 text-[#eec825]" /> {product.name}</h3>
                                    <p className="text-sm text-gray-600 mb-4">Prix: {product.price} DH</p>
                                    <p className="text-sm text-gray-600 mb-4">Catégorie: law 3lm</p>
                                    <div className="mt-auto flex justify-center gap-4 w-[100%] mx-auto">
                                        <button className="flex items-center justify-center w-[50%] bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors">
                                            <Edit className="h-4 w-4 mr-1" />
                                            <span>Modifier</span>
                                        </button>
                                        <button className="flex items-center justify-center w-[50%] bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors">
                                            <Trash2 className="h-4 w-4 mr-1" />
                                            <span>Supprimer</span>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Products;