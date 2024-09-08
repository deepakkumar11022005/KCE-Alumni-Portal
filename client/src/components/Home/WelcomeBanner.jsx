import React from 'react';
import './WelcomeBanner.css';  
import alumini from '../../assets/images/alumini.gif'
const WelcomeBanner = () => {
  return (
    <div className="welcome-banner">
      <div className="welcome-content">
        <h2>We'd love for you to</h2>
        <h1>Connect with fellow alumni, share achievements, and access resources for career development and lifelong growth.</h1>
        <button className="discover-button">Discover</button>
      </div>
      <div className="banner-illustration">
        {/* Use an online image link */}
          <img 
            src={alumini}
            alt="Alumni Illustration" 
          />
      </div>
    </div>
  );
};

export default WelcomeBanner;
