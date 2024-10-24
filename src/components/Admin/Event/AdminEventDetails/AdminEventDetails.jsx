import React, { useState, useEffect } from "react";
import "./AdminEventDetails.css";

const AdminEventDetails = () => {
  const currentDate = new Date();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data from API
  useEffect(() => {
    fetch("https://alumni-apis.vercel.app/events?page=1&limit=100&sort=batch&order=desc")
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          const mappedEvents = data.data.map((event) => ({
            id: event._id,
            title: event.event_name,
            date: new Date(event.event_date).toISOString().slice(0, 10),
            venue: event.event_venue,
            description: event.event_details,
            specialGuest: event.event_guests.length
              ? {
                  name: event.event_guests[0].guest_name,
                  position: event.event_guests[0].guest_position,
                  eventFlow: event.event_guests[0].event_flow_description,
                }
              : { name: "TBA", position: "TBA", eventFlow: "" },
            sponsors: event.event_sponsers.length
              ? event.event_sponsers
              : ["No sponsors yet"],
            isEditing: false,
            // Store original data for reference
            originalData: event,
          }));
          setEvents(mappedEvents);
        }
      })
      .catch((error) => console.error("Error fetching data:", error))
      .finally(() => setLoading(false));
  }, []);

  const handleEditClick = (index) => {
    const updatedEvents = [...events];
    updatedEvents[index].isEditing = true;
    setEvents(updatedEvents);
  };

  const transformEventForAPI = (event) => {
    // Transform the frontend event object back to the API expected format
    return {
      _id: event.id,
      event_name: event.title,
      event_date: new Date(event.date).toISOString(),
      event_venue: event.venue,
      event_details: event.description,
      event_guests: [
        {
          guest_name: event.specialGuest.name,
          guest_position: event.specialGuest.position,
          event_flow_description: event.specialGuest.eventFlow,
        },
      ],
      event_sponsers: event.sponsors.filter(sponsor => sponsor !== "No sponsors yet"),
      // Preserve other fields from original data
      batch: event.originalData.batch,
      created_at: event.originalData.created_at,
      updated_at: event.originalData.updated_at,
    };
  };

  const handleSaveClick = async (index) => {
    const updatedEvents = [...events];
    const eventToUpdate = updatedEvents[index];
    
    // Transform the event data to match API expectations
    const apiEventData = transformEventForAPI(eventToUpdate);

    try {
      const response = await fetch(
        `https://alumni-apis.vercel.app/event/${eventToUpdate.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(apiEventData),
        }
      );

      if (response.ok) {
        const updatedEvent = await response.json();
        console.log("Event updated successfully:", updatedEvent);
        
        // Update the local state with the new data
        updatedEvents[index] = {
          ...eventToUpdate,
          isEditing: false,
          originalData: updatedEvent.data, // Store the new original data
        };
        setEvents(updatedEvents);
      } else {
        console.error("Failed to update the event:", response.statusText);
        handleCancelClick(index); // Revert to original state if update fails
      }
    } catch (error) {
      console.error("Error updating the event:", error);
      handleCancelClick(index); // Revert to original state if update fails
    }
  };

  const handleCancelClick = (index) => {
    const updatedEvents = [...events];
    // Reset to original data
    const originalEvent = updatedEvents[index].originalData;
    updatedEvents[index] = {
      id: originalEvent._id,
      title: originalEvent.event_name,
      date: new Date(originalEvent.event_date).toISOString().slice(0, 10),
      venue: originalEvent.event_venue,
      description: originalEvent.event_details,
      specialGuest: originalEvent.event_guests.length
        ? {
            name: originalEvent.event_guests[0].guest_name,
            position: originalEvent.event_guests[0].guest_position,
            eventFlow: originalEvent.event_guests[0].event_flow_description,
          }
        : { name: "TBA", position: "TBA", eventFlow: "" },
      sponsors: originalEvent.event_sponsers.length
        ? originalEvent.event_sponsers
        : ["No sponsors yet"],
      isEditing: false,
      originalData: originalEvent,
    };
    setEvents(updatedEvents);
  };

  const handleInputChange = (index, field, value) => {
    const updatedEvents = [...events];
    const event = updatedEvents[index];

    if (field.includes("specialGuest")) {
      const [, nestedField] = field.split(".");
      event.specialGuest[nestedField] = value;
    } else {
      event[field] = value;
    }

    setEvents(updatedEvents);
  };

  const upcomingEvents = events.filter(
    (event) => new Date(event.date) > currentDate
  );
  const finishedEvents = events.filter(
    (event) => new Date(event.date) <= currentDate
  );

  const renderEventBars = (eventList) => {
    return eventList.map((event, index) => (
      <div key={index} className="event-bar">
        {event.isEditing ? (
          <>
            <input
              type="text"
              value={event.title}
              onChange={(e) => handleInputChange(index, "title", e.target.value)}
              placeholder="Event Title"
            />
            <input
              type="date"
              value={event.date}
              onChange={(e) => handleInputChange(index, "date", e.target.value)}
              placeholder="Event Date"
            />
            <input
              type="text"
              value={event.venue}
              onChange={(e) => handleInputChange(index, "venue", e.target.value)}
              placeholder="Venue"
            />
            <textarea
              value={event.description}
              onChange={(e) => handleInputChange(index, "description", e.target.value)}
              placeholder="Event Description"
            />
            <input
              type="text"
              value={event.specialGuest.name}
              onChange={(e) => handleInputChange(index, "specialGuest.name", e.target.value)}
              placeholder="Guest Name"
            />
            <input
              type="text"
              value={event.specialGuest.position}
              onChange={(e) => handleInputChange(index, "specialGuest.position", e.target.value)}
              placeholder="Guest Position"
            />
            <textarea
              value={event.specialGuest.eventFlow}
              onChange={(e) => handleInputChange(index, "specialGuest.eventFlow", e.target.value)}
              placeholder="Event Flow"
            />
            <input
              type="text"
              value={event.sponsors.join(", ")}
              onChange={(e) => handleInputChange(index, "sponsors", e.target.value.split(", "))}
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
            <p>
              <strong>Guest:</strong> {event.specialGuest.name},{" "}
              {event.specialGuest.position}
            </p>
            <p><strong>Event Flow:</strong> {event.specialGuest.eventFlow}</p>
            <p><strong>Sponsors:</strong> {event.sponsors.join(", ")}</p>
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
      {loading ? (
        <p>Loading...</p>
      ) : upcomingEvents.length > 0 ? (
        renderEventBars(upcomingEvents)
      ) : (
        <p>No upcoming events.</p>
      )}

      <h2>Finished Events</h2>
      {loading ? (
        <p>Loading...</p>
      ) : finishedEvents.length > 0 ? (
        renderEventBars(finishedEvents)
      ) : (
        <p>No finished events.</p>
      )}
    </div>
  );
};

export default AdminEventDetails;