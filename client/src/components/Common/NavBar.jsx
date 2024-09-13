import React, { useState, useEffect } from 'react';
import { FaBell, FaTimes, FaUserCircle } from 'react-icons/fa';
import KceLogo from '../../assets/images/kce.gif';
import './Navbar.css';

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
    { text: 'Home', href: '#home' },
    { text: 'Events', href: '#events' },
    { text: 'Alumni', href: '#alumni' },
  ];

  return (
    <header className="custom-navbar">
      <div className="navbar-container">
        <a href="#home" className="brand">
          <img src={KceLogo} className="kce-logo" alt="KCE Logo" />
          <span className="portal-name">KCE Alumni</span>
        </a>

        <nav className={`navbar-collapse ${isNavOpen ? 'open' : ''}`} id="navbar-links">
          {isMobile && (
            <div className="mobile-nav-header">
              <a href="#home" className="brand mobile">
                <img src={KceLogo} className="kce-logo" alt="KCE Logo" />
                <span className="portal-name">KCE Alumni</span>
              </a>
              <button className="close-nav" onClick={closeNavbar}>
                <FaTimes />
              </button>
            </div>
          )}

          <ul className={`nav-links ${isMobile ? 'mobile' : 'desktop'}`}>
            {navItems.map((item, index) => (
              <li key={index} className="nav-item">
                <a href={item.href} onClick={closeNavbar}>
                  <span className="nav-text">{item.text}</span>
                </a>
              </li>
            ))}
            {isMobile && (
              <li className="nav-item">
                <a href="#profile" onClick={closeNavbar}>
                  <span className="nav-text">Profile</span>
                </a>
              </li>
            )}
          </ul>

          {isMobile && (
            <div className="logout-container">
              <a href="#logout" className="logout" onClick={closeNavbar}>
                <span className="nav-text">Logout</span>
              </a>
            </div>
          )}
        </nav>

        <div className="nav-controls">
          <FaBell className="icon notifications-icon" />
          {!isMobile && <FaUserCircle className="icon profile-icon" />}
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