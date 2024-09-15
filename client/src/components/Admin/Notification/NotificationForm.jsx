import React, { useState } from "react";
import "./NotificationForm.css";

const NotificationForm = ({ onSend }) => {
  const [message, setMessage] = useState("");
  const [method, setMethod] = useState("email");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSend({ message, method });
    setMessage("");
  };

  return (
    <form onSubmit={handleSubmit} className="notification-form">
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter notification message..."
        required
      />
      <div className="form-footer">
        <select value={method} onChange={(e) => setMethod(e.target.value)}>
          <option value="email">Email</option>
          <option value="sms">SMS</option>
        </select>
        <button type="submit" disabled={!message}>Send Notification</button>
      </div>
    </form>
  );
};

export default NotificationForm;
