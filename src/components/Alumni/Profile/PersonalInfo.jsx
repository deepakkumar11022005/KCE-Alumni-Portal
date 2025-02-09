
// src/components/AlumniProfile/PersonalInfo.jsx
import React from 'react';

const PersonalInfo = ({ editableData, isEditing, handleInputChange }) => (
  <div className="alumni-profile-personal-info">
    <div className="alumni-profile-info-section">
      <h2>Contact Information</h2>
      <div className="alumni-profile-info-grid">
        <div className="alumni-profile-info-item">
          <label>Email Address</label>
          <span>{editableData?.email}</span>
        </div>
        <div className="alumni-profile-info-item">
          <label>Mobile Number</label>
          {isEditing ? (
            <input
              type="text"
              value={editableData?.mobile_number}
              onChange={(e) => handleInputChange('mobile_number', e.target.value)}
              className="alumni-profile-input"
              placeholder="Enter mobile number"
            />
          ) : (
            <span>{editableData?.mobile_number}</span>
          )}
        </div>
      </div>
    </div>

    <div className="alumni-profile-info-section">
      <h2>Family Information</h2>
      <div className="alumni-profile-info-grid">
        <div className="alumni-profile-info-item">
          <label>Father's Information</label>
          {isEditing ? (
            <>
              <div className="alumni-profile-input-group">
                <label>Name</label>
                <input
                  type="text"
                  value={editableData?.fathers_name}
                  onChange={(e) => handleInputChange('fathers_name', e.target.value)}
                  className="alumni-profile-input"
                  placeholder="Father's name"
                />
              </div>
              <div className="alumni-profile-input-group">
                <label>Mobile</label>
                <input
                  type="text"
                  value={editableData?.fathers_mobile}
                  onChange={(e) => handleInputChange('fathers_mobile', e.target.value)}
                  className="alumni-profile-input"
                  placeholder="Father's mobile"
                />
              </div>
            </>
          ) : (
            <>
              <div>
                <strong>Name:</strong> {editableData?.fathers_name}
              </div>
              <div>
                <strong>Mobile:</strong> {editableData?.fathers_mobile}
              </div>
            </>
          )}
        </div>
        <div className="alumni-profile-info-item">
          <label>Mother's Information</label>
          {isEditing ? (
            <>
              <div className="alumni-profile-input-group">
                <label>Name</label>
                <input
                  type="text"
                  value={editableData?.mothers_name}
                  onChange={(e) => handleInputChange('mothers_name', e.target.value)}
                  className="alumni-profile-input"
                  placeholder="Mother's name"
                />
              </div>
              <div className="alumni-profile-input-group">
                <label>Mobile</label>
                <input
                  type="text"
                  value={editableData?.mothers_mobile}
                  onChange={(e) => handleInputChange('mothers_mobile', e.target.value)}
                  className="alumni-profile-input"
                  placeholder="Mother's mobile"
                />
              </div>
            </>
          ) : (
            <>
              <div>
                <strong>Name:</strong> {editableData?.mothers_name}
              </div>
              <div>
                <strong>Mobile:</strong> {editableData?.mothers_mobile}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  </div>
);

export default PersonalInfo;