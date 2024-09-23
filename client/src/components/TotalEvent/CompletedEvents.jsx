import React from "react";
import "./UpcomingEvents.css"; // Corresponding CSS for styling
import EventCard from "./EventCard"; // Ensure EventCard is imported correctly

const CompletedEvents = ({ events }) => {
  
  return (
    <div className="upcoming-events-container">
      <h2 className="upcoming-events-title">Completed Events</h2>
      <div className="events-cards-container">
        {events.map((event, index) => (
          <EventCard 
            key={index} // Ensure a unique key is added
            image={event.image} 
            title={event.title} 
            description={event.description}
          />
        ))}
      </div>
    </div>
  );
};

export default CompletedEvents;
