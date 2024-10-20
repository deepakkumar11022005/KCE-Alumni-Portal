// src/components/EducationalInfo/EducationalInfo.jsx

import React from 'react';
import PropTypes from 'prop-types';
import './EducationalInfo.css';

const EducationalInfo = ({ education   }) => {
  return (
    <div className="education-details">
      <h3>Education</h3>

      {/* Iterate over education details */}
      {education.map((item) => (
        <div key={item._id} className="education-item-wrapper">
          <div className="education-item">
            <div className="education-header">
              <h4>{item.course}</h4>
              {/* Uncomment the button if you want to enable editing */}
              {/* <button className="edit-btn" onClick={() => onEdit(item._id)}>Edit</button> */}
            </div>
            <p>Institution: <span className='yellow-text'>{item.institution}</span></p>
            <p>Year: {item.year}</p>
            {/* <p>Branch : Computer Science and Engineeing</p> */}
            <p>Grade: {item.grade}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

EducationalInfo.propTypes = {
  education: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      institution: PropTypes.string.isRequired,
      course: PropTypes.string.isRequired,
      year: PropTypes.string.isRequired,
      grade: PropTypes.string.isRequired,
    })
  ).isRequired,
   
};

export default EducationalInfo;
