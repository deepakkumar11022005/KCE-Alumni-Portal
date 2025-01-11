import React, { useState } from "react";
import { 
  FaGraduationCap, 
  FaBriefcase, 
  FaMapMarkerAlt, 
  FaCalendarAlt, 
  FaLinkedin, 
  FaFacebook, 
  FaInstagram, 
  FaGithub 
} from "react-icons/fa";
import "./AlumniCard.css";
const AlumniCard = ({ alumni }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div 
      className={`alumni-card ${isExpanded ? 'expanded' : ''}`}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="alumni-card-header">
        <div className="alumni-avatar-container">
          <img 
            src={alumni.profile_image || "https://via.placeholder.com/150"}
            alt={`${alumni.student_name} profile`}
            className="alumni-avatar"
          />
          <div className="alumni-badge">
            <FaGraduationCap />
            <span>{alumni.batch}</span>
          </div>
        </div>
        <div className="alumni-basic-info">
          <h2>{alumni.student_name}</h2>
          <p>
            <FaMapMarkerAlt /> {alumni.location || 'Location Not Specified'}
          </p>
          <div className="alumni-social-links">
            {alumni.social_media.linkedin && (
              <a href={alumni.social_media.linkedin} target="_blank" rel="noopener noreferrer">
                <FaLinkedin />
              </a>
            )}
            {alumni.social_media.facebook && (
              <a href={alumni.social_media.facebook} target="_blank" rel="noopener noreferrer">
                <FaFacebook />
              </a>
            )}
            {alumni.social_media.instagram && (
              <a href={alumni.social_media.instagram} target="_blank" rel="noopener noreferrer">
                <FaInstagram />
              </a>
            )}
            {alumni.social_media.github && (
              <a href={alumni.social_media.github} target="_blank" rel="noopener noreferrer">
                <FaGithub />
              </a>
            )}
          </div>
        </div>
      </div>

      {isExpanded && (
        <div className="alumni-expanded-content">
          <div className="alumni-timeline">
            <div className="timeline-section education">
              <h3><FaGraduationCap /> Education</h3>
              {alumni.education.map((edu, index) => (
                <div key={index} className="timeline-item">
                  <div className="timeline-marker"></div>
                  <div className="timeline-content">
                    <h4>{edu.course}</h4>
                    <p>{edu.institute_name}</p>
                    <div className="timeline-meta">
                      <FaCalendarAlt /> {edu.passed_out_year}
                      <span className="grade-badge">Grade: {edu.grade}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="timeline-section work">
              <h3><FaBriefcase /> Work Experience</h3>
              {alumni.work_experience.map((job, index) => (
                <div key={index} className="timeline-item">
                  <div className="timeline-marker"></div>
                  <div className="timeline-content">
                    <h4>{job.designation}</h4>
                    <p>{job.company_name}</p>
                    <div className="timeline-meta">
                      <FaCalendarAlt /> {job.from_year} - {job.to_year}
                      <span className="domain-badge">{job.work_domain}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlumniCard;