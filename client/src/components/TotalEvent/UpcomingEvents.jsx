import React from "react";
import "./UpcomingEvents.css";
import EventCard from "./EventCard";

const UpcomingEvents = ({ events }) => {
  return (
    <div className="upcoming-events-container">
      <div className="events-cards-container">
        {events.map((event, index) => (
          <EventCard
            key={index}
            event={event} // Pass the entire event object
          />
        ))}
      </div>
    </div>
  );
};

export default UpcomingEvents;
