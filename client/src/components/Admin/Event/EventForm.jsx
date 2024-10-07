import React, { useState } from "react";
import "./EventForm.css";

const EventForm = ({ onSave }) => {
  const [formData, setFormData] = useState({
    event_name: "",
    event_details: "",
    event_venue: "",
    event_date: "",
    event_time: "",
    event_guests: [
      {
        guest_name: "",
        guest_position: "",
        event_flow_description: "",
        guest_image: null,
        special_guest: false,
      },
    ],
    special_guests: [],
    event_sponsers: [{ sponser_name: "", sponser_image: null }],
    event_summary: "",
    event_image: null,
  });

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleGuestChange = (index, e) => {
    const { name, type, checked, value, files } = e.target;
    
    setFormData((prevData) => {
      const updatedGuests = [...prevData.event_guests];
      const currentGuest = { ...updatedGuests[index] };

      if (type === "checkbox" && name === "special_guest") {
        // Handle special guest checkbox
        currentGuest.special_guest = checked;
        updatedGuests[index] = currentGuest;

        let updatedSpecialGuests = [...prevData.special_guests];

        if (checked) {
          // Add to special guests when checkbox is checked
          updatedSpecialGuests.push({
            guest_name: currentGuest.guest_name,
            guest_position: currentGuest.guest_position,
            event_flow_description: currentGuest.event_flow_description
          });
        } else {
          // Remove from special guests when checkbox is unchecked
          updatedSpecialGuests = updatedSpecialGuests.filter(
            (guest) => guest.guest_name !== currentGuest.guest_name
          );
        }

        return {
          ...prevData,
          event_guests: updatedGuests,
          special_guests: updatedSpecialGuests
        };
      } else {
        // Handle other input changes
        if (type === "file") {
          currentGuest[name] = files[0];
        } else {
          currentGuest[name] = value;
        }
        updatedGuests[index] = currentGuest;

        // If this guest is marked as special, update special_guests array too
        if (currentGuest.special_guest) {
          const updatedSpecialGuests = [...prevData.special_guests];
          const specialGuestIndex = updatedSpecialGuests.findIndex(
            (guest) => guest.guest_name === currentGuest.guest_name ||
                      (name === "guest_name" && guest.guest_position === currentGuest.guest_position)
          );

          if (specialGuestIndex !== -1) {
            updatedSpecialGuests[specialGuestIndex] = {
              guest_name: currentGuest.guest_name,
              guest_position: currentGuest.guest_position,
              event_flow_description: currentGuest.event_flow_description
            };
          }

          return {
            ...prevData,
            event_guests: updatedGuests,
            special_guests: updatedSpecialGuests
          };
        }

        return {
          ...prevData,
          event_guests: updatedGuests
        };
      }
    });
  };

  const addGuest = () => {
    setFormData((prevData) => ({
      ...prevData,
      event_guests: [
        ...prevData.event_guests,
        {
          guest_name: "",
          guest_position: "",
          event_flow_description: "",
          guest_image: null,
          special_guest: false,
        },
      ],
    }));
  };

  const removeGuest = (index) => {
    setFormData((prevData) => {
      const guestToRemove = prevData.event_guests[index];
      const updatedGuests = prevData.event_guests.filter((_, i) => i !== index);
      
      // If removing a special guest, remove from special_guests array too
      let updatedSpecialGuests = [...prevData.special_guests];
      if (guestToRemove.special_guest) {
        updatedSpecialGuests = updatedSpecialGuests.filter(
          (guest) => guest.guest_name !== guestToRemove.guest_name
        );
      }

      return {
        ...prevData,
        event_guests: updatedGuests,
        special_guests: updatedSpecialGuests
      };
    });
  };

  const handleSponsorChange = (index, e) => {
    const { name, type, value, files } = e.target;
    const updatedSponsors = [...formData.event_sponsers];

    if (type === "file") {
      updatedSponsors[index][name] = files[0];
    } else {
      updatedSponsors[index][name] = value;
    }

    setFormData((prevData) => ({
      ...prevData,
      event_sponsers: updatedSponsors,
    }));
  };

  const addSponsor = () => {
    setFormData((prevData) => ({
      ...prevData,
      event_sponsers: [
        ...prevData.event_sponsers,
        { sponser_name: "", sponser_image: null },
      ],
    }));
  };

  const removeSponsor = (index) => {
    const updatedSponsors = formData.event_sponsers.filter((_, i) => i !== index);
    setFormData((prevData) => ({
      ...prevData,
      event_sponsers: updatedSponsors,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Prepare the request body
      const requestBody = {
        event_name: formData.event_name,
        event_details: formData.event_details,
        event_venue: formData.event_venue,
        event_date: new Date(formData.event_date).toISOString(),
        event_time: formData.event_time,
        special_guests: formData.special_guests,
        event_guests: formData.event_guests
          .filter(guest => !guest.special_guest)
          .map(guest => ({
            guest_name: guest.guest_name,
            guest_position: guest.guest_position,
            event_flow_description: guest.event_flow_description
          })),
        event_sponsers: formData.event_sponsers.map(sponsor => ({
          sponser_name: sponsor.sponser_name
        })),
        event_summary: formData.event_summary
      };
  console.log(requestBody);
  
      const response = await fetch('https://alumni-apis.vercel.app/event', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Event created successfully:', data);
      onSave(data);
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  return (
    <form className="event-form" onSubmit={handleSubmit}>
      <h4>Event Form</h4>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="event_name" className="event-label">Event Name</label>
          <input
            id="event_name"
            type="text"
            name="event_name"
            value={formData.event_name}
            onChange={handleInputChange}
            className="input-field"
          />
        </div>
        <div className="form-group">
          <label htmlFor="event_image" className="image-upload-label">Upload Event Image</label>
          <input
            id="event_image"
            type="file"
            name="event_image"
            onChange={handleInputChange}
            className="input-field"
          />
          {formData.event_image && (
            <span className="file-name">{formData.event_image.name}</span>
          )}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="event_venue" className="event-label">Event Venue</label>
          <input
            id="event_venue"
            type="text"
            name="event_venue"
            value={formData.event_venue}
            onChange={handleInputChange}
            className="input-field"
          />
        </div>
        <div className="form-group">
          <label htmlFor="event_date" className="event-label">Event Date</label>
          <input
            id="event_date"
            type="date"
            name="event_date"
            value={formData.event_date}
            onChange={handleInputChange}
            className="input-field"
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="event_time" className="event-label">Event Time</label>
          <input
            id="event_time"
            type="time"
            name="event_time"
            value={formData.event_time}
            onChange={handleInputChange}
            className="input-field"
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="event_details" className="event-label">Event Details</label>
        <textarea
          id="event_details"
          name="event_details"
          value={formData.event_details}
          onChange={handleInputChange}
          className="textarea-field"
        />
      </div>

      <h4>Event Guests</h4>
      {formData.event_guests.map((guest, index) => (
        <div key={index} className="guest-form">
          <div className="form-group-checkbox">
            <label htmlFor={`special_guest_${index}`} className="event-label">Special Guest</label>
            <input
              id={`special_guest_${index}`}
              type="checkbox"
              name="special_guest"
              checked={guest.special_guest}
              onChange={(e) => handleGuestChange(index, e)}
              className="checkbox-field"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor={`guest_name_${index}`} className="event-label">Guest Name</label>
              <input
                id={`guest_name_${index}`}
                type="text"
                name="guest_name"
                value={guest.guest_name}
                onChange={(e) => handleGuestChange(index, e)}
                className="input-field"
              />
            </div>
            <div className="form-group">
              <label htmlFor={`guest_position_${index}`} className="event-label">Guest Position</label>
              <input
                id={`guest_position_${index}`}
                type="text"
                name="guest_position"
                value={guest.guest_position}
                onChange={(e) => handleGuestChange(index, e)}
                className="input-field"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor={`guest_image_${index}`} className="image-upload-label">Upload Guest Image</label>
              <input
                id={`guest_image_${index}`}
                type="file"
                name="guest_image"
                onChange={(e) => handleGuestChange(index, e)}
                className="input-field"
              />
              {guest.guest_image && (
                <span className="file-name">{guest.guest_image.name}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor={`event_flow_description_${index}`} className="event-label">Event Flow Description</label>
              <input
                id={`event_flow_description_${index}`}
                type="text"
                name="event_flow_description"
                value={guest.event_flow_description}
                onChange={(e) => handleGuestChange(index, e)}
                className="input-field"
              />
            </div>
          </div>

          <button
            type="button"
            onClick={() => removeGuest(index)}
            className="remove-button"
          >
            Remove Guest
          </button>
        </div>
      ))}
      <button type="button" onClick={addGuest} className="primary-button">Add Guest</button>

      <h4>Event Sponsors</h4>
      {formData.event_sponsers.map((sponsor, index) => (
        <div key={index} className="sponsor-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor={`sponser_name_${index}`} className="event-label">Sponsor Name</label>
              <input
                id={`sponser_name_${index}`}
                type="text"
                name="sponser_name"
                value={sponsor.sponser_name}
                onChange={(e) => handleSponsorChange(index, e)}
                className="input-field"
              />
            </div>

            <div className="form-group">
              <label htmlFor={`sponser_image_${index}`} className="image-upload-label">Upload Sponsor Image</label>
              <input
                id={`sponser_image_${index}`}
                type="file"
                name="sponser_image"
                onChange={(e) => handleSponsorChange(index, e)}
                className="input-field"
              />
              {sponsor.sponser_image && (
                <span className="file-name">{sponsor.sponser_image.name}</span>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={() => removeSponsor(index)}
            className="remove-button"
          >
            Remove Sponsor
          </button>
        </div>
      ))}
      <button type="button" onClick={addSponsor} className="primary-button">Add Sponsor</button>

      <div className="form-group">
        <label htmlFor="event_summary" className="event-label">Event Summary</label>
        <textarea
          id="event_summary"
          name="event_summary"
          value={formData.event_summary}
          onChange={handleInputChange}
          className="textarea-field"
        />
      </div>

      <button type="submit" className="primary-button">Save Event</button>
    </form>
  );
};

export default EventForm;