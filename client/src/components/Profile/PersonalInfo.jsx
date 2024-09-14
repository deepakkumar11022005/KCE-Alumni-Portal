import React from 'react';
import { FaEdit, FaEnvelope, FaPhone } from 'react-icons/fa';
import './PersonalInfo.css';
import my_photo from '../../assets/images/me.jpg';

const PersonalInfo = ({ alumniData, onEdit }) => {
  return (
    <div className="personal-info">
      <div className="personal-info-container">
        <div className="profile-image">
          <img src={my_photo} alt={alumniData.name} />
          <button className="edit-button image-edit" onClick={() => onEdit('image')}>
            {/* <FaEdit /> */}
          </button>
        </div>
        <div className="info-section">
          <h1>
            {alumniData.name}
            
          </h1>
          <p className="domains">
            {alumniData.domains.join(' | ')}
            
          </p>
          <p className="skills">
            {alumniData.skills.join(' • ')}
         
          </p>
          <div className="contact-info">
            <p>
              <FaEnvelope /> {alumniData.email}
               
            </p>
            <p>
              <FaPhone /> {alumniData.phone}
               
            </p>
            <button className="edit-button image-edit" onClick={() => onEdit('image')}>
             Edit
          </button>
          </div>
         
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;