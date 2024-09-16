import React, { useState } from 'react';
import './SliderPreview.css';
import slides from "../../../assets/JSON/slider.json";

const SliderPreview = ({ onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedEvents, setEditedEvents] = useState(slides);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newSlide, setNewSlide] = useState({
    image: '',
    title: '',
    subtitle: '',
    interval: 1000
  });

  // Toggle Edit/Save button
  const handleInputChange = (e, index, field) => {
    const updatedEvents = [...editedEvents];
    updatedEvents[index][field] = e.target.value;
    setEditedEvents(updatedEvents);
  };

  const handleSaveClick = () => {
    onSave(editedEvents);
    setIsEditing(false);  // Exit edit mode
  };

  // Add new slide logic
  const handleAddNewSlide = () => {
    setEditedEvents([...editedEvents, newSlide]); // Add new slide to the list
    setIsAddingNew(false);  // Hide add new form
    setNewSlide({ image: '', title: '', subtitle: '', interval: 1000 }); // Reset new slide input
  };

  const handleNewSlideInputChange = (e, field) => {
    setNewSlide({ ...newSlide, [field]: e.target.value });
  };

  return (
    <div className="slider-edit-container">
      <form className="slider-form">
        {editedEvents.map((event, index) => (
          <div key={index} className="form-section">
            <div className="form-group">
              <label>Image URL:</label>
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
              <label>Subtitle:</label>
              <textarea
                value={event.subtitle}
                onChange={(e) => handleInputChange(e, index, 'subtitle')}
                className="textarea-field"
                disabled={!isEditing}
              />
            </div>
            {/* <div className="form-group">
              <label>Interval (ms):</label>
              <input
                type="number"
                value={event.interval}
                onChange={(e) => handleInputChange(e, index, 'interval')}
                className="input-field"
                disabled={!isEditing}
              />
            </div> */}
          </div>
        ))}

        {/* Add new slide button */}
        {isEditing && !isAddingNew && (
          <button type="button" onClick={() => setIsAddingNew(true)} className="add-new-button">
            Add New Slide
          </button>
        )}

        {isAddingNew && (
          <div className="form-section new-slide-section">
            <h3>Add New Slide</h3>
           
            <div className="form-group">
              <label>Image URL:</label>
              <input
                type="text"
                value={newSlide.image}
                onChange={(e) => handleNewSlideInputChange(e, 'image')}
                className="input-field"
                required
              />
            </div>
            <div className="form-group">
              <label>Title:</label>
              <input
                type="text"
                value={newSlide.title}
                onChange={(e) => handleNewSlideInputChange(e, 'title')}
                className="input-field"
                required
              />
            </div>
            <div className="form-group">
              <label>Subtitle:</label>
              <textarea
                value={newSlide.subtitle}
                onChange={(e) => handleNewSlideInputChange(e, 'subtitle')}
                className="textarea-field"
              />
            </div>
            {/* <div className="form-group">
              <label>Interval (ms):</label>
              <input
                type="number"
                value={newSlide.interval}
                onChange={(e) => handleNewSlideInputChange(e, 'interval')}
                className="input-field"
              />
            </div> */}
            <button type="button" onClick={handleAddNewSlide} className="save-button">Add Slide</button>
          </div>
        )}

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
