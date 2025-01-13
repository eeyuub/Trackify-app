import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { z } from 'zod';
import axios from 'axios';
import { useCategory } from '../../Hooks/getCategory';

const productSchema = z.object({
    name: z.string().min(1, 'Le nom du produit est requis.'),
    price: z.coerce.number({
        required_error: "Le prix est obligatoire.",
        invalid_type_error: "Le prix est obligatoire.",
    }).positive({ message: "Le prix doit être un nombre positif." }),
    categoryId: z.coerce.number({
        required_error: "La catégorie est obligatoire.",
        invalid_type_error: "La catégorie est obligatoire.",
    }).positive({ message: "La catégorie est obligatoire." }),
    image: z.instanceof(File, { message: "L'image est obligatoire." })
        .refine((file) => file.type.startsWith('image/'), { message: "Le fichier doit être une image." }),
});

const AddProducts = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [image, setImage] = useState(null); // State for the image file
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const { category, isLoading: isCategoryLoading, error: categoryError, fetchCategory } = useCategory();

    useEffect(() => {
        fetchCategory();
    }, [fetchCategory]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(); // Use FormData to handle file uploads
        formData.append('name', name);
        formData.append('price', price);
        formData.append('categoryId', categoryId);
        if (image) {
            formData.append('image', image); // Append the image file
        }

        try {
            // Validate the form data
            productSchema.parse({
                name,
                price: parseFloat(price),
                categoryId: parseInt(categoryId, 10),
                image,
            });
            setErrors({});

            setIsLoading(true);
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/products`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Set the content type for file upload
                },
            });
            if (response.status === 201) {
                toast.success('Produit ajouté avec succès!', { autoClose: 3000 });
                setName('');
                setPrice('');
                setCategoryId('');
                setImage(null); // Reset the image
                setTimeout(() => {
                    navigate('/produits');
                }, 2000);
            }
        } catch (error) {
            if (error instanceof z.ZodError) {
                const errorMessages = {};
                error.errors.forEach((err) => {
                    errorMessages[err.path[0]] = err.message;
                });
                setErrors(errorMessages);
            } else {
                console.error('Error:', error);
                toast.error('Erreur lors de l\'ajout du produit.', { autoClose: 3000 });
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <ToastContainer />

            <div className="mt-5 p-6 bg-transparent">
                <div className="mb-3">
                    <h1 className="text-2xl font-bold mb-2">Ajouter un Produit</h1>
                    <p className="text-gray-600">Remplissez le formulaire ci-dessous pour ajouter un nouveau produit.</p>
                </div>
            </div>

            <div className="flex items-center justify-center p-4">
                <div className="w-full max-w-2xl">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Name Field */}
                        <div className="space-y-2">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Nom du Produit <span className="text-red-500 text-base">*</span>
                            </label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Ex: Fruit de mer"
                                className={`mt-1 block w-full px-3 py-2 border ${
                                    errors.name ? 'border-red-500' : 'border-gray-300'
                                } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                            />
                            {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                        </div>

                        {/* Price Field */}
                        <div className="space-y-2">
                            <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                                Prix <span className="text-red-500 text-base">*</span>
                            </label>
                            <input
                                type="number"
                                id="price"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                placeholder="Ex: 30 Dh"
                                className={`mt-1 block w-full px-3 py-2 border ${
                                    errors.price ? 'border-red-500' : 'border-gray-300'
                                } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                            />
                            {errors.price && <p className="text-xs text-red-500 mt-1">{errors.price}</p>}
                        </div>

                        {/* Category Field */}
                        <div className="space-y-2">
                            <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700">
                                Catégorie <span className="text-red-500 text-base">*</span>
                            </label>
                            <select
                                id="categoryId"
                                value={categoryId}
                                onChange={(e) => setCategoryId(e.target.value)}
                                className={`mt-1 block w-full px-3 py-2 border ${
                                    errors.categoryId ? 'border-red-500' : 'border-gray-300'
                                } rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-[#eec825] focus:border-[#eec825]`}
                            >
                                <option value="">Sélectionner une catégorie</option>
                                {category?.map((cat) => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                            {errors.categoryId && <p className="text-xs text-red-500 mt-1">{errors.categoryId}</p>}
                        </div>

                        {/* Image Upload Field */}
                        <div className="space-y-2">
                            <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                                Image du Produit <span className="text-red-500 text-base">*</span>
                            </label>
                            <div
                                className={`mt-1 flex flex-col items-center justify-center border-2 border-dashed ${
                                    errors.image ? 'border-red-500' : 'border-gray-300'
                                } rounded-md p-6 cursor-pointer hover:border-[#eec825] transition-colors`}
                            >
                                <input
                                    type="file"
                                    id="image"
                                    accept="image/*" // Accept only image files
                                    onChange={(e) => setImage(e.target.files[0])} // Store the selected file
                                    className="hidden" // Hide the default file input
                                />
                                <label htmlFor="image" className="text-center cursor-pointer">
                                    {image ? (
                                        <div className="flex flex-col items-center">
                                            <img
                                                src={URL.createObjectURL(image)} // Display the selected image
                                                alt="Preview"
                                                className="w-24 h-24 object-cover rounded-md mb-2"
                                            />
                                            <span className="text-sm text-gray-600">Cliquez pour changer l'image</span>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center">
                                            <span className="text-gray-400">Glissez-déposez une image ou</span>
                                            <span className="text-[#eec825] font-medium">cliquez pour sélectionner</span>
                                        </div>
                                    )}
                                </label>
                            </div>
                            {errors.image && <p className="text-xs text-red-500 mt-1">{errors.image}</p>}
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-4 mt-6">
                            <button
                                type="button"
                                onClick={() => navigate('/produits')}
                                className="w-full bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300"
                            >
                                Annuler
                            </button>
                            <button
                                type="submit"
                                className="w-full bg-[#eec825] text-white px-4 py-2 rounded-md hover:bg-[#d4b220] disabled:opacity-50"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <div className="flex items-center justify-center gap-2">
                                        <span>Ajout en cours...</span>
                                    </div>
                                ) : (
                                    'Ajouter'
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default AddProducts;