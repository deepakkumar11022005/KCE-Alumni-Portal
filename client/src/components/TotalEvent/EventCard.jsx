import React from 'react';
import { useNavigate } from 'react-router-dom';
import './EventCard.css';
import { Calendar, CheckCircle, HelpCircle } from 'lucide-react';

const EventCard = ({ event }) => {
  const navigate = useNavigate();

  const getStatusIcon = () => {
    if (!event.status) return <HelpCircle size={20} />;
    return event.status.toLowerCase() === 'upcoming' ? <Calendar size={20} /> : <CheckCircle size={16} />;
  };

  const getStatusClass = () => {
    if (!event.status) return 'unknown';
    return event.status.toLowerCase();
  };

  const handleViewMore = () => {
    navigate(`/alumni/event/${1}`); // Navigate to event details page
  };

  return (
    <div className="event-card">
      <div className="image-container">
        <img src={event.image || 'defaultImageUrl'} alt={event.eventName} />
        <div className={`status-indicator ${getStatusClass()}`}>
          {getStatusIcon()}
        </div>
      </div>
      <div className="event-content">
        <h3>{event.eventName || 'Unnamed Event'}</h3>
        <p className="event-summary">
          {event.eventDescription.substring(0, 100)}...
        </p>
        <button className="view-mor-btn" onClick={handleViewMore}>
          View More
        </button>
      </div>
    </div>
  );
};

export default EventCard;
