// CustomNavbar.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBell, FaTimes, FaUserCircle } from 'react-icons/fa';
import KceLogo from '../../assets/images/kce.gif';
import './NavBar.css';

const CustomNavbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 800);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 800);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleNavbar = () => {
    setIsNavOpen(!isNavOpen);
  };

  const closeNavbar = () => {
    setIsNavOpen(false);
  };

  const navItems = [
    { text: 'Home', to: '/alumni/' },
    { text: 'Events', to: '/alumni/event/' },
    { text: 'Alumni', to: '/alumni/manage-alumni/' },
  ];

  return (
    <header className="custom-navbar">
      <div className="navbar-container">
        <Link to="/alumni/home" className="brand">
          <img src={KceLogo} className="kce-logo" alt="KCE Logo" />
          <span className="portal-name">KCE Alumni</span>
        </Link>

        <nav className={`navbar-collapse ${isNavOpen ? 'open' : ''}`} id="navbar-links">
          {isMobile && (
            <div className="mobile-nav-header">
              <Link to="/alumni/home" className="brand mobile" onClick={closeNavbar}>
                <img src={KceLogo} className="kce-logo" alt="KCE Logo" />
                <span className="portal-name">KCE Alumni</span>
              </Link>
              <button className="close-nav" onClick={closeNavbar}>
                <FaTimes />
              </button>
            </div>
          )}

          <ul className={`nav-links ${isMobile ? 'mobile' : 'desktop'}`}>
            {navItems.map((item, index) => (
              <li key={index} className="nav-itemm">
                <Link to={item.to} onClick={closeNavbar}>
                  <span className="nav-text">{item.text}</span>
                </Link>
              </li>
            ))}
            {isMobile && (
              <li className="nav-itemm">
                <Link to="/alumni/profile" onClick={closeNavbar}>
                  <span className="nav-text">Profile</span>
                </Link>
              </li>
            )}
          </ul>

          {isMobile && (
            <div className="logout-container">
              <Link to="/logout" className="logout" onClick={closeNavbar}>
                <span className="nav-text">Logout</span>
              </Link>
            </div>
          )}
        </nav>

        <div className="nav-controls">
          <Link to="/alumni/notifications" className="icon notifications-icon">
            <FaBell />
          </Link>
          {!isMobile && (
            <Link to="/alumni/profile" className="icon profile-icon">
              <FaUserCircle />
            </Link>
          )}
          {isMobile && (
            <button className={`navbar-toggle ${isNavOpen ? 'active' : ''}`} onClick={toggleNavbar}>
              {isNavOpen ? <FaTimes /> : '\u2630'}
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default CustomNavbar;
