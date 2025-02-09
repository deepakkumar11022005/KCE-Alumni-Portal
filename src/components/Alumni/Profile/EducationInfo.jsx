
import React from 'react';
import { Plus, Trash2 } from 'lucide-react';

const EducationInfo = ({ editableData, isEditing, setEditableData }) => {
  const handleAddEducation = () => {
    const newEducation = {
      institute_name: '',
      course: '',
      passed_out_year: '',
      grade: '',
      _id: Date.now().toString()
    };
    setEditableData(prev => ({
      ...prev,
      education: [...prev.education, newEducation]
    }));
  };

  const handleEducationChange = (index, field, value) => {
    setEditableData(prev => ({
      ...prev,
      education: prev.education.map((edu, i) => 
        i === index ? { ...edu, [field]: value } : edu
      )
    }));
};

const handleRemoveEducation = (index) => {
  setEditableData(prev => ({
    ...prev,
    education: prev.education.filter((_, i) => i !== index)
  }));
};

return (
  <div className="alumni-profile-education-info">
    {isEditing && (
      <button 
        onClick={handleAddEducation}
        className="alumni-profile-add-button"
      >
        <Plus size={16} /> Add Education
      </button>
    )}
    {editableData?.education.map((edu, index) => (
      <div key={edu._id} className="alumni-profile-education-card">
        {isEditing ? (
          <>
            <div className="alumni-profile-card-header">
              <input
                type="text"
                value={edu.institute_name}
                onChange={(e) => handleEducationChange(index, 'institute_name', e.target.value)}
                className="alumni-profile-input"
                placeholder="Institute name"
              />
              <button 
                onClick={() => handleRemoveEducation(index)}
                className="alumni-profile-remove-button"
              >
                <Trash2 size={16} />
              </button>
            </div>
            <div className="alumni-profile-info-grid">
              <div className="alumni-profile-input-group">
                <label>Course</label>
                <input
                  type="text"
                  value={edu.course}
                  onChange={(e) => handleEducationChange(index, 'course', e.target.value)}
                  className="alumni-profile-input"
                  placeholder="Course name"
                />
              </div>
              <div className="alumni-profile-input-group">
                <label>Passed Out Year</label>
                <input
                  type="text"
                  value={edu.passed_out_year}
                  onChange={(e) => handleEducationChange(index, 'passed_out_year', e.target.value)}
                  className="alumni-profile-input"
                  placeholder="Year"
                />
              </div>
              <div className="alumni-profile-input-group">
                <label>Grade</label>
                <input
                  type="text"
                  value={edu.grade}
                  onChange={(e) => handleEducationChange(index, 'grade', e.target.value)}
                  className="alumni-profile-input"
                  placeholder="Grade"
                />
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="alumni-profile-card-header">
              <h3>{edu.institute_name}</h3>
              <span className="alumni-profile-year-badge">
                {edu.passed_out_year}
              </span>
            </div>
            <div className="alumni-profile-info-grid">
              <div className="alumni-profile-info-item">
                <label>Course</label>
                <span>{edu.course}</span>
              </div>
              <div className="alumni-profile-info-item">
                <label>Grade</label>
                <span>{edu.grade}</span>
              </div>
            </div>
          </>
        )}
      </div>
    ))}
  </div>
);
};

export default EducationInfo;