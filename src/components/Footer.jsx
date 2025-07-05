import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          {/* Company Info */}
          <div className="footer-section">
            <div className="footer-logo">
              <div className="logo-icon">⚡</div>
              <div className="logo-text">
                <span className="logo-primary">Tech</span>
                <span className="logo-secondary">Hub</span>
              </div>
            </div>
            <p className="footer-description">
              Your premier destination for cutting-edge electronics and tech innovations. 
              We bring you the latest gadgets and devices to enhance your digital lifestyle.
            </p>
            <div className="social-links">
              <a href="#" className="social-link" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="social-link" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className="social-link" aria-label="Instagram">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h3 className="footer-title">Quick Links</h3>
            <ul className="footer-links">
              <li>
                <Link to="/" className="footer-link">Home</Link>
              </li>
              <li>
                <Link to="/products" className="footer-link">Products</Link>
              </li>
              <li>
                <Link to="/survey" className="footer-link">Feedback</Link>
              </li>
              <li>
                <a href="#" className="footer-link">About Us</a>
              </li>
              <li>
                <a href="#" className="footer-link">Contact</a>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="footer-section">
            <h3 className="footer-title">Categories</h3>
            <ul className="footer-links">
              <li>
                <a href="#" className="footer-link">Smartphones</a>
              </li>
              <li>
                <a href="#" className="footer-link">Laptops</a>
              </li>
              <li>
                <a href="#" className="footer-link">Audio & Video</a>
              </li>
              <li>
                <a href="#" className="footer-link">Gaming</a>
              </li>
              <li>
                <a href="#" className="footer-link">Accessories</a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-section">
            <h3 className="footer-title">Contact Us</h3>
            <div className="contact-info">
              <div className="contact-item">
                <MapPin size={16} />
                <span>123 Tech Street, Digital City, DC 12345</span>
              </div>
              <div className="contact-item">
                <Phone size={16} />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="contact-item">
                <Mail size={16} />
                <span>info@techhub.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p className="copyright">
              © 2025 TechHub. All rights reserved.
            </p>
            <div className="footer-bottom-links">
              <a href="#" className="footer-bottom-link">Privacy Policy</a>
              <a href="#" className="footer-bottom-link">Terms of Service</a>
              <a href="#" className="footer-bottom-link">Shipping Info</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 