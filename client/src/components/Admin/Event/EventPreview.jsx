import React from 'react';
import './EventPreview.css';

const EventPreview = ({ event }) => (
  <div className="event-preview">
    <h3>{event.name}</h3>
    <p>{event.description}</p>
    {event.special && <p><strong>Special Feature:</strong> {event.special}</p>}
    {event.chiefGuest && <p><strong>Chief Guest:</strong> {event.chiefGuest}</p>}
    {event.sponsors && <p><strong>Sponsors:</strong> {event.sponsors}</p>}
    {event.summary && <p><strong>Summary:</strong> {event.summary}</p>}
    {event.agenda && <p><strong>Agenda:</strong> {event.agenda}</p>}
  </div>
);

export default EventPreview;
