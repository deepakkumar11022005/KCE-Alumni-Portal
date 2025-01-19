import React, { useEffect, useRef } from 'react';
import './Navbar.css';
import { Link, useLocation } from 'react-router-dom';

const NavBar = () => {
  const indicatorRef = useRef(null);
  const itemsRef = useRef([]);
  const location = useLocation();

  const navItems = [
    { path: '/alumni', label: 'Home' },
    { path: '/alumni/newsroom', label: 'Newsroom' },
    { path: '/alumni/about-us', label: 'About Us' },
    { path: '/alumni/alumni', label: 'Alumni' },
    { path: '/alumni/events', label: 'Events' },
    { path: '/alumni/gallery', label: 'Gallery' },
    { path: '/alumni/contact-us', label: 'Contact Us' }
  ];

  const handleIndicator = (el) => {
    if (!el || !indicatorRef.current) return;

    // Clear all other active items
    itemsRef.current.forEach((item) => {
      if (item) {
        item.classList.remove('is-active');
        item.removeAttribute('style');
      }
    });

    // Move the indicator and apply color
    indicatorRef.current.style.width = `${el.offsetWidth}px`;
    indicatorRef.current.style.left = `${el.offsetLeft}px`;
    indicatorRef.current.style.backgroundColor = el.getAttribute('active-color');
    el.classList.add('is-active');
    el.style.color = el.getAttribute('active-color');
  };

  useEffect(() => {
    // Initialize refs array with the correct length
    itemsRef.current = itemsRef.current.slice(0, navItems.length);

    // Find and highlight the active link
    const activeElement = itemsRef.current.find(
      (item) => item && item.getAttribute('href') === location.pathname
    );

    if (activeElement) {
      handleIndicator(activeElement);
    }
  }, [location.pathname]);

  return (
    <div className="alumni-navBack">
      <div className="alumni-nav">
        {navItems.map((item, index) => (
          <Link
            key={item.path}
            to={item.path}
            className="alumni-nav-item"
            active-color="var(--primary-orange)"
            ref={(el) => (itemsRef.current[index] = el)}
          >
            {item.label}
          </Link>
        ))}
        <span className="alumni-nav-indicator" ref={indicatorRef}></span>
      </div>
    </div>
  );
};

export default NavBar;