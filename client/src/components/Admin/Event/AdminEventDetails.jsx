import React, { useState } from 'react';
import './AdminEventDetails.css';

const AdminEventDetails = () => {
  const currentDate = new Date();

  const [events, setEvents] = useState([
    {
      title: "Tech Innovators Summit 2024",
      date: "2024-09-25",
      venue: "Grand Hall, City Conference Center",
      description: "A summit to explore the latest innovations in technology and meet industry leaders.",
      specialGuest: { name: "Dr. John Doe", position: "Vice Chancellor, University of XYZ" },
      eventFlow: "The guest will be inaugurating the event, followed by a keynote speech on innovation in technology.",
      sponsors: ["KIC", "Karpagam Institutions", "Red Chilli", "Cloud Travel"],
      isEditing: false
    },
    {
      title: "AI & Machine Learning Expo",
      date: "2023-05-10",
      venue: "Tech Expo Center",
      description: "An expo showcasing the latest advancements in AI and Machine Learning.",
      specialGuest: { name: "Dr. Jane Smith", position: "CEO, AI Innovations Inc." },
      eventFlow: "The guest will be delivering a keynote on AI trends.",
      sponsors: ["TechCorp", "InnoBots"],
      isEditing: false
    }
  ]);

  const handleEditClick = (index) => {
    const updatedEvents = [...events];
    updatedEvents[index].isEditing = true;
    setEvents(updatedEvents);
  };

  const handleSaveClick = (index) => {
    const updatedEvents = [...events];
    updatedEvents[index].isEditing = false;
    setEvents(updatedEvents);
  };

  const handleCancelClick = (index) => {
    const updatedEvents = [...events];
    updatedEvents[index].isEditing = false;
    setEvents(updatedEvents); // Reset the edit mode without changes
  };

  const handleInputChange = (index, field, value) => {
    const updatedEvents = [...events];
    if (field.includes('specialGuest')) {
      const [guestField] = field.split('.');
      updatedEvents[index].specialGuest[guestField] = value;
    } else {
      updatedEvents[index][field] = value;
    }
    setEvents(updatedEvents);
  };

  const upcomingEvents = events.filter(event => new Date(event.date) > currentDate);
  const finishedEvents = events.filter(event => new Date(event.date) <= currentDate);

  const renderEventBars = (eventList) => {
    return eventList.map((event, index) => (
      <div key={index} className="event-bar">
        {event.isEditing ? (
          <>
            <input
              type="text"
              value={event.title}
              onChange={(e) => handleInputChange(index, 'title', e.target.value)}
              placeholder="Event Title"
            />
            <input
              type="date"
              value={event.date}
              onChange={(e) => handleInputChange(index, 'date', e.target.value)}
              placeholder="Event Date"
            />
            <input
              type="text"
              value={event.venue}
              onChange={(e) => handleInputChange(index, 'venue', e.target.value)}
              placeholder="Venue"
            />
            <textarea
              value={event.description}
              onChange={(e) => handleInputChange(index, 'description', e.target.value)}
              placeholder="Event Description"
            />
            <input
              type="text"
              value={event.specialGuest.name}
              onChange={(e) => handleInputChange(index, 'specialGuest.name', e.target.value)}
              placeholder="Guest Name"
            />
            <input
              type="text"
              value={event.specialGuest.position}
              onChange={(e) => handleInputChange(index, 'specialGuest.position', e.target.value)}
              placeholder="Guest Position"
            />
            <textarea
              value={event.eventFlow}
              onChange={(e) => handleInputChange(index, 'eventFlow', e.target.value)}
              placeholder="Event Flow"
            />
            <input
              type="text"
              value={event.sponsors.join(', ')}
              onChange={(e) => handleInputChange(index, 'sponsors', e.target.value.split(', '))}
              placeholder="Sponsors (comma-separated)"
            />
            <button className="save-btn" onClick={() => handleSaveClick(index)}>
              Save
            </button>
            <button className="cancel-btn" onClick={() => handleCancelClick(index)}>
              Cancel
            </button>
          </>
        ) : (
          <>
            <h3>{event.title}</h3>
            <p><strong>Date:</strong> {event.date}</p>
            <p><strong>Venue:</strong> {event.venue}</p>
            <p><strong>Description:</strong> {event.description}</p>
            <p><strong>Guest:</strong> {event.specialGuest.name}, {event.specialGuest.position}</p>
            <p><strong>Event Flow:</strong> {event.eventFlow}</p>
            <p><strong>Sponsors:</strong> {event.sponsors.join(', ')}</p>
            <button className="edit-btn" onClick={() => handleEditClick(index)}>
              Edit
            </button>
          </>
        )}
      </div>
    ));
  };

  return (
    <div className="event-detailsss">
      <h5>Upcoming Events</h5>
      {upcomingEvents.length > 0 ? renderEventBars(upcomingEvents) : <p>No upcoming events.</p>}

      <h2>Finished Events</h2>
      {finishedEvents.length > 0 ? renderEventBars(finishedEvents) : <p>No finished events.</p>}
    </div>
  );
};

export default AdminEventDetails;
