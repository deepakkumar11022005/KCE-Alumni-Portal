import React, { useState } from 'react';
import './AdminEvent.css';
import { EventNav ,Carousel,EventForm} from '../../components';
 

const AdminEvent = () => {
  const [events, setEvents] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const handleAddEvent = (newEvent) => {
    setEvents([...events, newEvent]);
    setShowForm(false);
  };

  return (
    <div className="admin-event">
              
        <h1 className="admin-title">KCE Alumni Admin Dashboard</h1>
       
      <EventNav />
      <h2>Manage Events</h2>
      <button onClick={() => setShowForm(!showForm)} className="toggle-form-button">
        {showForm ? 'Hide Form' : 'Add New Event'}
      </button>
 
      {showForm && <EventForm onSubmit={handleAddEvent} />}
      {events.length > 0 ? (
        <>
          <h3>Event Preview (Carousel)</h3>
          <Carousel events={events} />
        </>
      ) : (
        <p>No events added yet.</p>
      )}
    </div>
  );
};

export default AdminEvent;
