import React, { useState } from "react";
import "./ContactUs.css";
import { Footer, Header, NavBar } from "../../components";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    subject: "",
    message: "",
  });
  const [responseMessage, setResponseMessage] = useState(null);
  const [isError, setIsError] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://alumni-apis.vercel.app/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          contact_no: formData.contact,
          subject: formData.subject,
          description: formData.message,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setResponseMessage("Feedback added successfully!");
        setIsError(false);
      } else {
        setResponseMessage(data.message || "An error occurred while submitting feedback.");
        setIsError(true);
      }
    } catch (error) {
      setResponseMessage("An error occurred while submitting feedback. Please try again later.");
      setIsError(true);
    }
  };

  return (
    <>
      <Header />
      <div className="contactParent">
        <div className="simple-contact-form-container">
          <h1 className="contact-heading">Contact</h1>
          <p className="contact-description">Please use the form below to contact us</p>

          {/* Display response message */}
          {responseMessage && (
            <div
              className={`response-message ${
                isError ? "error-message" : "success-message"
              }`}
            >
              {responseMessage}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group-horizontal">
              <label htmlFor="name">Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group-horizontal">
              <label htmlFor="email">Personal Email ID *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group-horizontal">
              <label htmlFor="contact">Contact No. *</label>
              <input
                type="tel"
                id="contact"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group-horizontal">
              <label htmlFor="subject">Subject *</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group-horizontal">
              <label htmlFor="message">Message *</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="contact-submit-btn">Submit</button>
          </form>
        </div>
      </div>
      <Footer />
      <NavBar />
    </>
  );
};

export default ContactUs;
