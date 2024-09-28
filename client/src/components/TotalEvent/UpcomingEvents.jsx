import React from "react";
import "./UpcomingEvents.css";
import EventCard from "./EventCard";

const UpcomingEvents = ({ events }) => {
  return (
    <div className="upcoming-events-container">
      {/* <h2>Upcoming Events</h2> */}
      <div className="events-cards-container">
        {events && events.length > 0 ? (
          events.map((event) => (
            <EventCard key={event._id} event={event} />
          ))
        ) : (
          <p>No upcoming events available at the moment.</p>
        )}
      </div>
    </div>
  );
};

export default UpcomingEvents;
