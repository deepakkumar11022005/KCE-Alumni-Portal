 
import React from 'react';
import { Briefcase } from 'lucide-react';
import './WorkExperience.css';

const WorkExperience = ({ experiences, onEdit, onDelete }) => {
  return (
    <div className="experience-container">
      <h2 className="experience-title">Work Experience</h2>
      <div className="experience-bar">
        {experiences.map((exp, index) => (
          <div key={index} className="experience-item">
            <div className="experience-icon">
              <Briefcase size={24} />
              <div className="experience-year">{exp.year}</div>
            </div>
            <div className="experience-content">
              <h3 className="experience-role">   {exp.role}</h3>
              <h4 className="experience-company">
                <a href={exp.companyUrl} target="_blank" rel="noopener noreferrer" className='company-info'>
                  {exp.company}
                </a>
                {` (${exp.companyType})`}
              </h4>
              <p className="experience-description">{exp.description}</p>
              <p className="experience-address">{exp.companyAddress}</p>
               
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkExperience;
