import React from 'react';
import './AlumniForm.css';

const AlumniForm = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission
    console.log('Form submitted');
  };

  return (
    <form className="alumni-form" onSubmit={handleSubmit}>
      
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" required />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" required />
      </div>
      <div className="form-group">
        <label htmlFor="dob">Date of Birth</label>
        <input type="date" id="dob" name="dob" required />
      </div>
      <div className="form-group">
        <label htmlFor="linkedin">LinkedIn</label>
        <input type="url" id="linkedin" name="linkedin" placeholder="https://linkedin.com/in/username" />
      </div>
      <div className="form-group">
        <label htmlFor="instagram">Instagram</label>
        <input type="url" id="instagram" name="instagram" placeholder="https://instagram.com/username" />
      </div>
      <div className="form-group">
        <label htmlFor="facebook">Facebook</label>
        <input type="url" id="facebook" name="facebook" placeholder="https://facebook.com/username" />
      </div>
      <div className="form-group">
        <label htmlFor="domain">Domain</label>
        <input type="text" id="domain" name="domain" required />
      </div>
      <div className="form-group">
        <label htmlFor="company">Company</label>
        <input type="text" id="company" name="company" required />
      </div>
      <div className="form-group">
        <label htmlFor="location">Location</label>
        <input type="text" id="location" name="location" required />
      </div>
      <div className="form-group">
        <label htmlFor="address">Address</label>
        <input type="text" id="address" name="address" required />
      </div>
      <div className="form-group">
        <label htmlFor="department">Department</label>
        <input type="text" id="department" name="department" required />
      </div>
      <div className="form-group">
        <label htmlFor="batch">Batch</label>
        <input type="text" id="batch" name="batch" required />
      </div>
      <div className="form-group">
        <label htmlFor="graduationYear">Graduation Year</label>
        <input type="number" id="graduationYear" name="graduationYear" required />
      </div>
      <button type="submit" className="submit-button">Add Alumni</button>
    </form>
  );
};

export default AlumniForm;
