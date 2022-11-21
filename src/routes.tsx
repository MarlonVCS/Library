import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Cart from './Pages/Cart';
import Category from './Pages/Category';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Marketplace from './Pages/Marketplace';
import Registration from './Pages/Registration';

export default function RoutesApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/category" element={<Category />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </BrowserRouter>
  )
}