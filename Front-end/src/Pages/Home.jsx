import React, { useState } from 'react';
import { CirclePlus, CircleMinus } from 'lucide-react';

const products = [
    { id: 1, name: 'Product 1', price: 10, src: 'https://media.istockphoto.com/id/867454056/fr/photo/la-nourriture.jpg?s=612x612&w=0&k=20&c=v9DdQF7du11CekaV0XfMTzlYdgOD-zT2uD89uKnvgjQ=', tags: ['fast-food', 'burger'] },
    { id: 2, name: 'Product 2', price: 20, src: 'https://media.istockphoto.com/id/867454056/fr/photo/la-nourriture.jpg?s=612x612&w=0&k=20&c=v9DdQF7du11CekaV0XfMTzlYdgOD-zT2uD89uKnvgjQ=', tags: ['pizza', 'italian'] },
    { id: 3, name: 'Product 3', price: 30, src: 'https://media.istockphoto.com/id/867454056/fr/photo/la-nourriture.jpg?s=612x612&w=0&k=20&c=v9DdQF7du11CekaV0XfMTzlYdgOD-zT2uD89uKnvgjQ=', tags: ['sushi', 'japanese'] },
    { id: 4, name: 'Product 4', price: 15, src: 'https://media.istockphoto.com/id/867454056/fr/photo/la-nourriture.jpg?s=612x612&w=0&k=20&c=v9DdQF7du11CekaV0XfMTzlYdgOD-zT2uD89uKnvgjQ=', tags: ['fast-food', 'fries'] },
    { id: 5, name: 'Product 5', price: 25, src: 'https://media.istockphoto.com/id/867454056/fr/photo/la-nourriture.jpg?s=612x612&w=0&k=20&c=v9DdQF7du11CekaV0XfMTzlYdgOD-zT2uD89uKnvgjQ=', tags: ['pizza', 'vegetarian'] },
    { id: 6, name: 'Product 6', price: 35, src: 'https://media.istockphoto.com/id/867454056/fr/photo/la-nourriture.jpg?s=612x612&w=0&k=20&c=v9DdQF7du11CekaV0XfMTzlYdgOD-zT2uD89uKnvgjQ=', tags: ['sushi', 'seafood'] },
    { id: 7, name: 'Product 7', price: 12, src: 'https://media.istockphoto.com/id/867454056/fr/photo/la-nourriture.jpg?s=612x612&w=0&k=20&c=v9DdQF7du11CekaV0XfMTzlYdgOD-zT2uD89uKnvgjQ=', tags: ['fast-food', 'chicken'] },
    { id: 8, name: 'Product 8', price: 18, src: 'https://media.istockphoto.com/id/867454056/fr/photo/la-nourriture.jpg?s=612x612&w=0&k=20&c=v9DdQF7du11CekaV0XfMTzlYdgOD-zT2uD89uKnvgjQ=', tags: ['pizza', 'meat-lovers'] },
    { id: 9, name: 'Product 9', price: 40, src: 'https://media.istockphoto.com/id/867454056/fr/photo/la-nourriture.jpg?s=612x612&w=0&k=20&c=v9DdQF7du11CekaV0XfMTzlYdgOD-zT2uD89uKnvgjQ=', tags: ['sushi', 'vegan'] },
    { id: 10, name: 'Product 10', price: 22, src: 'https://media.istockphoto.com/id/867454056/fr/photo/la-nourriture.jpg?s=612x612&w=0&k=20&c=v9DdQF7du11CekaV0XfMTzlYdgOD-zT2uD89uKnvgjQ=', tags: ['fast-food', 'sandwich'] },
    { id: 11, name: 'Product 11', price: 14, src: 'https://media.istockphoto.com/id/867454056/fr/photo/la-nourriture.jpg?s=612x612&w=0&k=20&c=v9DdQF7du11CekaV0XfMTzlYdgOD-zT2uD89uKnvgjQ=', tags: ['fast-food', 'nuggets'] },
    { id: 12, name: 'Product 12', price: 28, src: 'https://media.istockphoto.com/id/867454056/fr/photo/la-nourriture.jpg?s=612x612&w=0&k=20&c=v9DdQF7du11CekaV0XfMTzlYdgOD-zT2uD89uKnvgjQ=', tags: ['pizza', 'cheese'] },
    { id: 13, name: 'Product 13', price: 32, src: 'https://media.istockphoto.com/id/867454056/fr/photo/la-nourriture.jpg?s=612x612&w=0&k=20&c=v9DdQF7du11CekaV0XfMTzlYdgOD-zT2uD89uKnvgjQ=', tags: ['sushi', 'salmon'] },
    { id: 14, name: 'Product 14', price: 16, src: 'https://media.istockphoto.com/id/867454056/fr/photo/la-nourriture.jpg?s=612x612&w=0&k=20&c=v9DdQF7du11CekaV0XfMTzlYdgOD-zT2uD89uKnvgjQ=', tags: ['fast-food', 'hotdog'] },
    { id: 15, name: 'Product 15', price: 24, src: 'https://media.istockphoto.com/id/867454056/fr/photo/la-nourriture.jpg?s=612x612&w=0&k=20&c=v9DdQF7du11CekaV0XfMTzlYdgOD-zT2uD89uKnvgjQ=', tags: ['pizza', 'pepperoni'] },
    { id: 16, name: 'Product 16', price: 38, src: 'https://media.istockphoto.com/id/867454056/fr/photo/la-nourriture.jpg?s=612x612&w=0&k=20&c=v9DdQF7du11CekaV0XfMTzlYdgOD-zT2uD89uKnvgjQ=', tags: ['sushi', 'tuna'] },
    { id: 17, name: 'Product 17', price: 11, src: 'https://media.istockphoto.com/id/867454056/fr/photo/la-nourriture.jpg?s=612x612&w=0&k=20&c=v9DdQF7du11CekaV0XfMTzlYdgOD-zT2uD89uKnvgjQ=', tags: ['fast-food', 'wings'] },
    { id: 18, name: 'Product 18', price: 19, src: 'https://media.istockphoto.com/id/867454056/fr/photo/la-nourriture.jpg?s=612x612&w=0&k=20&c=v9DdQF7du11CekaV0XfMTzlYdgOD-zT2uD89uKnvgjQ=', tags: ['pizza', 'margherita'] },
    { id: 19, name: 'Product 19', price: 42, src: 'https://media.istockphoto.com/id/867454056/fr/photo/la-nourriture.jpg?s=612x612&w=0&k=20&c=v9DdQF7du11CekaV0XfMTzlYdgOD-zT2uD89uKnvgjQ=', tags: ['sushi', 'veggie'] },
    { id: 20, name: 'Product 20', price: 21, src: 'https://media.istockphoto.com/id/867454056/fr/photo/la-nourriture.jpg?s=612x612&w=0&k=20&c=v9DdQF7du11CekaV0XfMTzlYdgOD-zT2uD89uKnvgjQ=', tags: ['fast-food', 'wrap'] },
    { id: 21, name: 'Product 21', price: 13, src: 'https://media.istockphoto.com/id/867454056/fr/photo/la-nourriture.jpg?s=612x612&w=0&k=20&c=v9DdQF7du11CekaV0XfMTzlYdgOD-zT2uD89uKnvgjQ=', tags: ['fast-food', 'taco'] },
    { id: 22, name: 'Product 22', price: 27, src: 'https://media.istockphoto.com/id/867454056/fr/photo/la-nourriture.jpg?s=612x612&w=0&k=20&c=v9DdQF7du11CekaV0XfMTzlYdgOD-zT2uD89uKnvgjQ=', tags: ['pizza', 'hawaiian'] },
    { id: 23, name: 'Product 23', price: 33, src: 'https://media.istockphoto.com/id/867454056/fr/photo/la-nourriture.jpg?s=612x612&w=0&k=20&c=v9DdQF7du11CekaV0XfMTzlYdgOD-zT2uD89uKnvgjQ=', tags: ['sushi', 'shrimp'] },
    { id: 24, name: 'Product 24', price: 17, src: 'https://media.istockphoto.com/id/867454056/fr/photo/la-nourriture.jpg?s=612x612&w=0&k=20&c=v9DdQF7du11CekaV0XfMTzlYdgOD-zT2uD89uKnvgjQ=', tags: ['fast-food', 'burrito'] },
    { id: 25, name: 'Product 25', price: 23, src: 'https://media.istockphoto.com/id/867454056/fr/photo/la-nourriture.jpg?s=612x612&w=0&k=20&c=v9DdQF7du11CekaV0XfMTzlYdgOD-zT2uD89uKnvgjQ=', tags: ['pizza', 'bbq-chicken'] },
    { id: 26, name: 'Product 26', price: 36, src: 'https://media.istockphoto.com/id/867454056/fr/photo/la-nourriture.jpg?s=612x612&w=0&k=20&c=v9DdQF7du11CekaV0XfMTzlYdgOD-zT2uD89uKnvgjQ=', tags: ['sushi', 'eel'] },
    { id: 27, name: 'Product 27', price: 9, src: 'https://media.istockphoto.com/id/867454056/fr/photo/la-nourriture.jpg?s=612x612&w=0&k=20&c=v9DdQF7du11CekaV0XfMTzlYdgOD-zT2uD89uKnvgjQ=', tags: ['fast-food', 'nachos'] },
    { id: 28, name: 'Product 28', price: 29, src: 'https://media.istockphoto.com/id/867454056/fr/photo/la-nourriture.jpg?s=612x612&w=0&k=20&c=v9DdQF7du11CekaV0XfMTzlYdgOD-zT2uD89uKnvgjQ=', tags: ['pizza', 'veggie'] },
    { id: 29, name: 'Product 29', price: 41, src: 'https://media.istockphoto.com/id/867454056/fr/photo/la-nourriture.jpg?s=612x612&w=0&k=20&c=v9DdQF7du11CekaV0XfMTzlYdgOD-zT2uD89uKnvgjQ=', tags: ['sushi', 'crab'] },
    { id: 30, name: 'Product 30', price: 20, src: 'https://media.istockphoto.com/id/867454056/fr/photo/la-nourriture.jpg?s=612x612&w=0&k=20&c=v9DdQF7du11CekaV0XfMTzlYdgOD-zT2uD89uKnvgjQ=', tags: ['fast-food', 'quesadilla'] },
];

const tags = ['All', 'fast-food', 'burger', 'pizza', 'italian', 'sushi', 'japanese', 'fries', 'vegetarian', 'seafood', 'chicken', 'meat-lovers', 'vegan', 'sandwich'];

const Home = () => {
    const [cart, setCart] = useState([]);
    const [selectedTag, setSelectedTag] = useState('All');

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

    const increaseQuantity = (productId) => {
        setCart(
            cart.map((item) =>
                item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };

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


   
    const getProductTotal = (product) => {
        return (product.price * product.quantity).toFixed(2);
    };

   
    const getCartTotal = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    };

    const filteredProducts = selectedTag === 'All' 
        ? products 
        : products.filter((product) => product.tags.includes(selectedTag));

    return (
        <div className="flex flex-col md:flex-row p-4 min-h-screen">
            {/* Products Section */}
            <div className="w-full md:w-3/5 p-4 overflow-y-auto"> {/* Scrollable products section */}
                <h1 className="text-2xl font-bold mb-4">Products</h1>

                {/* Tag Filters */}
                <div className="flex flex-wrap gap-2 mb-4">
                    {tags.map((tag) => (
                        <button
                            key={tag}
                            onClick={() => setSelectedTag(tag)}
                            className={`px-4 py-2 rounded-full text-sm font-semibold ${
                                selectedTag === tag
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                        >
                            {tag}
                        </button>
                    ))}
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredProducts.map((product) => (
                        <div
                            key={product.id}
                            className="border rounded-lg cursor-pointer hover:shadow-lg transition-shadow"
                            onClick={() => addToCart(product)}
                        >
                            <img
                                src={product.src}
                                alt={product.name}
                                className="w-full h-32 object-cover mb-2 rounded-t-lg"
                            />
                            <div className="p-4">
                                <h2 className="text-xl font-semibold">{product.name}</h2>
                                <p className="text-gray-600">${product.price}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="w-full md:w-2/5 p-4 bg-gray-100 rounded-lg md:sticky md:top-0 md:h-screen">
                <h1 className="text-2xl font-bold mb-4">Cart</h1>
                <div className="overflow-y-auto max-h-[calc(100vh-200px)]">
                    {cart.length > 0 ? (
                        <div className="space-y-4">
                            {cart.map((item, index) => (
                                <div key={index} className="border-l-8 p-4 rounded-2xl bg-white grid grid-cols-2  sm:grid-cols-3">
                                    <div>
                                        <h2 className="text-xl font-semibold">{item.name}</h2>
                                        <p className="text-gray-600">${item.price}</p>
                                    </div>
                                    <div className="flex items-center mt-2">
                                        <button
                                            onClick={() => decreaseQuantity(item.id)}
                                            className="text-gray-600 px-3 py-1"
                                        >
                                            <CircleMinus />
                                        </button>
                                        <span className="mx-4">{item.quantity}</span>
                                        <button
                                            onClick={() => increaseQuantity(item.id)}
                                            className="text-gray-600 px-3 py-1"
                                        >
                                            <CirclePlus />
                                        </button>
                                    </div>

                                    <div>
                                        <p className="text-gray-600 text-center font-bold">Total: ${getProductTotal(item)}</p>
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
                            <h2 className="text-xl font-bold">Overall Total:</h2>
                            <p className="text-xl font-bold">${getCartTotal()}</p>
                        </div>

                        <div className='flex gap-5'>
                            <button
                                onClick={() => alert('Create Command clicked')}
                                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                            >
                                Create Command
                            </button>
                            <button
                                onClick={() => setCart([])}
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                            >
                                Cancel Command
                            </button>
                        </div>
                        
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;