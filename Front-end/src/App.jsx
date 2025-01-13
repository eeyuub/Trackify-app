import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import See from './Pages/sse';
import Category from './Pages/Category';
import Products from './Pages/Products';
import AddProducts from './components/Products/AddProducts';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/see" element={<See />} />
        <Route path="/categories" element={<Category/>} />
        <Route path="/produits" element={<Products/>} />
        <Route path="/Ajouter-produits" element={<AddProducts/>} />
      </Routes>
    </Router>
  );
};

export default App;