import React, { useState } from 'react';
import './EventForm.css';

const EventForm = ({ onSubmit, initialEvent = {} }) => {
  const [event, setEvent] = useState(initialEvent);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvent(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(event);
  };

  return (
    <form onSubmit={handleSubmit} className="event-form">
      <input
        type="text"
        name="name"
        value={event.name || ''}
        onChange={handleChange}
        placeholder="Event Name"
        required
      />
      <textarea
        name="description"
        value={event.description || ''}
        onChange={handleChange}
        placeholder="Event Description"
        required
      />
      <input
        type="text"
        name="special"
        value={event.special || ''}
        onChange={handleChange}
        placeholder="Special Feature"
      />
      <input
        type="text"
        name="chiefGuest"
        value={event.chiefGuest || ''}
        onChange={handleChange}
        placeholder="Chief Guest Details"
      />
      <input
        type="text"
        name="sponsors"
        value={event.sponsors || ''}
        onChange={handleChange}
        placeholder="Sponsors"
      />
      <textarea
        name="summary"
        value={event.summary || ''}
        onChange={handleChange}
        placeholder="Event Summary"
      />
      <textarea
        name="agenda"
        value={event.agenda || ''}
        onChange={handleChange}
        placeholder="Event Agenda"
      />
      <button type="submit">Add Event</button>
    </form>
  );
};

export default EventForm;
