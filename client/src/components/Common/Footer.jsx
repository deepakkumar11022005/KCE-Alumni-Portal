import React from 'react';
import './Footer.css';
import principal from '../../assets/images/principal.jpeg';
import chairman from '../../assets/images/chairman.jpg';
 
import { FaLinkedin, FaFacebook, FaEnvelope, FaSpa } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      {/* <div className="footer-container">
       
        <div className="footer-section">
          <h4>Chairman</h4>
          <div className="footer-person-info">
            <img
              src={chairman}
              alt="Chairman"
              className="footer-img"
            />
            <div className="footer-details">
              <p className="footer-name">Dr.R.Vasanthakumar</p>
              <p className="footer-position">Chairman, KCE</p>
              <div className="footer-socials">
                <a href="mailto:chairman@kce.edu" className="footer-social-icon"><FaEnvelope /></a>
                <a href="https://linkedin.com/in/chairman-profile" className="footer-social-icon"><FaLinkedin /></a>
                <a href="https://facebook.com/chairman-profile" className="footer-social-icon"><FaFacebook /></a>
              </div>
            </div>
          </div>
        </div>

       
        <div className="footer-section">
          <h4>Principal</h4>
          <div className="footer-person-info">
            <img
              src={principal}
              alt="Principal"
              className="footer-img"
            />
            <div className="footer-details">
              <p className="footer-name">Dr.V. Kumar Chinnaiyan</p>
              <p className="footer-position">Principal, KCE</p>
              <div className="footer-socials">
                <a href="mailto:principal@kce.edu" className="footer-social-icon"><FaEnvelope /></a>
                <a href="https://linkedin.com/in/principal-profile" className="footer-social-icon"><FaLinkedin /></a>
                <a href="https://facebook.com/principal-profile" className="footer-social-icon"><FaFacebook /></a>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      {/* Footer Links and Contact Info */}
      <div className="footer-links-container">
        <div className="footer-section-details">
          <h4>About Us</h4>
          <p>
            This Project holds great potential to connect and engage alumni, fostering a strong community and providing valuable resources for career development.
          </p>
        </div>

        <div className="footer-section-details">
          <h4>Contact Us</h4>
          <p>Karpagam College of Engineering, Coimbatore</p>
          <p>Email: <a href="mailto:kce.alumini@gmail.com" className="footer-link">kce.alumini@gmail.com</a></p>
        </div>

        {/* Map Section */}
        <div className="footer-section-details">
          <h4>Find Us</h4>
          <div className="footer-map">
            <iframe
              title="KCE Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.669348587468!2d76.9544901148002!3d11.01221529214967!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba859ce6f6b7ff9%3A0xa57f0e0a1fbc320f!2sKarpagam%20College%20of%20Engineering!5e0!3m2!1sen!2sin!4v1694176176069!5m2!1sen!2sin"
              
              allowFullScreen=""
              loading="lazy"
            />
          </div>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className="footer-bottom">
        <p>© 2024 KCE. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
