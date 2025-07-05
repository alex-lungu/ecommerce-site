import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Minus, Plus, ArrowLeft, ShoppingBag } from 'lucide-react';
import './Cart.css';

const Cart = ({ cart, removeFromCart, updateQuantity, getCartTotal }) => {
  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity >= 1) {
      updateQuantity(productId, newQuantity);
    }
  };

  const formatPrice = (price) => {
    return `$${price.toFixed(2)}`;
  };

  if (cart.length === 0) {
    return (
      <div className="cart-page">
        <div className="cart-container">
          <div className="empty-cart">
            <div className="empty-cart-icon">
              <ShoppingBag size={64} />
            </div>
            <h2>Your cart is empty</h2>
            <p>Looks like you haven't added any items to your cart yet.</p>
            <Link to="/products" className="btn btn-primary btn-large">
              <ArrowLeft size={20} />
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-container">
        {/* Page Header */}
        <div className="cart-header">
          <h1>Shopping Cart</h1>
          <p>You have {cart.length} item{cart.length !== 1 ? 's' : ''} in your cart</p>
        </div>

        <div className="cart-layout">
          {/* Cart Items */}
          <div className="cart-items">
            <div className="cart-items-header">
              <h2>Cart Items</h2>
            </div>
            
            {cart.map(item => (
              <div key={item.id} className="cart-item">
                <div className="item-image">
                  <span className="item-emoji">{item.image}</span>
                </div>
                
                <div className="item-details">
                  <div className="item-info">
                    <h3 className="item-name">{item.name}</h3>
                    <p className="item-brand">{item.brand}</p>
                    <div className="item-price">
                      <span className="current-price">{formatPrice(item.price)}</span>
                      {item.originalPrice > item.price && (
                        <span className="original-price">{formatPrice(item.originalPrice)}</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="item-quantity">
                    <label htmlFor={`quantity-${item.id}`}>Quantity:</label>
                    <div className="quantity-controls">
                      <button 
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        className="quantity-btn"
                      >
                        <Minus size={16} />
                      </button>
                      <input
                        type="number"
                        id={`quantity-${item.id}`}
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 1)}
                        min="1"
                        className="quantity-input"
                      />
                      <button 
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        className="quantity-btn"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                  
                  <div className="item-total">
                    <span className="total-label">Total:</span>
                    <span className="total-price">{formatPrice(item.price * item.quantity)}</span>
                  </div>
                  
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="remove-item"
                    aria-label="Remove item"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="cart-summary">
            <div className="summary-card">
              <h3>Order Summary</h3>
              
              <div className="summary-items">
                <div className="summary-item">
                  <span>Subtotal ({cart.length} item{cart.length !== 1 ? 's' : ''})</span>
                  <span>{formatPrice(getCartTotal())}</span>
                </div>
                <div className="summary-item">
                  <span>Shipping</span>
                  <span>{getCartTotal() >= 50 ? 'Free' : formatPrice(5.99)}</span>
                </div>
                <div className="summary-item">
                  <span>Tax</span>
                  <span>{formatPrice(getCartTotal() * 0.13)}</span>
                </div>
              </div>
              
              <div className="summary-total">
                <span>Total</span>
                <span>{formatPrice(getCartTotal() + (getCartTotal() >= 50 ? 0 : 5.99) + (getCartTotal() * 0.13))}</span>
              </div>
              
              <div className="summary-actions">
                <Link to="/checkout" className="btn btn-primary btn-large">
                  Proceed to Checkout
                </Link>
                <Link to="/products" className="btn btn-outline">
                  <ArrowLeft size={20} />
                  Continue Shopping
                </Link>
              </div>
              
              <div className="summary-benefits">
                <div className="benefit-item">
                  <div className="benefit-icon">🚚</div>
                  <div>
                    <h4>Free Shipping</h4>
                    <p>On orders over $50</p>
                  </div>
                </div>
                <div className="benefit-item">
                  <div className="benefit-icon">🛡️</div>
                  <div>
                    <h4>Secure Payment</h4>
                    <p>Your data is protected</p>
                  </div>
                </div>
                <div className="benefit-item">
                  <div className="benefit-icon">↩️</div>
                  <div>
                    <h4>Easy Returns</h4>
                    <p>30-day return policy</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart; 