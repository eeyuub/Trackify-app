import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import See from './Pages/See';
import Category from './Pages/Category';
import Products from './Pages/Products';
import AddProducts from './components/Products/AddProducts';
import Navbar from './components/Navbar';
import TrakOrder from './Pages/TrakOrder';
import Order from './Pages/Order';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/see" element={<See />} />
          <Route path="/track-order/:id" element={<TrakOrder />} />
          <Route path="/categories" element={<Category />} />
          <Route path="/produits" element={<Products />} />
          <Route path="/Ajouter-produits" element={<AddProducts />} />
          <Route path="/Orders" element={<Order />} />
      </Routes>
    </Router>
  );
};

export default App;