import React, { useState } from "react";
import "./AdminNotification.css";
import { NotificationForm, PreviousNotifications, NotificationNav, AlumniFilters, SelectAlumni } from "../../components";

const AdminNotification = () => {
  const [notifications, setNotifications] = useState([]);
  const [selectedAlumni, setSelectedAlumni] = useState([]);

  const handleSendNotification = (newNotification) => {
    const notificationWithDate = {
      ...newNotification,
      date: new Date().toLocaleString(),
      recipients: selectedAlumni,
    };
    setNotifications([notificationWithDate, ...notifications]);
    // Simulate sending notification to the backend service
    console.log("Sending notification to:", selectedAlumni, "with message:", notificationWithDate);
  };

  return (
    <div className="admin-notification">
      <h1 className="admin-title">KCE Alumni Admin Dashboard</h1>
      <NotificationNav />
      <h2 className="page-title">Manage Notifications</h2>
      <AlumniFilters />
      <SelectAlumni onSelectAlumni={setSelectedAlumni} />
      <NotificationForm onSend={handleSendNotification} />
      <PreviousNotifications notifications={notifications} />
    </div>
  );
};

export default AdminNotification;
