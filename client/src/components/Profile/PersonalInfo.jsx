// src/components/PersonalInfo/PersonalInfo.jsx

import React from "react";
import {
  FaEdit,
  FaEnvelope,
  FaPhone,
  FaLinkedin,
  FaInstagram,
  FaFacebook,
} from "react-icons/fa";
import "./PersonalInfo.css";
import defaultAlumnImg from '../../assets/images/me.jpg'; // Ensure this path is correct

const PersonalInfo = ({ alumniData, onEdit }) => {
  return (
    <div className="personal-info">
      <div className="personal-info-container">
        <div className="profile-imagee">
          <img src={alumniData.image} alt={alumniData.name} />
          
          <button
            className="edit-button image-edit"
            onClick={() => onEdit()}
          >
            
          </button>
        </div>
        <div className="info-section">
          <h2 className="alumni-name">{alumniData.name}</h2>
          <p className="domains">{alumniData.domains.join(" | ")}</p>
          <p className="skills">{alumniData.skills.join(" • ")}</p>
          <div className="contact-info">
            <p>
              <FaEnvelope /> {alumniData.email}
            </p>
            <p>
              <FaPhone /> +91 {alumniData.phone}
            </p>
            <div className="social-icons">
              {alumniData.linkedin && (
                <a
                  href={alumniData.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedin className="social-icon linkedin" />
                </a>
              )}
              {alumniData.instagram && (
                <a
                  href={alumniData.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaInstagram className="social-icon instagram" />
                </a>
              )}
              {alumniData.facebook && (
                <a
                  href={alumniData.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaFacebook className="social-icon facebook" />
                </a>
              )}
            </div>
            <button className="btn-save-changes" onClick={onEdit}>
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
