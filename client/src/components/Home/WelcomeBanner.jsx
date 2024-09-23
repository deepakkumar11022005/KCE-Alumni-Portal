import React from 'react';
import './WelcomeBanner.css';  
import alumini from '../../assets/images/alumini.gif';

const WelcomeBanner = () => {
  return (
    <div className="welcome-banner">
      <div className="welcome-content">
        <h2>Welcome to the KCE Alumni Network</h2>
        <h1>
          Connect with fellow alumni, share achievements, and access resources
          for career development and lifelong growth.
        </h1>
        <button className="discover-button">Discover More</button>
      </div>
      
    </div>
  );
};

export default WelcomeBanner;
