import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, ShoppingCart, Heart, Share2, Check, Truck, Shield, RotateCcw } from 'lucide-react';
import { products } from '../data/products';
import './ProductDetail.css';

const ProductDetail = ({ addToCart }) => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [selectedTab, setSelectedTab] = useState('description');

  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="product-detail-page">
        <div className="product-detail-container">
          <div className="product-not-found">
            <h2>Product Not Found</h2>
            <p>The product you're looking for doesn't exist.</p>
            <Link to="/products" className="btn btn-primary">
              Back to Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
  };

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  return (
    <div className="product-detail-page">
      <div className="product-detail-container">
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/products">Products</Link>
          <span>/</span>
          <span>{product.name}</span>
        </nav>

        <div className="product-detail-layout">
          {/* Left: Product Image */}
          <div className="product-image-section">
            <div className="product-image-container">
              <div className="product-image">
                <span className="product-emoji">{product.image}</span>
              </div>
              <div className="product-badges">
                {product.isNew && <span className="badge badge-primary">New</span>}
                {product.isOnSale && <span className="badge badge-secondary">{product.discount}% OFF</span>}
                {!product.inStock && <span className="badge badge-outline">Out of Stock</span>}
              </div>
            </div>
          </div>

          {/* Right: All Info and Actions */}
          <div className="product-info-section">
            <div className="product-header-row">
              <h1 className="product-title">{product.name}</h1>
              <div className="product-rating-inline">
                <div className="stars">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={20} 
                      fill={i < Math.floor(product.rating) ? "#fbbf24" : "none"}
                      color="#fbbf24"
                    />
                  ))}
                </div>
                <span className="rating-text">{product.rating} ({product.reviews} reviews)</span>
              </div>
            </div>
            <div className="product-center-block">
              <div className="product-price-center">
                <div className="product-price-section">
                  <div className="price-container">
                    <span className="current-price">${product.price}</span>
                    {product.originalPrice > product.price && (
                      <span className="original-price">${product.originalPrice}</span>
                    )}
                    {product.isOnSale && (
                      <span className="discount-badge">Save ${(product.originalPrice - product.price).toFixed(2)}</span>
                    )}
                  </div>
                </div>
                <div className="product-description-large">
                  <p>{product.description}</p>
                </div>
              </div>
            </div>
            <div className="purchase-section">
              {product.inStock ? (
                <>
                  <div className="quantity-selector">
                    <label htmlFor="quantity">Quantity:</label>
                    <div className="quantity-controls">
                      <button 
                        onClick={() => handleQuantityChange(quantity - 1)}
                        disabled={quantity <= 1}
                      >
                        -
                      </button>
                      <input
                        type="number"
                        id="quantity"
                        value={quantity}
                        onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                        min="1"
                      />
                      <button onClick={() => handleQuantityChange(quantity + 1)}>
                        +
                      </button>
                    </div>
                  </div>
                  <div className="purchase-actions">
                    <button 
                      className="btn btn-primary btn-large"
                      onClick={handleAddToCart}
                    >
                      <ShoppingCart size={20} />
                      Add to Cart
                    </button>
                    <button className="btn btn-outline">
                      <Heart size={20} />
                      Wishlist
                    </button>
                    <button className="btn btn-outline">
                      <Share2 size={20} />
                      Share
                    </button>
                  </div>
                </>
              ) : (
                <div className="out-of-stock">
                  <p>This product is currently out of stock.</p>
                  <button className="btn btn-outline">Notify When Available</button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="product-details-tabs">
          <div className="tabs-header">
            <button 
              className={`tab-button ${selectedTab === 'description' ? 'active' : ''}`}
              onClick={() => setSelectedTab('description')}
            >
              Description
            </button>
            <button 
              className={`tab-button ${selectedTab === 'specifications' ? 'active' : ''}`}
              onClick={() => setSelectedTab('specifications')}
            >
              Specifications
            </button>
            <button 
              className={`tab-button ${selectedTab === 'reviews' ? 'active' : ''}`}
              onClick={() => setSelectedTab('reviews')}
            >
              Reviews ({product.reviews})
            </button>
          </div>

          <div className="tab-content">
            {selectedTab === 'description' && (
              <div className="description-content">
                <h3>Product Description</h3>
                <p>{product.description}</p>
                <div className="features-grid">
                  {product.features.map((feature, index) => (
                    <div key={index} className="feature-item">
                      <Check size={16} />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedTab === 'specifications' && (
              <div className="specifications-content">
                <h3>Technical Specifications</h3>
                <div className="specs-grid">
                  {Object.entries(product.specs).map(([key, value]) => (
                    <div key={key} className="spec-item">
                      <span className="spec-label">{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                      <span className="spec-value">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedTab === 'reviews' && (
              <div className="reviews-content">
                <h3>Customer Reviews</h3>
                <div className="reviews-summary">
                  <div className="overall-rating">
                    <div className="rating-number">{product.rating}</div>
                    <div className="stars">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={20} 
                          fill={i < Math.floor(product.rating) ? "#fbbf24" : "none"}
                          color="#fbbf24"
                        />
                      ))}
                    </div>
                    <p>Based on {product.reviews} reviews</p>
                  </div>
                </div>
                <div className="review-placeholder">
                  <p>Customer reviews will be displayed here.</p>
                  <button className="btn btn-outline">Write a Review</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail; 