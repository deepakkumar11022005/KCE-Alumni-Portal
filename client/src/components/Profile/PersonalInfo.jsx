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
import my_photo from "../../assets/images/me.jpg";

const PersonalInfo = ({ alumniData, onEdit }) => {
  return (
    <div className="personal-info">
      <div className="personal-info-container">
        <div className="profile-image">
          <img src={my_photo} alt={alumniData.name} />
          <button
            className="edit-button image-edit"
            onClick={() => onEdit("image")}
          >
            {/* <FaEdit /> */}
          </button>
        </div>
        <div className="info-section">
          <h1>{alumniData.name}</h1>
          <p className="domains">{alumniData.domains.join(" | ")}</p>
          <p className="skills">{alumniData.skills.join(" • ")}</p>
          <div className="contact-info">
            <p>
              <FaEnvelope /> {alumniData.email}
            </p>
            <p>
              <FaPhone /> {alumniData.phone}
            </p>
          
          <div className="social-icons">
            <a
              href={alumniData.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin className="social-icon linkedin" />
            </a>
            <a
              href={alumniData.instagram}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className="social-icon instagram" />
            </a>
            <a
              href={alumniData.facebook}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook className="social-icon facebook" />
            </a>
          </div>
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
