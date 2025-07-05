import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Package, Truck, Mail, Star, ArrowRight } from 'lucide-react';
import './Confirmation.css';

const Confirmation = ({ orderComplete, userInfo }) => {
  if (!orderComplete) {
    return (
      <div className="confirmation-page">
        <div className="confirmation-container">
          <div className="no-order">
            <h2>No Order Found</h2>
            <p>It looks like you haven't completed an order yet.</p>
            <Link to="/products" className="btn btn-primary">
              Start Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const orderNumber = `ORD-${Date.now().toString().slice(-8)}`;
  const estimatedDelivery = new Date();
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 5);

  return (
    <div className="confirmation-page">
      <div className="confirmation-container">
        {/* Success Message */}
        <div className="success-header">
          <div className="success-icon">
            <CheckCircle size={64} />
          </div>
          <h1>Thank You for Your Order!</h1>
          <p>Your order has been successfully placed and is being processed.</p>
        </div>

        <div className="confirmation-layout">
          {/* Order Details */}
          <div className="order-details">
            <div className="detail-card">
              <h2>Order Information</h2>
              
              <div className="order-info">
                <div className="info-item">
                  <span className="label">Order Number:</span>
                  <span className="value">{orderNumber}</span>
                </div>
                <div className="info-item">
                  <span className="label">Order Date:</span>
                  <span className="value">{new Date().toLocaleDateString()}</span>
                </div>
                <div className="info-item">
                  <span className="label">Estimated Delivery:</span>
                  <span className="value">{estimatedDelivery.toLocaleDateString()}</span>
                </div>
                <div className="info-item">
                  <span className="label">Payment Method:</span>
                  <span className="value">Credit Card</span>
                </div>
              </div>
            </div>

            {/* Shipping Information */}
            <div className="detail-card">
              <h2>Shipping Information</h2>
              
              <div className="shipping-info">
                <div className="shipping-address">
                  <h3>Shipping Address</h3>
                  <p>
                    {userInfo.firstName} {userInfo.lastName}<br />
                    {userInfo.address}<br />
                    {userInfo.city}, {userInfo.state} {userInfo.zipCode}<br />
                    {userInfo.email}<br />
                    {userInfo.phone}
                  </p>
                </div>
              </div>
            </div>

            {/* Order Status */}
            <div className="detail-card">
              <h2>Order Status</h2>
              
              <div className="status-timeline">
                <div className="status-step completed">
                  <div className="status-icon">
                    <CheckCircle size={20} />
                  </div>
                  <div className="status-content">
                    <h4>Order Confirmed</h4>
                    <p>Your order has been received and confirmed</p>
                    <span className="status-time">Just now</span>
                  </div>
                </div>
                
                <div className="status-step active">
                  <div className="status-icon">
                    <Package size={20} />
                  </div>
                  <div className="status-content">
                    <h4>Processing</h4>
                    <p>We're preparing your items for shipment</p>
                    <span className="status-time">Next step</span>
                  </div>
                </div>
                
                <div className="status-step">
                  <div className="status-icon">
                    <Truck size={20} />
                  </div>
                  <div className="status-content">
                    <h4>Shipped</h4>
                    <p>Your order is on its way to you</p>
                    <span className="status-time">Estimated: {estimatedDelivery.toLocaleDateString()}</span>
                  </div>
                </div>
                
                <div className="status-step">
                  <div className="status-icon">
                    <CheckCircle size={20} />
                  </div>
                  <div className="status-content">
                    <h4>Delivered</h4>
                    <p>Your order has been delivered</p>
                    <span className="status-time">Pending</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="next-steps">
            <div className="steps-card">
              <h3>What's Next?</h3>
              
              <div className="steps-list">
                <div className="step-item">
                  <div className="step-icon">
                    <Mail size={20} />
                  </div>
                  <div className="step-content">
                    <h4>Order Confirmation Email</h4>
                    <p>You'll receive a confirmation email with your order details shortly.</p>
                  </div>
                </div>
                
                <div className="step-item">
                  <div className="step-icon">
                    <Truck size={20} />
                  </div>
                  <div className="step-content">
                    <h4>Shipping Updates</h4>
                    <p>We'll send you tracking information once your order ships.</p>
                  </div>
                </div>
                
                <div className="step-item">
                  <div className="step-icon">
                    <Star size={20} />
                  </div>
                  <div className="step-content">
                    <h4>Share Your Experience</h4>
                    <p>Help us improve by sharing your shopping experience with us.</p>
                  </div>
                </div>
              </div>
              
              <div className="steps-actions">
                <Link to="/survey" className="btn btn-primary">
                  Take Our Survey
                  <ArrowRight size={16} />
                </Link>
                <Link to="/products" className="btn btn-outline">
                  Continue Shopping
                </Link>
              </div>
            </div>

            {/* Support Information */}
            <div className="support-card">
              <h3>Need Help?</h3>
              <p>If you have any questions about your order, our customer support team is here to help.</p>
              
              <div className="support-info">
                <div className="support-item">
                  <span className="support-label">Email:</span>
                  <span className="support-value">support@techhub.com</span>
                </div>
                <div className="support-item">
                  <span className="support-label">Phone:</span>
                  <span className="support-value">+1 (555) 123-4567</span>
                </div>
                <div className="support-item">
                  <span className="support-label">Hours:</span>
                  <span className="support-value">24/7 Support</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Actions */}
        <div className="additional-actions">
          <div className="action-grid">
            <Link to="/products" className="action-card">
              <div className="action-icon">🛍️</div>
              <h3>Shop More</h3>
              <p>Discover more amazing products</p>
            </Link>
            
            <Link to="/survey" className="action-card">
              <div className="action-icon">📝</div>
              <h3>Give Feedback</h3>
              <p>Help us improve your experience</p>
            </Link>
            
            <div className="action-card">
              <div className="action-icon">📧</div>
              <h3>Track Order</h3>
              <p>Check your order status</p>
            </div>
            
            <div className="action-card">
              <div className="action-icon">💬</div>
              <h3>Contact Support</h3>
              <p>Get help with your order</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confirmation; 