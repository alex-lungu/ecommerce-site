import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Zap, Shield, Truck, Clock } from 'lucide-react';
import { products } from '../data/products';
import './Home.css';

const Home = () => {
  const featuredProducts = products.filter(product => product.isNew || product.isOnSale).slice(0, 6);
  const newProducts = products.filter(product => product.isNew).slice(0, 4);

  return (
    <div className="home">
      {/* Hero Section - Incite to Action */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">
                Discover the Future of 
                <span className="hero-highlight"> Technology</span>
              </h1>
              <p className="hero-subtitle">
                Experience cutting-edge electronics that transform your digital lifestyle. 
                From smartphones to gaming consoles, we bring you the latest innovations 
                at unbeatable prices!
              </p>
              <div className="hero-cta">
                <Link to="/products" className="btn btn-primary">
                  Shop Now
                  <ArrowRight size={20} />
                </Link>
                <div className="hero-badge">
                  <Zap size={16} />
                  <span>Limited Time Deals!</span>
                </div>
              </div>
            </div>
            <div className="hero-visual">
              <div className="hero-image">
                <div className="floating-devices">
                  <div className="device device-1">📱</div>
                  <div className="device device-2">💻</div>
                  <div className="device device-3">🎧</div>
                  <div className="device device-4">⌚</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Inform */}
      <section className="features">
        <div className="container">
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <Truck size={24} />
              </div>
              <h3>Free Shipping</h3>
              <p>Free standard shipping on all orders over $50. Get your tech delivered right to your doorstep!</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <Shield size={24} />
              </div>
              <h3>Secure Payment</h3>
              <p>Your payment information is protected with bank-level security. Shop with complete confidence.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <Clock size={24} />
              </div>
              <h3>24/7 Support</h3>
              <p>Our expert team is here to help you 24/7. Get answers to all your tech questions anytime.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section - Incite to Action */}
      <section className="featured-products">
        <div className="container">
          <div className="section-header">
            <h2>🔥 Hot Deals & New Arrivals</h2>
            <p>Don't miss out on these incredible offers! Limited quantities available.</p>
          </div>
          <div className="products-grid">
            {featuredProducts.map(product => (
              <div key={product.id} className="product-card featured">
                <div className="product-badges">
                  {product.isNew && <span className="badge badge-primary">New</span>}
                  {product.isOnSale && <span className="badge badge-secondary">{product.discount}% OFF</span>}
                </div>
                <div className="product-image">
                  <span className="product-emoji">{product.image}</span>
                </div>
                <div className="product-info">
                  <h3 className="product-name">{product.name}</h3>
                  <div className="product-rating">
                    <div className="stars">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={16} 
                          fill={i < Math.floor(product.rating) ? "#fbbf24" : "none"}
                          color="#fbbf24"
                        />
                      ))}
                    </div>
                    <span className="rating-text">({product.reviews})</span>
                  </div>
                  <div className="product-price">
                    <span className="current-price">${product.price}</span>
                    {product.originalPrice > product.price && (
                      <span className="original-price">${product.originalPrice}</span>
                    )}
                  </div>
                  <Link to={`/product/${product.id}`} className="btn btn-outline">
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="section-cta">
            <Link to="/products" className="btn btn-primary btn-large">
              View All Products
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section - Inform */}
      <section className="categories">
        <div className="container">
          <div className="section-header">
            <h2>Explore Our Categories</h2>
            <p>Find exactly what you're looking for in our comprehensive selection of electronics.</p>
          </div>
          <div className="categories-grid">
            <Link to="/products" className="category-card">
              <div className="category-icon">📱</div>
              <h3>Smartphones</h3>
              <p>Latest mobile devices with cutting-edge features</p>
            </Link>
            <Link to="/products" className="category-card">
              <div className="category-icon">💻</div>
              <h3>Laptops</h3>
              <p>Powerful computers for work and entertainment</p>
            </Link>
            <Link to="/products" className="category-card">
              <div className="category-icon">🎧</div>
              <h3>Audio & Video</h3>
              <p>Premium sound and visual experiences</p>
            </Link>
            <Link to="/products" className="category-card">
              <div className="category-icon">🎮</div>
              <h3>Gaming</h3>
              <p>Next-generation gaming consoles and accessories</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action Section - Engage in Connection */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Upgrade Your Tech?</h2>
            <p>
              Join thousands of satisfied customers who trust TechHub for their electronics needs. 
              What are you waiting for? Start exploring our amazing collection today!
            </p>
            <div className="cta-buttons">
              <Link to="/products" className="btn btn-primary btn-large">
                Start Shopping
              </Link>
              <Link to="/survey" className="btn btn-outline btn-large">
                Share Your Experience
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 