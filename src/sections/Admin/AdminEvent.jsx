import React, { useState, useEffect } from "react";
import "./AdminEvent.css";
import { EventNav, EventForm, UpcomingEvents, Loading, EventManager } from "../../components";
import { Upload, Plus } from "lucide-react";

const AdminEvent = () => {
  const [view, setView] = useState("eventUpdates"); // Manage views
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showForm, setShowForm] = useState(false);

  // Fetch event data from the API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(
          "https://alumni-apis.onrender.com/events?page=1&limit=20&sort=startDate&order=asc",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        setEvents(result.data || []); // Ensure data is always an array
      } catch (error) {
        setError("Failed to load upcoming events. Please try again later.");
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleAddEvent = (newEvent) => {
    setEvents([...events, newEvent]);
    setShowForm(false);
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

      {view === "eventUpdates" && (
        <>
          
          {loading ? (
            <Loading />
          ) : error ? (
            <p className="admin-error">{error}</p>
          ) : (
            <EventManager/>
           
          )}
        </>
      )}

      {view === "add" && <EventForm onSubmit={handleAddEvent} />}
    </div>
  );
};

export default AdminEvent;
