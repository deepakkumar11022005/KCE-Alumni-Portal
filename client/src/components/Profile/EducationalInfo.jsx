import React from 'react';
import { FaEdit } from 'react-icons/fa';
import './EducationalInfo.css';

const EducationDetails = ({ education, onEdit }) => {
  return (
    <div className="education-details">
      <h3>Education</h3>

      {/* College Education */}
      <div className="education-item-wrapper">
        
        <div className="education-item">
          <div className="education-header">
            <h4>College</h4>
            
          </div>
          <p>Institution : <span className='yellow-text'>{education.college.name}</span></p>
          <p>Degree : {education.college.degree}</p>
          <p>Year : {education.college.year}</p>
          <p>CGPA : {education.college.cgpa}</p>
        </div>
      </div>

      {/* 12th Grade Education */}
      <div className="education-item-wrapper">
         
        <div className="education-item">
          <div className="education-header">
            <h4>12th Grade</h4>
            {/* <button className="edit-btn" onClick={onEdit}>Edit</button> */}
          </div>
          <p>School : <span className='yellow-text'>{education['12th'].school}</span> </p>
          <p>Year : {education['12th'].year}</p>
          <p>Percentage : {education['12th'].percentage}%</p>
        </div>
      </div>

      {/* 10th Grade Education */}
      <div className="education-item-wrapper">
         
        <div className="education-item">
          <div className="education-header">
            <h4>10th Grade</h4>
            {/* <button className="edit-btn" onClick={onEdit}>Edit</button> */}
          </div>
          <p>School : <span className='yellow-text'>{education['10th'].school}</span></p>
          <p>Year : {education['10th'].year}</p>
          <p>Percentage : {education['10th'].percentage}%</p>
        </div>
      </div>
    </div>
  );
};

export default EducationDetails;
