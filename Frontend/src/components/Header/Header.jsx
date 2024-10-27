import React, { useState } from "react";
import "./Header.css";
import { Link } from 'react-router-dom';

function Header() {
  const [active, setActive] = useState("nav__menu");
  const [icon, setIcon] = useState("nav__toggler");
  const navToggle = () => {
    if (active === "nav__menu") {
      setActive("nav__menu nav__active");
    } else setActive("nav__menu");

    // Icon Toggler
    if (icon === "nav__toggler") {
      setIcon("nav__toggler toggle");
    } else setIcon("nav__toggler");
  };
  return (
    <nav className="nav">
      <Link to="" className="nav__brand">
          <img src="/logo.svg" alt='logo' className='logo_nav'/>
      </Link>
      <ul className={active}>
        <li className="nav__item">
          <Link to="" className="nav__link">
            Home
          </Link>
        </li>
        <li className="nav__item">
          <Link to="/blog" className="nav__link">
            Blog
          </Link>
        </li>
        <li className="nav__item">
          <Link to="/products" className="nav__link">
            Products
          </Link>
        </li>
        <li className="nav__item">
  <Link to="/login" className="nav__link btn-login">
    Login
  </Link>
</li>
<li className="nav__item">
  <Link to="/signup" className="nav__link btn-signup">
    Signup
  </Link>
</li>
      </ul>
      <div onClick={navToggle} className={icon}>
        <div className="line1"></div>
        <div className="line2"></div>
        <div className="line3"></div>
      </div>
    </nav>
  );
}

export default Header;