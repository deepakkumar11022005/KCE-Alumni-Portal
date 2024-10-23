import React from 'react';
import './EventBackground.css';

const EventBackground = ({ imageUrl, children }) => {
  return (
    <div className="event-background">
      <img src={imageUrl} alt="Event Banner" />
      <div className="content">
        <h1>Welcome to the Event</h1>
        <p>Join us for an unforgettable experience!</p>
        {children}
      </div>
    </div>
  );
};

export default EventBackground;
  