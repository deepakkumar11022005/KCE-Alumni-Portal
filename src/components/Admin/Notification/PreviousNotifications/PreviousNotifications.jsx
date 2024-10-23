import React from "react";
import "./PreviousNotifications.css";

const PreviousNotifications = ({ notifications }) => (
  <div className="previous-notifications">
    <h3>Previous Notifications</h3>
    {notifications.length === 0 ? (
      <div className="no-notifications">No notifications sent yet</div>
    ) : (
      notifications.map((notif, index) => (
        <div key={index} className="notification-item">
          <div className="notification-header">
            <h4>{notif.subject}</h4>
            <span className="notification-meta">
              {notif.method} • {notif.date} • {notif.recipients.length} recipients
            </span>
          </div>
          <p className="notification-message">{notif.message}</p>
        </div>
      ))
    )}
  </div>
);
export default PreviousNotifications;
