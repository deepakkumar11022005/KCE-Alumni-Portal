
import React from 'react';
import { Plus, Trash2 } from 'lucide-react';

const WorkInfo = ({ editableData, isEditing, setEditableData }) => {
  const handleAddWorkExperience = () => {
    const newWork = {
      company_name: '',
      company_address: '',
      work_domain: '',
      company_url: '',
      company_type: '',
      designation: '',
      from_year: '',
      to_year: '',
      _id: Date.now().toString()
    };
    setEditableData(prev => ({
      ...prev,
      work_experience: [...prev.work_experience, newWork]
    }));
  };

  const handleWorkExperienceChange = (index, field, value) => {
    setEditableData(prev => ({
      ...prev,
      work_experience: prev.work_experience.map((work, i) => 
        i === index ? { ...work, [field]: value } : work
      )
    }));
  };

  const handleRemoveWorkExperience = (index) => {
    setEditableData(prev => ({
      ...prev,
      work_experience: prev.work_experience.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="alumni-profile-work-info">
      {isEditing && (
        <button 
          onClick={handleAddWorkExperience}
          className="alumni-profile-add-button"
        >
          <Plus size={16} /> Add Work Experience
        </button>
      )}
      {editableData?.work_experience.map((work, index) => (
        <div key={work._id} className="alumni-profile-work-card">
          {isEditing ? (
            <>
              <div className="alumni-profile-card-header">
                <input
                  type="text"
                  value={work.company_name}
                  onChange={(e) => handleWorkExperienceChange(index, 'company_name', e.target.value)}
                  className="alumni-profile-input"
                  placeholder="Company name"
                />
                <button 
                  onClick={() => handleRemoveWorkExperience(index)}
                  className="alumni-profile-remove-button"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              <div className="alumni-profile-info-grid">
                <div className="alumni-profile-input-group">
                  <label>Designation</label>
                  <input
                    type="text"
                    value={work.designation}
                    onChange={(e) => handleWorkExperienceChange(index, 'designation', e.target.value)}
                    className="alumni-profile-input"
                    placeholder="Designation"
                  />
                </div>
                <div className="alumni-profile-input-group">
                  <label>Work Domain</label>
                  <input
                    type="text"
                    value={work.work_domain}
                    onChange={(e) => handleWorkExperienceChange(index, 'work_domain', e.target.value)}
                    className="alumni-profile-input"
                    placeholder="Work domain"
                  />
                </div>
                <div className="alumni-profile-input-group">
                  <label>From Year</label>
                  <input
                    type="text"
                    value={work.from_year}
                    onChange={(e) => handleWorkExperienceChange(index, 'from_year', e.target.value)}
                    className="alumni-profile-input"
                    placeholder="From year"
                  />
                </div>
                <div className="alumni-profile-input-group">
                  <label>To Year</label>
                  <input
                    type="text"
                    value={work.to_year}
                    onChange={(e) => handleWorkExperienceChange(index, 'to_year', e.target.value)}
                    className="alumni-profile-input"
                    placeholder="To year"
                  />
                </div>
                <div className="alumni-profile-input-group full-width">
                  <label>Company Address</label>
                  <input
                    type="text"
                    value={work.company_address}
                    onChange={(e) => handleWorkExperienceChange(index, 'company_address', e.target.value)}
                    className="alumni-profile-input"
                    placeholder="Company address"
                  />
                </div>
                <div className="alumni-profile-input-group full-width">
                  <label>Company URL</label>
                  <input
                    type="text"
                    value={work.company_url}
                    onChange={(e) => handleWorkExperienceChange(index, 'company_url', e.target.value)}
                    className="alumni-profile-input"
                    placeholder="Company website URL"
                  />
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="alumni-profile-card-header">
                <h3>{work.company_name}</h3>
                <span className="alumni-profile-duration-badge">
                  {work.from_year} - {work.to_year}
                </span>
              </div>
              <div className="alumni-profile-info-grid">
                <div className="alumni-profile-info-item">
                  <label>Designation</label>
                  <span>{work.designation}</span>
                </div>
                <div className="alumni-profile-info-item">
                  <label>Domain</label>
                  <span>{work.work_domain}</span>
                </div>
                <div className="alumni-profile-info-item alumni-profile-full-width">
                  <label>Company Details</label>
                  <span>{work.company_address}</span>
                  <a 
                    href={work.company_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="alumni-profile-company-link"
                  >
                    {work.company_url}
                  </a>
                </div>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default WorkInfo;