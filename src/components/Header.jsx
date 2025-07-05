import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCart, Menu, X, Search, User } from 'lucide-react';
import './Header.css';

const Header = ({ cartCount }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === 'Enter' && searchValue.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchValue.trim())}`);
      setSearchValue('');
    }
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          {/* Logo */}
          <Link to="/" className="logo" onClick={closeMenu}>
            <div className="logo-icon">⚡</div>
            <div className="logo-text">
              <span className="logo-primary">Tech</span>
              <span className="logo-secondary">Hub</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="nav-desktop">
            <Link 
              to="/" 
              className={`nav-link ${isActive('/') ? 'active' : ''}`}
            >
              Home
            </Link>
            <Link 
              to="/products" 
              className={`nav-link ${isActive('/products') ? 'active' : ''}`}
            >
              Products
            </Link>
            <Link 
              to="/survey" 
              className={`nav-link ${isActive('/survey') ? 'active' : ''}`}
            >
              Feedback
            </Link>
          </nav>

          {/* Search Bar */}
          <div className="search-container">
            <div className="search-input-wrapper">
              <Search className="search-icon" size={20} />
              <input 
                type="text" 
                placeholder="Search for electronics..." 
                className="search-input"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyDown={handleSearchKeyDown}
              />
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="header-actions">
            <Link to="/cart" className="cart-icon-wrapper">
              <ShoppingCart className="cart-icon" size={24} />
              {cartCount > 0 && (
                <span className="cart-badge">{cartCount}</span>
              )}
            </Link>
            
            <button className="user-icon-wrapper">
              <User className="user-icon" size={24} />
            </button>

            {/* Mobile Menu Button */}
            <button className="mobile-menu-btn" onClick={toggleMenu}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <nav className={`nav-mobile ${isMenuOpen ? 'open' : ''}`}>
          <Link 
            to="/" 
            className={`nav-link ${isActive('/') ? 'active' : ''}`}
            onClick={closeMenu}
          >
            Home
          </Link>
          <Link 
            to="/products" 
            className={`nav-link ${isActive('/products') ? 'active' : ''}`}
            onClick={closeMenu}
          >
            Products
          </Link>
          <Link 
            to="/survey" 
            className={`nav-link ${isActive('/survey') ? 'active' : ''}`}
            onClick={closeMenu}
          >
            Feedback
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header; 