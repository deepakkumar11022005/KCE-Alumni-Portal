import React, { useState } from 'react';
import './EventCard.css';

const EventCard = ({ image, title, description }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`event-card ${hovered ? 'hovered' : ''}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="image-container">
        <img src={image} alt={title} />
      </div>
      <div className="event-content">
        <h3>{title}</h3>
        {hovered && (
          <div className="event-details">
            <p>{description}</p>
            <button className="book-now">View Details</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventCard;
