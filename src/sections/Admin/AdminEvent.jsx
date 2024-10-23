import React, { useState } from 'react';
import './AdminEvent.css';
import { EventNav, Carousel, EventForm, SliderPreview, AdminEventDetails } from '../../components';
import { Users, Upload, Plus } from 'lucide-react';

const AdminEvent = () => {
  const [view, setView] = useState("carousel"); // Manage views
  const [events, setEvents] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const handleAddEvent = (newEvent) => {
    setEvents([...events, newEvent]);
    setShowForm(false);
  };

  const handleSaveEvent = (index, updatedEvent) => {
    const updatedEvents = [...events];
    updatedEvents[index] = updatedEvent;
    setEvents(updatedEvents);
  };

  const handleViewChange = (newView) => {
    setView(newView);
    setShowForm(false);
  };

  return (
    <div className="admin-event">
      <h1 className="admin-title">KCE Alumni Admin Dashboard</h1>
      
      <EventNav />
      <h2>Manage Events</h2>
      <div className="action-buttons">
        <button
          className={`action-button ${view === "carousel" ? "active" : ""}`}
          onClick={() => handleViewChange("carousel")}
        >
          <Users size={20} />
          Carousel Events
        </button>
        <button
          className={`action-button ${view === "eventUpdates" ? "active" : ""}`}
          onClick={() => handleViewChange("eventUpdates")}
        >
          <Upload size={20} />
          Event Updates
        </button>
        <button
          className={`action-button ${view === "add" ? "active" : ""}`}
          onClick={() => handleViewChange("add")}
        >
          <Plus size={20} />
          Add New Event
        </button>
      </div>

      {view === "carousel" && (
        <>
        
          <h5>Current Carousel Preview</h5>
          <Carousel/>
          <h5>Current Carousel Details</h5>
          <SliderPreview onSave={handleSaveEvent} />
        </>
      )}

      {view === "eventUpdates" && (
        <>
          
         
          {/* Add logic to display updates or past events */}
           <AdminEventDetails/>
          
        </>
      )}

      {view === "add" && (
        <>
        <EventForm onSubmit={handleAddEvent} />
          {/* <button
            onClick={() => setShowForm(!showForm)}
            className="toggle-form-button"
          >
            {showForm ? 'Hide Form' : 'Add New Event'}
          </button>
          {showForm && <EventForm onSubmit={handleAddEvent} />} */}
        </>
      )}

      {events.length > 0 && view === "carousel" && (
        <>
          <h3>Event Preview (Carousel)</h3>
          <Carousel events={events} />
        </>
      )}
    </div>
  );
};

export default AdminEvent;
