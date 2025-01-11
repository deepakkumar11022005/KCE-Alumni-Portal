import React, { useEffect, useRef } from 'react';
import './Navbar.css';
import { Link, useLocation } from 'react-router-dom';

const NavBar = () => {
  const indicatorRef = useRef(null);
  const itemsRef = useRef([]);
  const location = useLocation(); // Hook to get the current route

  useEffect(() => {
    const handleIndicator = (el) => {
      // Clear all other active items
      itemsRef.current.forEach((item) => {
        item.classList.remove('is-active');
        item.removeAttribute('style');
      });

      // Move the indicator and apply color
      indicatorRef.current.style.width = `${el.offsetWidth}px`;
      indicatorRef.current.style.left = `${el.offsetLeft}px`;
      indicatorRef.current.style.backgroundColor = el.getAttribute('active-color');
      el.classList.add('is-active');
      el.style.color = el.getAttribute('active-color');
    };

    // Find the active link based on the current URL
    const currentPath = location.pathname;

    const activeIndex = itemsRef.current.findIndex((item) => {
      return item.getAttribute('href') === currentPath;
    });

    if (activeIndex !== -1) {
      handleIndicator(itemsRef.current[activeIndex]);
    }
  }, [location]); // Re-run when the route changes

  return (
    <div className="alumni-navBack">
      <div className="alumni-nav">
        <Link
          to="/alumni"
          className="alumni-nav-item"
          active-color="var(--primary-orange)"
          ref={(el) => (itemsRef.current[0] = el)}
        >
          Home
        </Link>
        <Link
          to="/alumni/newsroom"
          className="alumni-nav-item"
          active-color="var(--primary-orange)"
          ref={(el) => (itemsRef.current[5] = el)}
        >
          Newsroom
        </Link>
        <Link
          to="/alumni/about-us"
          className="alumni-nav-item"
          active-color="var(--primary-orange)"
          ref={(el) => (itemsRef.current[1] = el)}
        >
          About Us
        </Link>
        <Link
          to="/alumni/alumni"
          className="alumni-nav-item"
          active-color="var(--primary-orange)"
          ref={(el) => (itemsRef.current[5] = el)}
        >
          Alumni
        </Link>
        <Link
          to="/alumni/events"
          className="alumni-nav-item"
          active-color="var(--primary-orange)"
          ref={(el) => (itemsRef.current[2] = el)}
        >
          Events
        </Link>
        <Link
          to="/alumni/gallery"
          className="alumni-nav-item"
          active-color="var(--primary-orange)"
          ref={(el) => (itemsRef.current[3] = el)}
        >
          Gallery
        </Link>
        <Link
          to="/alumni/contact-us"
          className="alumni-nav-item"
          active-color="var(--primary-orange)"
          ref={(el) => (itemsRef.current[4] = el)}
        >
          Contact Us
        </Link>

        <span className="alumni-nav-indicator" ref={indicatorRef}></span>
      </div>
    </div>
  );
};

export default NavBar;
