import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react'; // Import icons for the hamburger menu

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-[#eec825] p-4">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo or Brand Name */}
                <Link to="/" className="text-white text-lg font-bold">
                    La Masse
                </Link>

                {/* Hamburger Menu Button (Mobile) */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="text-white focus:outline-none md:hidden"
                >
                    {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>

                {/* Navigation Links (Desktop) */}
                <div className="hidden md:flex space-x-4">
                    <Link to="/" className="text-white hover:text-gray-200">
                        Accueil
                    </Link>
                    <Link to="/produits" className="text-white hover:text-gray-200">
                        Produits
                    </Link>
                    <Link to="/categories" className="text-white hover:text-gray-200">
                        Catégories
                    </Link>
                    <Link to="/Orders" className="text-white hover:text-gray-200">
                        Commandes
                    </Link>
                </div>
            </div>

            {/* Mobile Menu (Dropdown) */}
            {isOpen && (
                <div className="md:hidden mt-4">
                    <Link
                        to="/"
                        className="block text-white py-2 hover:bg-[#d4b220]"
                        onClick={() => setIsOpen(false)}
                    >
                        Accueil
                    </Link>
                    <Link
                        to="/produits"
                        className="block text-white py-2 hover:bg-[#d4b220]"
                        onClick={() => setIsOpen(false)}
                    >
                        Produits
                    </Link>
                    <Link
                        to="/categories"
                        className="block text-white py-2 hover:bg-[#d4b220]"
                        onClick={() => setIsOpen(false)}
                    >
                        Catégories
                    </Link>
                    <Link
                        to="/Orders"
                        className="block text-white py-2 hover:bg-[#d4b220]"
                        onClick={() => setIsOpen(false)}
                    >
                        Commandes
                    </Link>
                </div>
            )}
        </nav>
    );
};

export default Navbar;