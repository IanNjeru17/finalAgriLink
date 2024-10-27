import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer-section">
      <div className="footer-container">
        <div className="footer-logo">
          <img src="/logo.svg" alt="Logo" className="logo" />
        </div>
        <div className="footer-links">
          <h4 className="footer-title">Products</h4>
          <ul>
            <li><a href="#">Exchange</a></li>
            <li><a href="#">Futures</a></li>
            <li><a href="#">Margin</a></li>
            <li><a href="#">Savings</a></li>
          </ul>
        </div>
        <div className="footer-links">
          <h4 className="footer-title">Resources</h4>
          <ul>
            <li><a href="#">Help Center</a></li>
            <li><a href="#">Blog</a></li>
            <li><a href="#">API Documentation</a></li>
            <li><a href="#">Security</a></li>
          </ul>
        </div>
        <div className="footer-links">
          <h4 className="footer-title">Company</h4>
          <ul>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms of Service</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2024 Your Company. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
