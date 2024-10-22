import React from 'react';
import { useNavigate } from 'react-router-dom';
import './EventCard.css';
import { Calendar, CheckCircle, HelpCircle } from 'lucide-react';

const EventCard = ({ event }) => {
  const navigate = useNavigate();
  const defaultImageUrl = 'https://ca-times.brightspotcdn.com/dims4/default/1b70a40/2147483647/strip/true/crop/1024x500+0+0/resize/1200x586!/quality/75/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2Fdb%2F41%2F492145d642d9a3e01a57421cee11%2Fconciertos-1589446877-1024x500.jpg';

  const getStatus = () => {
    const eventDate = new Date(event.event_date);
    const currentDate = new Date();

    if (eventDate > currentDate) return 'upcoming';
    if (eventDate.toDateString() === currentDate.toDateString()) return 'ongoing';
    return 'past';
  };

  const getStatusIcon = () => {
    switch (getStatus()) {
      case 'upcoming':
        return <Calendar size={20} />;
      case 'ongoing':
        return <CheckCircle size={16} />;
      case 'past':
      default:
        return <HelpCircle size={20} />;
    }
  };

  const handleViewMore = () => {
    navigate(`/alumni/event/${event._id}`);
  };

  return (
    <div className="event-card">
      <div className="image-container">
        <img src={event.image || defaultImageUrl} alt={event.event_name || 'Event Image'} />
        <div className={`status-indicator ${getStatus()}`}>
          {getStatusIcon()}
        </div>
      </div>
      <div className="event-content">
        <h3>{event.event_name || 'Unnamed Event'}</h3>
        <p className="event-summary">
          {event.event_details.substring(0, 100)}...
        </p>
        <div className="view-more-container">
          <button className="view-mor-btn" onClick={handleViewMore}>
            View More
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
