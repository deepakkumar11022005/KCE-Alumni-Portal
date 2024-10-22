import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faPhone,
  faEnvelopeOpen,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookF,
  faTwitter,
  faGooglePlusG,
  faTelegramPlane,
  faInstagram,
  faLinkedin,
  faLinkedinIn,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import kce_logo from "../../../../assets/images/kce-logo.gif";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="container">
        {/* CTA Section */}
        <div className="footer-cta">
          <div className="row">
            <div className="single-cta">
              <FontAwesomeIcon icon={faMapMarkerAlt} />
              <div className="cta-text">
                <h4>Find us</h4>
                <span>
                  Myleripalayam Village, Othakkal Mandapam Post, Coimbatore -
                  641032, Tamilnadu, India
                </span>
              </div>
            </div>

            <div className="single-cta">
              <FontAwesomeIcon icon={faPhone} />
              <div className="cta-text">
                <h4>Call us</h4>
                <span>9087729108 , 9080830623</span>
              </div>
            </div>

            <div className="single-cta">
              <FontAwesomeIcon icon={faEnvelopeOpen} />
              <div className="cta-text">
                <h4>Mail us</h4>
                <span>support.alumni@kce.ac.in</span>
              </div>
            </div>
          </div>

          <div className="cta-map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d8683.66308675203!2d77.01631997385518!3d10.879866309627852!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba84ffc9b3ea755%3A0xda7508a90583d22f!2sKarpagam%20College%20of%20Engineering!5e0!3m2!1sen!2sin!4v1729534954422!5m2!1sen!2sin"
              width="100%"
              height="450"
              allowFullScreen=""
              loading="lazy"
              title="Google Maps"
            ></iframe>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="footer-content">
          <div className="row">
            {/* Company Info */}
            <div className="footer-widget">
              <div className="footer-logo">
                <img src={kce_logo} alt="logo" />
              </div>
              <div className="footer-text">
                <p>
                  Lorem ipsum dolor sit amet, consec tetur adipisicing elit, sed
                  do eiusmod tempor incididuntut consec tetur adipisicing elit.
                </p>
              </div>
              <div className="footer-social-icon">
                <span>Follow us</span>
                <a href="#" className="facebook-bg">
                  <FontAwesomeIcon icon={faFacebookF} />
                </a>
                <a href="#" className="twitter-bg">
                  <FontAwesomeIcon icon={faTwitter} />
                </a>
                <a href="#" className="google-bg">
                  <FontAwesomeIcon icon={faInstagram} />
                </a>
                <a href="#" className="google-bg">
                  <FontAwesomeIcon icon={faLinkedinIn} />
                </a>
                <a href="#" className="google-bg">
                  <FontAwesomeIcon icon={faYoutube} />
                </a>

              </div>
            </div>

            {/* Useful Links */}
            <div className="footer-widget">
              <div className="footer-widget-heading">
                <h3>Useful Links</h3>
              </div>
              <ul>
                {[
                  "Home",
                  "About",
                  "Services",
                  "Portfolio",
                  "Contact",
                  "About Us",
                  "Our Services",
                  "Expert Team",
                  "Contact Us",
                  "Latest News",
                ].map((link, index) => (
                  <li key={index}>
                    <a href="#">{link}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Subscribe */}
            <div className="footer-widget">
              <div className="footer-widget-heading">
                <h3>FeedBack</h3>
              </div>
              <div className="footer-text">
                <p>
                  We value your feedback. Click the icon below to fill out the
                  feedback form.
                </p>
              </div>
              <div className="subscribe-form">
                <button>
                  <FontAwesomeIcon icon={faTelegramPlane} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="copyright-area">
        <div className="container">
          <div className="row">
            <div className="copyright-text">
              <p>
                Copyright &copy; 2024, All Right Reserved <a href="#">CSE</a>
              </p>
            </div>
            <div className="footer-menu">
              <ul>
                {["Home", "Terms", "Privacy", "Policy", "Contact"].map(
                  (item, index) => (
                    <li key={index}>
                      <a href="#">{item}</a>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
