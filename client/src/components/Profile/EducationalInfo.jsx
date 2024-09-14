import React from 'react';
import { FaEdit } from 'react-icons/fa';
import './EducationalInfo.css';

const EducationDetails = ({ education, onEdit }) => {
  return (
    <div className="education-details">
      <h3>Education</h3>

      {/* College Education */}
      <div className="education-item-wrapper">
        {/* <div className="progress-bar">
          <div className="circle current" />
          <div className="line current" />
        </div> */}
        <div className="education-item">
          <div className="education-header">
            <h4>College</h4>
            <button className="edit-btn" onClick={() => onEdit('college')}>
              <FaEdit /> Edit
            </button>
          </div>
          <p>Institution: {education.college.name}</p>
          <p>Degree: {education.college.degree}</p>
          <p>Year: {education.college.year}</p>
          <p>CGPA: {education.college.cgpa}</p>
        </div>
      </div>

      {/* 12th Grade Education */}
      <div className="education-item-wrapper">
        {/* <div className="progress-bar">
          <div className="circle" />
          <div className="line" />
        </div> */}
        <div className="education-item">
          <div className="education-header">
            <h4>12th Grade</h4>
            <button className="edit-btn" onClick={() => onEdit('12th')}>
              <FaEdit /> Edit 
            </button>
          </div>
          <p>School: {education['12th'].school}</p>
          <p>Year: {education['12th'].year}</p>
          <p>Percentage: {education['12th'].percentage}%</p>
        </div>
      </div>

      {/* 10th Grade Education */}
      <div className="education-item-wrapper">
        {/* <div className="progress-bar">
          <div className="circle" />
        </div> */}
        <div className="education-item">
          <div className="education-header">
            <h4>10th Grade</h4>
            <button className="edit-btn" onClick={() => onEdit('10th')}>
              <FaEdit /> Edit
            </button>
          </div>
          <p>School: {education['10th'].school}</p>
          <p>Year: {education['10th'].year}</p>
          <p>Percentage: {education['10th'].percentage}%</p>
        </div>
      </div>
    </div>
  );
};

export default EducationDetails;
