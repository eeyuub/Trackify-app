import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import See from './Pages/sse';
import Category from './Pages/Category';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/see" element={<See />} />
        <Route path="/categories" element={<Category/>} />
      </Routes>
    </Router>
  );
};

export default App;