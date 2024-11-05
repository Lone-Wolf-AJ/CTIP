import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <img src="/logo.png" alt="Logo" className="navbar-logo" />
      <h1 className="navbar-title">Melbourne Property Insights</h1>
    </nav>
  );
};

export default Navbar;
