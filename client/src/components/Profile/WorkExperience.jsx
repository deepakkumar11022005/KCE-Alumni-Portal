import React, { useState } from 'react';
import { FaEdit, FaTrash, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import './WorkExperience.css';

const WorkExperience = ({ experiences, onEdit, onDelete }) => {
  const [expanded, setExpanded] = useState(Array(experiences.length).fill(false));

  const toggleExpand = (index) => {
    const newExpanded = [...expanded];
    newExpanded[index] = !newExpanded[index];
    setExpanded(newExpanded);
  };

  return (
    <div className="work-experience">
      <h3>Work Experience</h3>
      {experiences.map((exp, index) => (
        <div key={index} className="experience-item-wrapper">
          {/* Vertical Progress Bar */}
          <div className={`progress-bar ${index === experiences.length - 1 ? 'last-item' : ''}`}>
            <div className={`circle ${index === 0 ? 'current' : ''}`} />
            {index !== experiences.length - 1 && <div className={`line ${index === 0 ? 'current' : ''}`} />}
          </div>
          {/* Experience Item */}
          <div className="experience-item">
            <div className="experience-header" onClick={() => toggleExpand(index)}>
              <h4>{exp.company}</h4>
              <button className="toggle-btn">
                {expanded[index] ? <FaChevronUp /> : <FaChevronDown />}
              </button>
            </div>

            {expanded[index] && (
              <div className="experience-details">
                <p>Address: {exp.address}</p>
                <p>Job Domain: {exp.jobDomain}</p>
                <p>Duration: {exp.duration}</p>
                <div className="edit-delete-btns">
                  <button onClick={() => onEdit(index)}><FaEdit /> Edit</button>
                  <button onClick={() => onDelete(index)}><FaTrash /> Delete</button>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default WorkExperience;