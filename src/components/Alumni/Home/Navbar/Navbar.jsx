import React, { useEffect, useRef } from 'react';
import './Navbar.css';

const NavBar = () => {
  const indicatorRef = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    const handleIndicator = (el) => {
      itemsRef.current.forEach((item) => {
        item.classList.remove('is-active');
        item.removeAttribute('style');
      });

      indicatorRef.current.style.width = `${el.offsetWidth}px`;
      indicatorRef.current.style.left = `${el.offsetLeft}px`;
      indicatorRef.current.style.backgroundColor = el.getAttribute('active-color');
      el.classList.add('is-active');
      el.style.color = el.getAttribute('active-color');
    };

    itemsRef.current.forEach((item) => {
      item.addEventListener('click', (e) => handleIndicator(e.target));
      if (item.classList.contains('is-active')) {
        handleIndicator(item);
      }
    });
  }, []);

  return (
    <div className='navBack'>
      <div className="nav">
        <a
          href="#"
          className="nav-item is-active"
          active-color="var(--primary-orange)"
          ref={(el) => (itemsRef.current[0] = el)}
        >
          Home
        </a>
        <a
          href="#"
          className="nav-item"
          active-color="var(--primary-orange)"
          ref={(el) => (itemsRef.current[1] = el)}
        >
          About Us
        </a>
        <a
          href="#"
          className="nav-item"
          active-color="var(--primary-orange)"
          ref={(el) => (itemsRef.current[2] = el)}
        >
          Alumni
        </a>
        <a
          href="#"
          className="nav-item"
          active-color="var(--primary-orange)"
          ref={(el) => (itemsRef.current[3] = el)}
        >
          Events
        </a>
        <a
          href="#"
          className="nav-item"
          active-color="var(--primary-orange)"
          ref={(el) => (itemsRef.current[4] = el)}
        >
          Gallery
        </a>
        <a
          href="#"
          className="nav-item"
          active-color="var(--primary-orange)"
          ref={(el) => (itemsRef.current[5] = el)}
        >
          Contact Us
        </a>
        <a
          href="#"
          className="nav-item"
          active-color="var(--primary-orange)"
          ref={(el) => (itemsRef.current[6] = el)}
        >
          Newsroom
        </a>
        <span className="nav-indicator" ref={indicatorRef}></span>
      </div>
    </div>
  );
};

export default NavBar;
