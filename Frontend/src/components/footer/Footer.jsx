import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="footer-container">
        <div className="footer-logo">
          <img src="/logo.svg" alt="Logo" className="logo" />
        </div>
        {['Products', 'Resources', 'Company'].map((title, index) => (
          <div className="footer-links" key={index}>
            <h4 className="footer-title">{title}</h4>
            <ul>
              {getLinks(title).map((link, idx) => (
                <li key={idx}>
                  <a href="#">{link}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="footer-bottom">
        <p>© 2024 Your Company. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

const getLinks = (title) => {
  const links = {
    Products: ['Exchange', 'Futures', 'Margin', 'Savings'],
    Resources: ['Help Center', 'Blog', 'API Documentation', 'Security'],
    Company: ['About Us', 'Careers', 'Privacy Policy', 'Terms of Service'],
  };
  return links[title] || [];
};

export default Footer;
