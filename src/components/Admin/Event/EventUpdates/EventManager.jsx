import React, { useState, useEffect } from 'react';
import { Trash2, PlusCircle } from 'lucide-react';
import './EventManager.css'
const EventManager = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [eventDetails, setEventDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    filterEvents();
  }, [events, searchInput]);

  useEffect(() => {
    if (selectedEventId) {
      fetchEventDetails(selectedEventId);
    }
  }, [selectedEventId]);

  const fetchEvents = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('https://alumni-apis.onrender.com/events?page=1&limit=500');
      const data = await response.json();
      if (data.success) {
        setEvents(data.data);
        setFilteredEvents(data.data);
      } else {
        throw new Error('Failed to fetch events');
      }
    } catch (err) {
      setError('Failed to load events. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const filterEvents = () => {
    const filtered = events.filter(event =>
      event.event_name.toLowerCase().includes(searchInput.toLowerCase()) ||
      event.event_venue?.toLowerCase().includes(searchInput.toLowerCase()) ||
      event.event_details?.toLowerCase().includes(searchInput.toLowerCase())
    );
    setFilteredEvents(filtered);
  };

  const fetchEventDetails = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(`https://alumni-apis.onrender.com/event/${id}`);
      const data = await response.json();
      if (data.success) {
        setEventDetails(data.data);
        setError('');
      } else {
        throw new Error('Failed to fetch event details');
      }
    } catch (err) {
      setError('Failed to load event details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateEvent = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://alumni-apis.onrender.com/event/${selectedEventId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(eventDetails)
      });
      const data = await response.json();
      if (data.success) {
        setSuccess('Event updated successfully!');
        setTimeout(() => setSuccess(''), 3000);
        await fetchEvents();
      } else {
        throw new Error('Failed to update event');
      }
    } catch (err) {
      setError('Failed to update event. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGuestUpdate = (index, field, value) => {
    const updatedGuests = [...(eventDetails.event_guests || [])];
    updatedGuests[index] = { ...updatedGuests[index], [field]: value };
    setEventDetails({ ...eventDetails, event_guests: updatedGuests });
  };

  const addGuest = () => {
    const newGuest = {
      guest_name: '',
      guest_position: '',
      event_flow_description: '',
      _id: Date.now().toString()
    };
    setEventDetails({
      ...eventDetails,
      event_guests: [...(eventDetails.event_guests || []), newGuest]
    });
  };

  const removeGuest = (index) => {
    const updatedGuests = eventDetails.event_guests.filter((_, i) => i !== index);
    setEventDetails({ ...eventDetails, event_guests: updatedGuests });
  };

  const handleSpecialGuestUpdate = (index, field, value) => {
    const updatedGuests = [...(eventDetails.special_guests || [])];
    updatedGuests[index] = { ...updatedGuests[index], [field]: value };
    setEventDetails({ ...eventDetails, special_guests: updatedGuests });
  };

  const addSpecialGuest = () => {
    const newGuest = {
      guest_name: '',
      guest_position: '',
      event_flow_description: '',
      _id: Date.now().toString()
    };
    setEventDetails({
      ...eventDetails,
      special_guests: [...(eventDetails.special_guests || []), newGuest]
    });
  };

  const removeSpecialGuest = (index) => {
    const updatedGuests = eventDetails.special_guests.filter((_, i) => i !== index);
    setEventDetails({ ...eventDetails, special_guests: updatedGuests });
  };

  return (
    <div className="admin-event-updates-container">
      {error && (
        <div className="admin-event-updates-alert admin-event-updates-alert-error">
          <span className="admin-event-updates-alert-icon">⚠</span>
          {error}
        </div>
      )}
      
      {success && (
        <div className="admin-event-updates-alert admin-event-updates-alert-success">
          <span className="admin-event-updates-alert-icon">✓</span>
          {success}
        </div>
      )}

      <div className="admin-event-updates-search">
        <input
          type="text"
          className="admin-event-updates-input"
          placeholder="Search events..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </div>

      <div className="admin-event-updates-grid">
        <div className="admin-event-updates-list">
          <h2 className="admin-event-updates-section-title">
            Events ({filteredEvents.length})
          </h2>
          <div className="admin-event-updates-items">
            {filteredEvents.map(event => (
              <button
                key={event._id}
                onClick={() => setSelectedEventId(event._id)}
                className={`admin-event-updates-item ${
                  selectedEventId === event._id ? 'admin-event-updates-item-selected' : ''
                }`}
              >
                <h3 className="admin-event-updates-item-title">{event.event_name}</h3>
                <p className="admin-event-updates-item-date">
                  {new Date(event.event_date).toLocaleDateString()} | {event.event_time}
                </p>
              </button>
            ))}
          </div>
        </div>

        <div className="admin-event-updates-details">
          <h2 className="admin-event-updates-section-title">Event Details</h2>
          {loading ? (
            <div className="admin-event-updates-loading">Loading...</div>
          ) : eventDetails ? (
            <div className="admin-event-updates-form">
              <div className="admin-event-updates-form-group">
                <label className="admin-event-updates-label">Event Name</label>
                <input
                  className="admin-event-updates-input"
                  type="text"
                  value={eventDetails.event_name || ''}
                  onChange={e => setEventDetails({...eventDetails, event_name: e.target.value})}
                />
              </div>

              <div className="admin-event-updates-form-group">
                <label className="admin-event-updates-label">Event Details</label>
                <textarea
                  className="admin-event-updates-textarea"
                  value={eventDetails.event_details || ''}
                  onChange={e => setEventDetails({...eventDetails, event_details: e.target.value})}
                />
              </div>

              <div className="admin-event-updates-form-group">
                <label className="admin-event-updates-label">Event Summary</label>
                <textarea
                  className="admin-event-updates-textarea"
                  value={eventDetails.event_summary || ''}
                  onChange={e => setEventDetails({...eventDetails, event_summary: e.target.value})}
                />
              </div>

              <div className="admin-event-updates-form-group">
                <label className="admin-event-updates-label">Event Venue</label>
                <input
                  className="admin-event-updates-input"
                  type="text"
                  value={eventDetails.event_venue || ''}
                  onChange={e => setEventDetails({...eventDetails, event_venue: e.target.value})}
                />
              </div>

              <div className="admin-event-updates-form-group">
                <label className="admin-event-updates-label">Event Date</label>
                <input
                  className="admin-event-updates-input"
                  type="date"
                  value={eventDetails.event_date?.split('T')[0] || ''}
                  onChange={e => setEventDetails({...eventDetails, event_date: e.target.value})}
                />
              </div>

              <div className="admin-event-updates-form-group">
                <label className="admin-event-updates-label">Event Time</label>
                <input
                  className="admin-event-updates-input"
                  type="time"
                  value={eventDetails.event_time?.replace(/\s*(AM|PM)$/i, '') || ''}
                  onChange={e => setEventDetails({...eventDetails, event_time: e.target.value})}
                />
              </div>

              <div className="admin-event-updates-section">
                <h3 className="admin-event-updates-subtitle">Event Guests</h3>
                {eventDetails.event_guests?.map((guest, index) => (
                  <div key={guest._id} className="admin-event-updates-guest-form">
                    <div className="admin-event-updates-form-group">
                      <label className="admin-event-updates-label">Guest Name</label>
                      <input
                        className="admin-event-updates-input"
                        type="text"
                        value={guest.guest_name || ''}
                        onChange={e => handleGuestUpdate(index, 'guest_name', e.target.value)}
                      />
                    </div>
                    <div className="admin-event-updates-form-group">
                      <label className="admin-event-updates-label">Guest Position</label>
                      <input
                        className="admin-event-updates-input"
                        type="text"
                        value={guest.guest_position || ''}
                        onChange={e => handleGuestUpdate(index, 'guest_position', e.target.value)}
                      />
                    </div>
                    <div className="admin-event-updates-form-group">
                      <label className="admin-event-updates-label">Flow Description</label>
                      <textarea
                        className="admin-event-updates-textarea"
                        value={guest.event_flow_description || ''}
                        onChange={e => handleGuestUpdate(index, 'event_flow_description', e.target.value)}
                      />
                    </div>
                    <button
                      className="admin-event-updates-button-remove"
                      onClick={() => removeGuest(index)}
                    >
                      <Trash2 size={16} style={{ marginRight: '8px', display: 'inline' }} />
                      Remove Guest
                    </button>
                  </div>
                ))}
                <button className="admin-event-updates-button-add" onClick={addGuest}>
                  <PlusCircle size={16} style={{ marginRight: '8px', display: 'inline' }} />
                  Add Guest
                </button>
              </div>

              <div className="admin-event-updates-section">
                <h3 className="admin-event-updates-subtitle">Special Guests</h3>
                {eventDetails.special_guests?.map((guest, index) => (
                  <div key={guest._id} className="admin-event-updates-guest-form">
                    <div className="admin-event-updates-form-group">
                      <label className="admin-event-updates-label">Guest Name</label>
                      <input
                        className="admin-event-updates-input"
                        type="text"
                        value={guest.guest_name || ''}
                        onChange={e => handleSpecialGuestUpdate(index, 'guest_name', e.target.value)}
                      />
                    </div>
                    <div className="admin-event-updates-form-group">
                      <label className="admin-event-updates-label">Guest Position</label>
                      <input
                        className="admin-event-updates-input"
                        type="text"
                        value={guest.guest_position || ''}
                        onChange={e => handleSpecialGuestUpdate(index, 'guest_position', e.target.value)}
                      />
                    </div>
                    <div className="admin-event-updates-form-group">
                      <label className="admin-event-updates-label">Flow Description</label>
                      <textarea
                        className="admin-event-updates-textarea"
                        value={guest.event_flow_description || ''}
                        onChange={e => handleSpecialGuestUpdate(index, 'event_flow_description', e.target.value)}
                      />
                    </div>
                    <button
                      className="admin-event-updates-button-remove"
                      onClick={() => removeSpecialGuest(index)}
                    >
                      <Trash2 size={16} style={{ marginRight: '8px', display: 'inline' }} />
                      Remove Special Guest
                    </button>
                  </div>
                ))}
                <button className="admin-event-updates-button-add" onClick={addSpecialGuest}>
                  <PlusCircle size={16} style={{ marginRight: '8px', display: 'inline' }} />
                  Add Special Guest
                </button>
              </div>

              <button 
                className="admin-event-updates-button"
                onClick={handleUpdateEvent}
                disabled={loading}
              >
                {loading ? 'Updating...' : 'Update Event'}
              </button>
            </div>
          ) : (
            <div className="admin-event-updates-no-selection">
              Select an event to view details
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventManager;