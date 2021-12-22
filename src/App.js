import React from 'react';
import Products from './components/Products'
import Cart from './components/Cart'
import './App.css';
import { CartProvider } from './context/cart-context'
import { Routes, Route, Outlet, Link } from "react-router-dom";


function App() {
  return (
    <CartProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Products />} />
          <Route path="cart" element={<Cart />} />
        </Route>
      </Routes>
    </CartProvider>
  );
}

function Layout() {
  return (
    <div>
      <nav>
        <div>
          <Link to="/">Products</Link>
        </div>
        <div>
          <Link to="/cart">Cart</Link>
        </div>
      </nav>
      <Outlet />
    </div>
  );
}

export default App;
