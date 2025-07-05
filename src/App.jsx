import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Confirmation from './pages/Confirmation';
import Survey from './pages/Survey';
import ScrollToTop from './components/ScrollToTop';
import './App.css';

function App() {
  const [cart, setCart] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [orderComplete, setOrderComplete] = useState(false);

  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <Router>
      <ScrollToTop />
      <div className="App">
        <Header cartCount={getCartCount()} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products addToCart={addToCart} />} />
            <Route path="/product/:id" element={<ProductDetail addToCart={addToCart} />} />
            <Route 
              path="/cart" 
              element={
                <Cart 
                  cart={cart} 
                  removeFromCart={removeFromCart} 
                  updateQuantity={updateQuantity}
                  getCartTotal={getCartTotal}
                />
              } 
            />
            <Route 
              path="/checkout" 
              element={
                <Checkout 
                  cart={cart}
                  getCartTotal={getCartTotal}
                  userInfo={userInfo}
                  setUserInfo={setUserInfo}
                  setOrderComplete={setOrderComplete}
                  clearCart={clearCart}
                />
              } 
            />
            <Route 
              path="/confirmation" 
              element={
                <Confirmation 
                  orderComplete={orderComplete}
                  userInfo={userInfo}
                />
              } 
            />
            <Route path="/survey" element={<Survey />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
