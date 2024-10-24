import React, { useState, useEffect } from "react";
import "./EventForm.css";

const EventForm = ({ onSave = () => {} }) => {
  // Initialize form data state with corrected field names
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
        guest_image_id: null,
        special_guest: false,
      },
    ],
    special_guests: [],
    event_sponsors: [
      { sponsor_name: "", sponsor_image: null, sponsor_image_id: null },
    ],
    event_summary: "",
    event_image: null,
    event_image_id: null,
  });

  // State to manage loading and error/success messages
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null); // Can hold success or error messages

  // State to track image upload statuses
  const [imageUploadStatus, setImageUploadStatus] = useState({
    event_image: { uploading: false, error: null },
    event_guests: {}, // key: guest index, value: { uploading, error }
    event_sponsors: {}, // key: sponsor index, value: { uploading, error }
  });

  /**
   * Handle changes for general input fields
   */
  const handleInputChange = async (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      const file = files[0];
      setFormData((prevData) => ({
        ...prevData,
        [name]: file,
      }));

      if (file) {
        // Begin uploading the image
        setImageUploadStatus((prevStatus) => ({
          ...prevStatus,
          [name]: { uploading: true, error: null },
        }));

        try {
          const image_id = await uploadImage(file);
          setFormData((prevData) => ({
            ...prevData,
            [`${name}_id`]: image_id,
          }));

          setImageUploadStatus((prevStatus) => ({
            ...prevStatus,
            [name]: { uploading: false, error: null },
          }));
        } catch (error) {
          setImageUploadStatus((prevStatus) => ({
            ...prevStatus,
            [name]: { uploading: false, error: error.message },
          }));
        }
      }
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  /**
   * Handle changes for event guests
   */
  const handleGuestChange = async (index, e) => {
    const { name, type, checked, value, files } = e.target;

    setFormData((prevData) => {
      const updatedGuests = [...prevData.event_guests];
      const currentGuest = { ...updatedGuests[index] };

      if (type === "checkbox" && name === "special_guest") {
        // Toggle special_guest flag
        currentGuest.special_guest = checked;
        updatedGuests[index] = currentGuest;

        let updatedSpecialGuests = [...prevData.special_guests];

        if (checked) {
          // Add to special guests
          updatedSpecialGuests.push({
            guest_name: currentGuest.guest_name,
            guest_position: currentGuest.guest_position,
            event_flow_description: currentGuest.event_flow_description,
          });
        } else {
          // Remove from special guests
          updatedSpecialGuests = updatedSpecialGuests.filter(
            (guest) => guest.guest_name !== currentGuest.guest_name
          );
        }

        return {
          ...prevData,
          event_guests: updatedGuests,
          special_guests: updatedSpecialGuests,
        };
      } else {
        // Handle other input types
        if (type === "file") {
          currentGuest[name] = files[0];
        } else {
          currentGuest[name] = value;
        }
        updatedGuests[index] = currentGuest;

        return {
          ...prevData,
          event_guests: updatedGuests,
        };
      }
    });

    if (e.target.type === "file") {
      const file = files[0];
      if (file) {
        // Begin uploading the guest image
        setImageUploadStatus((prevStatus) => ({
          ...prevStatus,
          event_guests: {
            ...prevStatus.event_guests,
            [index]: { uploading: true, error: null },
          },
        }));

        try {
          const image_id = await uploadImage(file);
          setFormData((prevData) => {
            const updatedGuests = [...prevData.event_guests];
            updatedGuests[index].guest_image_id = image_id;
            return {
              ...prevData,
              event_guests: updatedGuests,
            };
          });

          setImageUploadStatus((prevStatus) => ({
            ...prevStatus,
            event_guests: {
              ...prevStatus.event_guests,
              [index]: { uploading: false, error: null },
            },
          }));
        } catch (error) {
          setImageUploadStatus((prevStatus) => ({
            ...prevStatus,
            event_guests: {
              ...prevStatus.event_guests,
              [index]: { uploading: false, error: error.message },
            },
          }));
        }
      }
    }
  };

  /**
   * Add a new guest to the form
   */
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
          guest_image_id: null,
          special_guest: false,
        },
      ],
    }));
  };

  /**
   * Remove a guest from the form
   */
  const removeGuest = (index) => {
    setFormData((prevData) => {
      const guestToRemove = prevData.event_guests[index];
      const updatedGuests = prevData.event_guests.filter((_, i) => i !== index);

      // If removing a special guest, remove from special_guests array
      let updatedSpecialGuests = [...prevData.special_guests];
      if (guestToRemove.special_guest) {
        updatedSpecialGuests = updatedSpecialGuests.filter(
          (guest) => guest.guest_name !== guestToRemove.guest_name
        );
      }

      return {
        ...prevData,
        event_guests: updatedGuests,
        special_guests: updatedSpecialGuests,
      };
    });

    // Remove image upload status for the guest
    setImageUploadStatus((prevStatus) => {
      const updatedGuestsStatus = { ...prevStatus.event_guests };
      delete updatedGuestsStatus[index];
      return {
        ...prevStatus,
        event_guests: updatedGuestsStatus,
      };
    });
  };

  /**
   * Handle changes for event sponsors
   */
  const handleSponsorChange = async (index, e) => {
    const { name, type, value, files } = e.target;

    setFormData((prevData) => {
      const updatedSponsors = [...prevData.event_sponsors];
      const currentSponsor = { ...updatedSponsors[index] };

      if (type === "file") {
        currentSponsor[name] = files[0];
      } else {
        currentSponsor[name] = value;
      }
      updatedSponsors[index] = currentSponsor;

      return {
        ...prevData,
        event_sponsors: updatedSponsors,
      };
    });

    if (e.target.type === "file") {
      const file = files[0];
      if (file) {
        // Begin uploading the sponsor image
        setImageUploadStatus((prevStatus) => ({
          ...prevStatus,
          event_sponsors: {
            ...prevStatus.event_sponsors,
            [index]: { uploading: true, error: null },
          },
        }));

        try {
          const image_id = await uploadImage(file);
          setFormData((prevData) => {
            const updatedSponsors = [...prevData.event_sponsors];
            updatedSponsors[index].sponsor_image_id = image_id;
            return {
              ...prevData,
              event_sponsors: updatedSponsors,
            };
          });

          setImageUploadStatus((prevStatus) => ({
            ...prevStatus,
            event_sponsors: {
              ...prevStatus.event_sponsors,
              [index]: { uploading: false, error: null },
            },
          }));
        } catch (error) {
          setImageUploadStatus((prevStatus) => ({
            ...prevStatus,
            event_sponsors: {
              ...prevStatus.event_sponsors,
              [index]: { uploading: false, error: error.message },
            },
          }));
        }
      }
    }
  };

  /**
   * Add a new sponsor to the form
   */
  const addSponsor = () => {
    setFormData((prevData) => ({
      ...prevData,
      event_sponsors: [
        ...prevData.event_sponsors,
        { sponsor_name: "", sponsor_image: null, sponsor_image_id: null },
      ],
    }));
  };

  /**
   * Remove a sponsor from the form
   */
  const removeSponsor = (index) => {
    setFormData((prevData) => {
      const sponsorToRemove = prevData.event_sponsors[index];
      const updatedSponsors = prevData.event_sponsors.filter((_, i) => i !== index);
      return {
        ...prevData,
        event_sponsors: updatedSponsors,
      };
    });

    // Remove image upload status for the sponsor
    setImageUploadStatus((prevStatus) => {
      const updatedSponsorsStatus = { ...prevStatus.event_sponsors };
      delete updatedSponsorsStatus[index];
      return {
        ...prevStatus,
        event_sponsors: updatedSponsorsStatus,
      };
    });
  };

  /**
   * Helper function to upload an image and return its image_id.
   * Replace the URL and logic with your actual image upload implementation.
   */
  const uploadImage = async (imageFile) => {
    // Example using a fictional image upload API
    // const uploadEndpoint = "https://your-image-upload-api.com/upload"; // Replace with actual endpoint

    // const formData = new FormData();
    // formData.append("file", imageFile);

    // const response = await fetch(uploadEndpoint, {
    //   method: "POST",
    //   body: formData,
    //   // Include headers or authentication if required
    // });

    // if (!response.ok) {
    //   throw new Error(`Image upload failed with status: ${response.status}`);
    // }

    const data = await response.json();
    return "data.image_id"; // Adjust based on your API's response structure
  };

  /**
   * Validate form inputs
   */
  const validateForm = () => {
    if (!formData.event_name.trim()) return "Event name is required.";
    if (!formData.event_venue.trim()) return "Event venue is required.";
    if (!formData.event_date) return "Event date is required.";
    if (!formData.event_time) return "Event time is required.";
    if (!formData.event_details.trim()) return "Event details are required.";
    if (!formData.event_summary.trim()) return "Event summary is required.";

    // Validate guests
    for (let guest of formData.event_guests) {
      if (!guest.guest_name.trim()) return "All guest names are required.";
      if (!guest.guest_position.trim()) return "All guest positions are required.";
      if (!guest.event_flow_description.trim())
        return "All event flow descriptions are required.";
      if (!guest.guest_image_id) return "All guests must have an image uploaded.";
    }

    // Validate sponsors
    for (let sponsor of formData.event_sponsors) {
      if (!sponsor.sponsor_name.trim()) return "All sponsor names are required.";
      if (!sponsor.sponsor_image_id)
        return "All sponsors must have an image uploaded.";
    }

    // Validate event image
    if (!formData.event_image_id) return "Event image must be uploaded.";

    return null; // No errors
  };

  /**
   * Handle form submission
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    // Perform validation
    const validationError = validateForm();
    if (validationError) {
      setMessage({ type: "error", text: validationError });
      setLoading(false);
      return;
    }

    
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
          .filter((guest) => !guest.special_guest)
          .map((guest) => ({
            guest_name: guest.guest_name,
            guest_position: guest.guest_position,
            event_flow_description: guest.event_flow_description,
          })),
        event_sponsors: formData.event_sponsors.map((sponsor) => ({
          image_id: sponsor.sponsor_image_id,
          sponsor_name: sponsor.sponsor_name,
        })),
        event_summary: formData.event_summary,
        event_image_id: formData.event_image_id,
      };

      console.log("Request Body:", requestBody);

      // Send the request to your API
      const response = await fetch("https://alumni-apis.vercel.app/event", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // "Authorization": `Bearer YOUR_API_TOKEN_HERE`, // Uncomment and set if needed
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        // Attempt to parse the error message from the response body
        const errorData = await response.json();
        throw new Error(
          `HTTP error! status: ${response.status}, message: ${
            errorData.message || "No error message provided"
          }`
        );
      }

      const data = await response.json();
      console.log("Event created successfully:", data);
      setMessage({ type: "success", text: "Event created successfully!" });
      onSave(data); // Callback after successful save

      // Optionally, reset the form after successful submission
      setFormData({
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
            guest_image_id: null,
            special_guest: false,
          },
        ],
        special_guests: [],
        event_sponsors: [
          { sponsor_name: "", sponsor_image: null, sponsor_image_id: null },
        ],
        event_summary: "",
        event_image: null,
        event_image_id: null,
      });

      // Reset image upload statuses
      setImageUploadStatus({
        event_image: { uploading: false, error: null },
        event_guests: {},
        event_sponsors: {},
      });
    } catch (err) {
      console.error("Error creating event:", err);
      setMessage({ type: "error", text: err.message });
    } finally {
      setLoading(false);
    }
  };

  // Cleanup object URLs to prevent memory leaks
  useEffect(() => {
    return () => {
      // Revoke object URLs if any
      formData.event_image &&
        URL.revokeObjectURL(formData.event_image.preview);
      formData.event_guests.forEach((guest) => {
        guest.guest_image &&
          URL.revokeObjectURL(guest.guest_image.preview);
      });
      formData.event_sponsors.forEach((sponsor) => {
        sponsor.sponsor_image &&
          URL.revokeObjectURL(sponsor.sponsor_image.preview);
      });
    };
  }, [formData]);

  return (
    <div className="event-form-container">
      {/* Loader Overlay */}
      {loading && (
        <div className="loader-overlay">
          <div className="loader"></div>
          <p className="loading-text">Submitting your event...</p>
        </div>
      )}

      <form className="event-form" onSubmit={handleSubmit}>
        <h4>Event Form</h4>

        {/* Display Success or Error Message */}
        {message && (
          <p
            className={`message ${
              message.type === "error" ? "error" : "success"
            }`}
          >
            {message.text}
          </p>
        )}

        {/* Event Name and Image */}
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="event_name" className="event-label">
              Event Name<sup className="required">*</sup>
            </label>
            <input
              id="event_name"
              type="text"
              name="event_name"
              value={formData.event_name}
              onChange={handleInputChange}
              className="input-field"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="event_image" className="image-upload-label">
              Upload Event Image<sup className="required">*</sup>
            </label>
            <input
              id="event_image"
              type="file"
              name="event_image"
              onChange={handleInputChange}
              className="input-field"
              accept="image/*"
              required
            />
            {/* Image Upload Status */}
            {imageUploadStatus.event_image.uploading && (
              <p className="loading-text">Uploading Event Image...</p>
            )}
            {imageUploadStatus.event_image.error && (
              <p className="message error">
                {imageUploadStatus.event_image.error}
              </p>
            )}
            {formData.event_image && formData.event_image_id && (
              <span className="file-name">{formData.event_image.name}</span>
            )}

            {/* Preview of Event Image */}
            {formData.event_image && (
              <div className="img-preview">
                <img
                id="event-img-preview"
                  src={URL.createObjectURL(formData.event_image)}
                  alt="Event Preview"
                />
              </div>
            )}
          </div>
        </div>

        {/* Event Venue and Date */}
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="event_venue" className="event-label">
              Event Venue<sup className="required">*</sup>
            </label>
            <input
              id="event_venue"
              type="text"
              name="event_venue"
              value={formData.event_venue}
              onChange={handleInputChange}
              className="input-field"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="event_date" className="event-label">
              Event Date<sup className="required">*</sup>
            </label>
            <input
              id="event_date"
              type="date"
              name="event_date"
              value={formData.event_date}
              onChange={handleInputChange}
              className="input-field"
              required
            />
          </div>
        </div>

        {/* Event Time */}
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="event_time" className="event-label">
              Event Time<sup className="required">*</sup>
            </label>
            <input
              id="event_time"
              type="time"
              name="event_time"
              value={formData.event_time}
              onChange={handleInputChange}
              className="input-field"
              required
            />
          </div>
        </div>

        {/* Event Details */}
        <div className="form-group">
          <label htmlFor="event_details" className="event-label">
            Event Details<sup className="required">*</sup>
          </label>
          <textarea
            id="event_details"
            name="event_details"
            value={formData.event_details}
            onChange={handleInputChange}
            className="textarea-field"
            rows="4"
            required
          />
        </div>

        {/* Event Guests */}
        <h4>Event Guests</h4>
        {formData.event_guests.map((guest, index) => (
          <div key={index} className="guest-form">
            {/* Special Guest Checkbox */}
            <div className="form-group-checkbox">
              <label htmlFor={`special_guest_${index}`} className="event-label">
                Special Guest
              </label>
              <input
                id={`special_guest_${index}`}
                type="checkbox"
                name="special_guest"
                checked={guest.special_guest}
                onChange={(e) => handleGuestChange(index, e)}
                className="checkbox-field"
              />
            </div>

            {/* Guest Name and Position */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor={`guest_name_${index}`} className="event-label">
                  Guest Name<sup className="required">*</sup>
                </label>
                <input
                  id={`guest_name_${index}`}
                  type="text"
                  name="guest_name"
                  value={guest.guest_name}
                  onChange={(e) => handleGuestChange(index, e)}
                  className="input-field"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor={`guest_position_${index}`} className="event-label">
                  Guest Position<sup className="required">*</sup>
                </label>
                <input
                  id={`guest_position_${index}`}
                  type="text"
                  name="guest_position"
                  value={guest.guest_position}
                  onChange={(e) => handleGuestChange(index, e)}
                  className="input-field"
                  required
                />
              </div>
            </div>

            {/* Guest Image and Description */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor={`guest_image_${index}`} className="image-upload-label">
                  Upload Guest Image<sup className="required">*</sup>
                </label>
                <input
                  id={`guest_image_${index}`}
                  type="file"
                  name="guest_image"
                  onChange={(e) => handleGuestChange(index, e)}
                  className="input-field"
                  accept="image/*"
                  required
                />
                {/* Image Upload Status */}
                {imageUploadStatus.event_guests[index] &&
                  imageUploadStatus.event_guests[index].uploading && (
                    <p className="loading-text">Uploading Guest Image...</p>
                  )}
                {imageUploadStatus.event_guests[index] &&
                  imageUploadStatus.event_guests[index].error && (
                    <p className="message error">
                      {imageUploadStatus.event_guests[index].error}
                    </p>
                  )}
                {guest.guest_image && guest.guest_image_id && (
                  <span className="file-name">{guest.guest_image.name}</span>
                )}
              </div>

              <div className="form-group">
                <label
                  htmlFor={`event_flow_description_${index}`}
                  className="event-label"
                >
                  Event Flow Description<sup className="required">*</sup>
                </label>
                <input
                  id={`event_flow_description_${index}`}
                  type="text"
                  name="event_flow_description"
                  value={guest.event_flow_description}
                  onChange={(e) => handleGuestChange(index, e)}
                  className="input-field"
                  required
                />
              </div>
            </div>

            {/* Preview of Guest Image */}
            {guest.guest_image && (
              <div className="img-preview">
                <img
                id="event-img-preview"
                  src={URL.createObjectURL(guest.guest_image)}
                  alt={`Guest ${guest.guest_name} Preview`}
                />
              </div>
            )}

            {/* Remove Guest Button */}
            <button
              type="button"
              onClick={() => removeGuest(index)}
              className="remove-button"
            >
              Remove Guest
            </button>
          </div>
        ))}

        {/* Add Guest Button */}
        <button type="button" onClick={addGuest} className="primary-button">
          Add Guest
        </button>

        {/* Event Sponsors */}
        <h4>Event Sponsors</h4>
        {formData.event_sponsors.map((sponsor, index) => (
          <div key={index} className="sponsor-form">
            {/* Sponsor Name and Image */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor={`sponsor_name_${index}`} className="event-label">
                  Sponsor Name<sup className="required">*</sup>
                </label>
                <input
                  id={`sponsor_name_${index}`}
                  type="text"
                  name="sponsor_name"
                  value={sponsor.sponsor_name}
                  onChange={(e) => handleSponsorChange(index, e)}
                  className="input-field"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor={`sponsor_image_${index}`} className="image-upload-label">
                  Upload Sponsor Image<sup className="required">*</sup>
                </label>
                <input
                  id={`sponsor_image_${index}`}
                  type="file"
                  name="sponsor_image"
                  onChange={(e) => handleSponsorChange(index, e)}
                  className="input-field"
                  accept="image/*"
                  required
                />
                {/* Image Upload Status */}
                {imageUploadStatus.event_sponsors[index] &&
                  imageUploadStatus.event_sponsors[index].uploading && (
                    <p className="loading-text">Uploading Sponsor Image...</p>
                  )}
                {imageUploadStatus.event_sponsors[index] &&
                  imageUploadStatus.event_sponsors[index].error && (
                    <p className="message error">
                      {imageUploadStatus.event_sponsors[index].error}
                    </p>
                  )}
                {sponsor.sponsor_image && sponsor.sponsor_image_id && (
                  <span className="file-name">{sponsor.sponsor_image.name}</span>
                )}
              </div>
            </div>

            {/* Preview of Sponsor Image */}
            {sponsor.sponsor_image && (
              <div className="img-preview">
                <img
                id="event-img-preview"
                  src={URL.createObjectURL(sponsor.sponsor_image)}
                  alt={`Sponsor ${sponsor.sponsor_name} Preview`}
                />
              </div>
            )}

            {/* Remove Sponsor Button */}
            <button
              type="button"
              onClick={() => removeSponsor(index)}
              className="remove-button"
            >
              Remove Sponsor
            </button>
          </div>
        ))}

        {/* Add Sponsor Button */}
        <button type="button" onClick={addSponsor} className="primary-button">
          Add Sponsor
        </button>

        {/* Event Summary */}
        <div className="form-group">
          <label htmlFor="event_summary" className="event-label">
            Event Summary<sup className="required">*</sup>
          </label>
          <textarea
            id="event_summary"
            name="event_summary"
            value={formData.event_summary}
            onChange={handleInputChange}
            className="textarea-field"
            rows="4"
            required
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="primary-button" disabled={loading}>
          Save Event
        </button>
      </form>
    </div>
  );
};

export default EventForm;
