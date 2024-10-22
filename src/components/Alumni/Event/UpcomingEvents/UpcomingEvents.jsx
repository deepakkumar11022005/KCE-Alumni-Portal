// UpcomingEvents.jsx
import React, { useState } from "react";
import "./UpcomingEvents.css";

const EventCard = ({ event }) => {
  const eventDate = new Date(event.event_date);
  const month = eventDate.toLocaleString('default', { month: 'short' });
  const day = eventDate.getDate();

  return (
    <div className="event-card">
      <div className="event-date-badge">
        <span className="month">{month}</span>
        <span className="day">{day}</span>
      </div>
      <div className="event-details">
        <span className="event-status">UPCOMING</span>
        <h3 className="event-title">{event.title}</h3>
        <p className="event-location">{event.location}</p>
        <p className="event-time">{event.time}</p>
      </div>
    </div>
  );
};

const ArchiveSidebar = ({ events, onFilterChange, onClear }) => {
  const [openYear, setOpenYear] = useState(null);

  const eventsByYear = events.reduce((acc, event) => {
    const year = new Date(event.event_date).getFullYear();
    const month = new Date(event.event_date).toLocaleString('default', { month: 'long' });
    
    if (!acc[year]) {
      acc[year] = {};
    }
    if (!acc[year][month]) {
      acc[year][month] = 0;
    }
    acc[year][month] += 1;
    return acc;
  }, {});

  return (
    <div className="archive-sidebar">
      <div className="archive-header">
        <h3>Archive</h3>
        <button className="clear-button" onClick={onClear}>✕ Clear</button>
      </div>
      
      {Object.keys(eventsByYear).sort((a, b) => b - a).map((year) => (
        <div key={year} className="year-section">
          <h4 
            onClick={() => setOpenYear(openYear === year ? null : year)}
            className="year-header"
          >
            {year} <span>{openYear === year ? '▲' : '▼'}</span>
          </h4>
          
          {openYear === year && (
            <ul className="months-list">
              {Object.keys(eventsByYear[year]).map((month) => (
                <li 
                  key={month}
                  className="month-item"
                  onClick={() => onFilterChange(year, month)}
                >
                  {month} <span>({eventsByYear[year][month]})</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

const UpcomingEvents = ({ events }) => {
  const [filteredEvents, setFilteredEvents] = useState(events);

  const handleFilterChange = (selectedYear, selectedMonth) => {
    const filtered = events.filter((event) => {
      const eventDate = new Date(event.event_date);
      const eventYear = eventDate.getFullYear().toString();
      const eventMonth = eventDate.toLocaleString("default", { month: "long" });

      const yearMatch = selectedYear ? eventYear === selectedYear : true;
      const monthMatch = selectedMonth ? eventMonth === selectedMonth : true;

      return yearMatch && monthMatch;
    });

    setFilteredEvents(filtered);
  };

  return (
    <div className="upcoming-events-container">
      <div className="upcoming-events-content">
        <div className="events-section">
          <h2 className="section-title">Upcoming Events</h2>
          <div className="events-grid">
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event) => (
                <EventCard key={event._id} event={event} />
              ))
            ) : (
              <p className="no-events">No upcoming events available at the moment.</p>
            )}
          </div>
        </div>
        <ArchiveSidebar
          events={events}
          onFilterChange={handleFilterChange}
          onClear={() => setFilteredEvents(events)}
        />
      </div>
    </div>
  );
};

export default UpcomingEvents;