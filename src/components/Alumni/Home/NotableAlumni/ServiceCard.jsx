// src/components/AlumniTestimonialCard.js
import React from 'react';
import './ServiceCard.css'; // Import the specific CSS styles

const AlumniTestimonialCard = ({ imgURL, name, batch, company, domain, isActive }) => {
  return (
    <div className={`alumni-cards ${isActive ? 'active' : ''}`}>
      <div className="image-container">
        <img src={imgURL} alt={name} className="alumni-image" />
      </div>
      <h3 className="alumni-namee">{name}</h3>
      <p className="alumni-info">{batch} | {company} </p>
    </div>
  );
};

export default AlumniTestimonialCard;
