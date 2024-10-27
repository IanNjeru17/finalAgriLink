// src/Sidebar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button className="toggle-button" onClick={toggleSidebar}>
        {isOpen ? 'Close' : 'Menu'}
      </button>
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="logo">Agrilink Oasis</div>
        <ul className="menu">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/products">All Products</Link>
          </li>
          <li>
            <Link to="/createBlog">Create Blog</Link>
          </li>
          <li>
            <Link to="/signup">Sign Up</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/logout">Logout</Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
