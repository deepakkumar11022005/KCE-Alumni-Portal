import React from 'react';
import './EventBackground.css';

const EventBackground = ({ imageUrl, children }) => {
  return (
    <div className="event-background">
      <img src={imageUrl} alt="Event Banner" />
      <div className="content">
        {children}
      </div>
    </div>
  );
};

export default EventBackground;
