import React, { useState } from 'react';
import slides from "../../../../assets/JSON/slider.json";

const SliderPreview = () => {
  const [editedEvents, setEditedEvents] = useState(slides);
  const [isEditing, setIsEditing] = useState(false);
  const [newSlide, setNewSlide] = useState({
    image: '',
    title: '',
    description: ''
  });

  // Handle input changes for the form
  const handleInputChange = (e, index, field) => {
    const updatedEvents = [...editedEvents];
    updatedEvents[index][field] = e.target.value;
    setEditedEvents(updatedEvents);
  };

  const handleSaveClick = () => {
    // Since we can't write to local JSON directly in React,
    // This should send data to the backend for saving into slider.json
    console.log(editedEvents);  // You can replace this with API logic
    setIsEditing(false);  // Exit edit mode
  };

  // Adding new slide logic
  const handleAddNewSlide = () => {
    setEditedEvents([...editedEvents, newSlide]);
    setNewSlide({ image: '', title: '', description: '' });
  };

  return (
    <div className="slider-edit-container">
      <form className="slider-form">
        {editedEvents.map((event, index) => (
          <div key={index} className="form-section">
            <div className="form-group">
              <label>Image</label>
              {/* <img src={event.image} alt={event.title} /> */}
              <input
                type="text"
                value={event.image}
                onChange={(e) => handleInputChange(e, index, 'image')}
                className="input-field"
                disabled={!isEditing}
              />
            </div>
            <div className="form-group">
              <label>Title:</label>
              <input
                type="text"
                value={event.title}
                onChange={(e) => handleInputChange(e, index, 'title')}
                className="input-field"
                disabled={!isEditing}
              />
            </div>
            <div className="form-group">
              <label>Description:</label>
              <textarea
                value={event.description}
                onChange={(e) => handleInputChange(e, index, 'description')}
                className="textarea-field"
                disabled={!isEditing}
              />
            </div>
          </div>
        ))}

        {/* Add new slide button */}
        {isEditing && (
          <button type="button" onClick={handleAddNewSlide} className="add-new-button">
            Add New Slide
          </button>
        )}

        {/* Toggle edit mode */}
        {isEditing && (
          <button type="button" onClick={handleSaveClick} className="save-button">Save Changes</button>
        )}
        {!isEditing && (
          <button type="button" onClick={() => setIsEditing(true)} className="edit-button">Edit</button>
        )}
      </form>
    </div>
  );
};

export default SliderPreview;
