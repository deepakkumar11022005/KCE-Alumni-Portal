import React from 'react';
// import './Testimonials.css'; 
const Testimonials = ({ image, quote, name, designation }) => {
  return (
    <div className="testimonial-container">
      <div className="testimonial-image">
        <img src={image} alt={`${name}'s photo`} />
      </div>
      <div className="testimonial-content">
        <p className="testimonial-quote">{quote}</p>
        <p className="testimonial-name">
          <strong>{name}</strong>, <span className="testimonial-designation">{designation}</span>
        </p>
      </div>
    </div>
  );
};

export default Testimonials;
