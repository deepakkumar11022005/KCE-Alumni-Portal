// src/components/AlumniProfile/ProfileHeader.jsx
import React from 'react';
import { Edit2, Check, X } from 'lucide-react';

const ProfileHeader = ({
  editableData,
  isEditing,
  setIsEditing,
  onSave,
  onCancel,
  saveLoading,
  handleInputChange
}) => (
  <div className="alumni-profile-header">
    <div className="alumni-profile-header-content">
      <div className="alumni-profile-avatar">
        <img 
          src={editableData?.student_image_id || `/api/placeholder/100/100`} 
          alt={editableData?.student_name}
          onError={(e) => {
            e.target.src = `/api/placeholder/100/100`;
          }}
        />
      </div>
      
      <div className="alumni-profile-basic-info">
        {!isEditing ? (
          <>
            <div className="flex justify-between items-center">
              <h1>{editableData?.student_name}</h1>
              <button 
                onClick={() => setIsEditing(true)} 
                className="alumni-profile-edit-button"
              >
                <Edit2 size={16} /> Edit Profile
              </button>
            </div>
            <div className="alumni-profile-badges">
              <span className="alumni-profile-badge">{editableData?.roll_no}</span>
              <span className="alumni-profile-badge">{editableData?.batch} Batch</span>
              <span className="alumni-profile-badge alumni-profile-status">
                {editableData?.is_employee ? 'Employed' : 
                 editableData?.is_entrepreneur ? 'Entrepreneur' :
                 editableData?.is_highereducation ? 'Higher Studies' :
                 editableData?.is_exam ? 'Preparing for Exams' : 'Seeking Opportunities'}
              </span>
            </div>
            <p className="alumni-profile-degree-info">
              {editableData?.degree} in {editableData?.branch}
              <span className="alumni-profile-department">
                Department of {editableData?.department}
              </span>
            </p>
          </>
        ) : (
          <div className="alumni-profile-edit-form">
            <div className="alumni-profile-input-group">
              <label>Full Name</label>
              <input
                type="text"
                value={editableData?.student_name}
                onChange={(e) => handleInputChange('student_name', e.target.value)}
                className="alumni-profile-input"
                placeholder="Full name"
              />
            </div>
            <div className="alumni-profile-input-group">
              <label>Batch</label>
              <input
                type="text"
                value={editableData?.batch}
                onChange={(e) => handleInputChange('batch', e.target.value)}
                className="alumni-profile-input"
                placeholder="Batch year"
              />
            </div>
            <div className="alumni-profile-input-group">
              <label>Degree</label>
              <input
                type="text"
                value={editableData?.degree}
                onChange={(e) => handleInputChange('degree', e.target.value)}
                className="alumni-profile-input"
                placeholder="Degree"
              />
            </div>
            <div className="alumni-profile-button-group">
              <button 
                onClick={onSave} 
                className="alumni-profile-save-button"
                disabled={saveLoading}
              >
                {saveLoading ? (
                  <div className="alumni-profile-spinner">
                    <div className="spinner"></div>
                    Saving...
                  </div>
                ) : (
                  <>
                    <Check size={16} /> Save
                  </>
                )}
              </button>
              <button 
                onClick={onCancel} 
                className="alumni-profile-cancel-button"
                disabled={saveLoading}
              >
                <X size={16} /> Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
);

export default ProfileHeader;