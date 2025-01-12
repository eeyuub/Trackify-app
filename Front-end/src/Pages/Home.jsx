import React, { useEffect, useState } from 'react';
import { CirclePlus, CircleMinus } from 'lucide-react';
import { useCategory } from '../Hooks/getCategory';
import { useProducts } from '../Hooks/getProducts';
import { useProductsByCategory } from '../Hooks/getProductsByCategory';
import axios from 'axios'; // Import axios for API requests
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
    const [cart, setCart] = useState([]);
    const [selectedTag, setSelectedTag] = useState('All');

    // Fetch categories
    const { category, isLoading: isCategoryLoading, error: categoryError, fetchCategory } = useCategory();
    useEffect(() => {
        fetchCategory();
    }, [fetchCategory]);

    // Fetch all products
    const { products, isLoading: isProductsLoading, error: productsError, fetchProducts } = useProducts();

    // Fetch products by category
    const { products: productsByCategory, isLoading: isProductsByCategoryLoading, error: productsByCategoryError, fetchProductsByCategory } = useProductsByCategory();

    // Fetch products based on the selected category
    useEffect(() => {
        if (selectedTag === 'All') {
            fetchProducts(); // Fetch all products
        } else {
            const selectedCategory = category?.find((cat) => cat.name === selectedTag);
            if (selectedCategory) {
                fetchProductsByCategory(selectedCategory.id);
            }
        }
    }, [selectedTag, category, fetchProducts, fetchProductsByCategory]);

    // Add product to cart
    const addToCart = (product) => {
        const existingProduct = cart.find((item) => item.id === product.id);
        if (existingProduct) {
            setCart(
                cart.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                )
            );
        } else {
            setCart([...cart, { ...product, quantity: 1 }]);
        }
    };

    // Increase product quantity in cart
    const increaseQuantity = (productId) => {
        setCart(
            cart.map((item) =>
                item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };

    // Decrease product quantity in cart
    const decreaseQuantity = (productId) => {
        const existingProduct = cart.find((item) => item.id === productId);
        if (existingProduct.quantity === 1) {
            setCart(cart.filter((item) => item.id !== productId));
        } else {
            setCart(
                cart.map((item) =>
                    item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
                )
            );
        }
    };

    // Calculate total price for a single product
    const getProductTotal = (product) => {
        return (product.price * product.quantity).toFixed(2);
    };

    // Calculate total price for the entire cart
    const getCartTotal = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    };

    // Determine which products to display
    const displayedProducts = selectedTag === 'All' ? products : productsByCategory;

    // Create Order
    const [isCreatingOrder, setIsCreatingOrder] = useState(false);
    const [orderError, setOrderError] = useState(null);
    const [orderSuccess, setOrderSuccess] = useState(null);

    const createOrder = async () => {
        setIsCreatingOrder(true);
        setOrderError(null);
        setOrderSuccess(null);
    
        try {
            // Prepare the order data
            const orderData = {
                products: cart.map((item) => ({
                    productId: item.id,
                    quantity: item.quantity,
                    price: item.price,
                    totalPrice: item.price * item.quantity,
                })),
                totalPrice: parseFloat(getCartTotal()),
            };

            console.log(orderData);
    
            // Send the order data to the API
            const response = await axios.post('http://127.0.0.1:3000/orders', orderData);
    
            // Handle success with a toast notification
            toast.success(`Commande créée avec succès ! ID de la commande : ${response.data.id}`);
            setCart([]); // Clear the cart after successful order creation
        } catch (err) {
            // Handle error with a toast notification
            toast.error('Échec de la création de la commande. Veuillez réessayer.');
            console.error('Error creating order:', err);
        } finally {
            setIsCreatingOrder(false);
        }
    };


    return (
        <div className="flex flex-col md:flex-row p-4 min-h-screen">
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />

            {/* Products Section */}
            <div className="w-full md:w-3/5 p-4 overflow-y-auto">
                <h1 className="text-2xl font-bold mb-4">Products</h1>

                {/* Category Filters */}
                <div className="flex flex-wrap gap-2 mb-4">
                    <button
                        onClick={() => setSelectedTag('All')}
                        className={`px-4 py-2 rounded-full text-sm font-semibold ${
                            selectedTag === 'All'
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                    >
                        All
                    </button>
                    {category?.map((tag) => (
                        <button
                            key={tag.id}
                            onClick={() => setSelectedTag(tag.name)}
                            className={`px-4 py-2 rounded-full text-sm font-semibold ${
                                selectedTag === tag.name
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                        >
                            {tag.name}
                        </button>
                    ))}
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {displayedProducts?.map((product) => (
                        <div
                            key={product.id}
                            className="border rounded-lg cursor-pointer hover:shadow-lg transition-shadow"
                            onClick={() => addToCart(product)}
                        >
                            <img
                                src={product.image || ''} // Add a fallback image if needed
                                alt={product.name}
                                className="w-full h-32 object-cover mb-2 rounded-t-lg"
                            />
                            <div className="p-4">
                                <h2 className="text-xl font-semibold">{product.name}</h2>
                                <p className="text-gray-600">{product.price} DH</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Cart Section */}
            <div className="w-full md:w-2/5 p-4 bg-gray-100 rounded-lg md:sticky md:top-0 md:h-screen">
                <h1 className="text-2xl font-bold mb-4">Cart</h1>
                <div className="overflow-y-auto max-h-[calc(100vh-200px)]">
                    {cart.length > 0 ? (
                        <div className="space-y-4">
                            {cart.map((item) => (
                                <div key={item.id} className="border-l-8 p-4 rounded-2xl bg-white grid grid-cols-2 sm:grid-cols-3">
                                    <div>
                                        <h2 className="text-xl font-semibold">{item.name}</h2>
                                        <p className="text-gray-600">{item.price} DH</p>
                                    </div>
                                    <div className="flex items-center mt-2">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation(); // Prevent event bubbling
                                                decreaseQuantity(item.id);
                                            }}
                                            className="text-gray-600 px-3 py-1"
                                        >
                                            <CircleMinus />
                                        </button>
                                        <span className="mx-4">{item.quantity}</span>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation(); // Prevent event bubbling
                                                increaseQuantity(item.id);
                                            }}
                                            className="text-gray-600 px-3 py-1"
                                        >
                                            <CirclePlus />
                                        </button>
                                    </div>
                                    <div>
                                        <p className="text-gray-600 text-center font-bold">Total: {getProductTotal(item)} DH</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-600">No products in the cart.</p>
                    )}
                </div>

                {cart.length > 0 && (
                    <div className="grid justify-center mt-4">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">Total du commande :</h2>
                            <p className="text-xl font-bold">{getCartTotal()} DH</p>
                        </div>

                        <div className='flex gap-5'>
                            <button
                                onClick={createOrder}
                                disabled={isCreatingOrder}
                                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:bg-green-300"
                            >
                                {isCreatingOrder ? 'Création de la commande...' : 'Créer la commande'}
                            </button>
                            <button
                                onClick={() => setCart([])}
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                            >
                                Annuler la commande
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;