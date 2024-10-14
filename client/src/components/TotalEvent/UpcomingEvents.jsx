import React from "react";
import "./UpcomingEvents.css";
import EventCard from "./EventCard";

const UpcomingEvents = ({ events }) => {
  return (
    <div className="upcoming-events-container">
      <div className="events-cards-container">
        {events && events.length > 0 ? (
          events.map((event) => (
            <EventCard key={event._id} event={event} />
          ))
        ) : (
          <p className='event-process' >No upcoming events available at the moment.</p>
        )}
      </div>
    </div>
  );
};

export default UpcomingEvents;
