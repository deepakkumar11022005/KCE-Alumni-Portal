import React from "react";
import "./PreviousNotifications.css";

const PreviousNotifications = ({ notifications }) => (
  <div className="previous-notifications">
    <h3>Previous Notifications</h3>
    {notifications.map((notif, index) => (
      <div key={index} className="notification-item">
        <p>{notif.message}</p>
        <span>
          {notif.method} • {notif.date}
        </span>
      </div>
    ))}
  </div>
);

export default PreviousNotifications;
