import React from 'react';
import './AdminEventDetails.css';

const AdminEventDetails = () => {
  const currentDate = new Date();

  const events = [
    {
      title: "Tech Innovators Summit 2024",
      date: "2024-09-25",
      venue: "Grand Hall, City Conference Center",
      description: "A summit to explore the latest innovations in technology and meet industry leaders.",
      specialGuest: { name: "Dr. John Doe", position: "Vice Chancellor, University of XYZ" },
      eventFlow: "The guest will be inaugurating the event, followed by a keynote speech on innovation in technology.",
      sponsors: ["KIC", "Karpagam Institutions", "Red Chilli", "Cloud Travel"]
    },
    {
      title: "AI & Machine Learning Expo",
      date: "2023-05-10",
      venue: "Tech Expo Center",
      description: "An expo showcasing the latest advancements in AI and Machine Learning.",
      specialGuest: { name: "Dr. Jane Smith", position: "CEO, AI Innovations Inc." },
      eventFlow: "The guest will be delivering a keynote on AI trends.",
      sponsors: ["TechCorp", "InnoBots"]
    }
  ];
  // Filter events into upcoming and finished based on the event date
  const upcomingEvents = events.filter(event => new Date(event.date) > currentDate);
  const finishedEvents = events.filter(event => new Date(event.date) <= currentDate);

  return (
    <div className="event-details">
      

      <h2>Upcoming Events</h2>
      {upcomingEvents.length > 0 ? (
        <div className="event-section">
          {upcomingEvents.map((event, index) => (
            <div key={index} className="event-card">
              <h3>{event.title}</h3>
              <p><strong>Date:</strong> {event.date}</p>
              <p><strong>Venue:</strong> {event.venue}</p>
              <p><strong>Description:</strong> {event.description}</p>
              <p><strong>Guest:</strong> {event.specialGuest.name}, {event.specialGuest.position}</p>
              <p><strong>Event Flow:</strong> {event.eventFlow}</p>
              <p><strong>Sponsors:</strong> {event.sponsors.join(', ')}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No upcoming events.</p>
      )}

      <h2>Finished Events</h2>
      {finishedEvents.length > 0 ? (
        <div className="event-section">
          {finishedEvents.map((event, index) => (
            <div key={index} className="event-card">
              <h3>{event.title}</h3>
              <p><strong>Date:</strong> {event.date}</p>
              <p><strong>Venue:</strong> {event.venue}</p>
              <p><strong>Description:</strong> {event.description}</p>
              <p><strong>Guest:</strong> {event.specialGuest.name}, {event.specialGuest.position}</p>
              <p><strong>Event Flow:</strong> {event.eventFlow}</p>
              <p><strong>Sponsors:</strong> {event.sponsors.join(', ')}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No finished events.</p>
      )}
    </div>
  );
};

export default AdminEventDetails;
