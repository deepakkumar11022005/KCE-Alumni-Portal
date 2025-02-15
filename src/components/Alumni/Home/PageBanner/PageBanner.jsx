import React from 'react';
import './PageBanner.css'
const PageBanner = ({ imageUrl, title, subtitle }) => {
  return (
    <div className="page-banner-container">
      <div 
        className="page-banner-background" 
        style={{ backgroundImage: `url(${imageUrl})` }}
      >
        <div className="page-banner-overlay">
          <div className="page-banner-content">
            <h1 className="page-banner-title">{title}</h1>
            {subtitle && <p className="page-banner-subtitle">{subtitle}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageBanner;