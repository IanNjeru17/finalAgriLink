import React from 'react';
import { Link } from 'react-router-dom';


const Navbar = () => {
  

  return (
    <nav className='nav'>
      <header className='header'>
          <>
            <Link className='link'  to="/">Home</Link>
            <Link className='link' to="/blog">Blog</Link>
            <Link className='link' to="/products">Products</Link>
            <Link className='link' to="/signup">Sign Up</Link>
            <Link className='link' to="/login">Log In</Link>
            <Link className='link' to ='/logout'>Logout</Link>
          </>
    
      </header>
    </nav>
  );
};

export default Navbar;
