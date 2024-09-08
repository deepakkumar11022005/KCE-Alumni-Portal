import React, { useState, useEffect } from 'react';
import { FaBell, FaHome, FaCalendarAlt, FaUsers, FaUserCircle, FaSignOutAlt, FaTimes } from 'react-icons/fa';
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

  const mobileNavItems = [
    { icon: <FaHome />, text: 'Home', href: '#home' },
    { icon: <FaCalendarAlt />, text: 'Events', href: '#events' },
    { icon: <FaUsers />, text: 'Alumni', href: '#alumni' },
    { icon: <FaUserCircle />, text: 'Profile', href: '#profile' },
    { icon: <FaSignOutAlt />, text: 'Logout', href: '#logout' },
  ];

  return (
    <header className="custom-navbar">
      <div className="navbar-container">
        <a href="#home" className="brand">
          <img src={KceLogo} className="kce-logo" alt="KCE Logo" />
          <span className="portal-name">KCE Alumni</span>
        </a>

        {isMobile && (
          <div className="mobile-controls">
            <a href="#notifications" className="nav-item-notification notifications-icon">
              <FaBell size={25} />
            </a>
            <button className={`navbar-toggle ${isNavOpen ? 'active' : ''}`} onClick={toggleNavbar}>
              {isNavOpen ? <FaTimes /> : '\u2630'}
            </button>
          </div>
        )}

        <nav className={`navbar-collapse ${isNavOpen ? 'open' : ''}`} id="navbar-links">
          {isMobile && (
            <button className="close-nav" onClick={closeNavbar}>
              <FaTimes />
            </button>
          )}
          {isMobile ? (
            <ul className="nav-links mobile">
              {mobileNavItems.map((item, index) => (
                <li key={index}>
                  <a href={item.href} className="nav-item" onClick={closeNavbar}>
                    <span className="nav-icon">{item.icon}</span>
                    <span className="nav-text">{item.text}</span>
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <ul className="nav-links desktop">
              <li><a href="#home" className="nav-item">Home</a></li>
              <li><a href="#events" className="nav-item">Events</a></li>
              <li><a href="#alumni" className="nav-item">Alumni</a></li>
              <li>
                <a href="#notifications" className="nav-item-notification">
                  <FaBell size={20} />
                </a>
              </li>
              <li className="nav-dropdown">
                <button className="dropdown-toggle" aria-haspopup="true">
                  <FaUserCircle size={20} />
                </button>
                <ul className="dropdown-menu">
                  <li><a href="#profile" className="dropdown-item">Profile</a></li>
                  <li><a href="#settings" className="dropdown-item">Settings</a></li>
                  <li className="dropdown-divider"></li>
                  <li><a href="#logout" className="dropdown-item logout_item"><span>Logout</span> < FaSignOutAlt size={20} /></a></li>
                </ul>
              </li>
            </ul>
          )}
        </nav>
      </div>
    </header>
  );
};

export default CustomNavbar;
