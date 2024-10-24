import React, { useState } from "react";
import "./AdminNotification.css";
import {
  NotificationForm,
  PreviousNotifications,
  NotificationNav,
  AlumniFilters,
} from "../../components";

const AdminNotification = () => {
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successDetails, setSuccessDetails] = useState(null);
  const [appliedFilters, setAppliedFilters] = useState({
    department: "",
    batch: "",
  });

  const handleSendNotification = async (notificationData) => {
    setLoading(true);
    setError(null);
    setSuccessDetails(null);

    try {
      const payload = {
        ...notificationData,
        department: appliedFilters.department,
        batch: appliedFilters.batch,
      };

      const response = await fetch(
        "https://alumni-apis.vercel.app/send-notification",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log(result)

      // Add the new notification to the list with current timestamp
      const notificationWithDetails = {
        ...payload,
        date: new Date().toLocaleString(),
      };

      setNotifications((prevNotifications) => [
        notificationWithDetails,
        ...prevNotifications,
      ]);

      // Set success details
      setSuccessDetails(result);
    } catch (error) {
      console.error("Error sending notification:", error);
      setError("Failed to send notification. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = (filters) => {
    setAppliedFilters(filters);
  };

  return (
    <div className="admin-notification">
      <h1 className="admin-title">KCE Alumni Admin Dashboard</h1>
      <NotificationNav />
      <h2 className="page-title">Manage Notifications</h2>

      <AlumniFilters onApplyFilters={handleFilter} />

      {error && <div className="error-message">{error}</div>}

      {successDetails && (
        <div className="success-details">
          <div className="success-message">{successDetails.message}</div>
          <div className="success-stats">
            <div className="notification-stat">
              <span className="font-semibold">Emails Sent:</span>
              <span className="stat-value">
                {successDetails.success_email_count}
              </span>
            </div>
            <div className="notification-stat">
              <span className="font-semibold">Messages Sent:</span>
              <span className="stat-value">
                {successDetails.success_message_count}
              </span>
            </div>
          </div>
        </div>
      )}

      <NotificationForm
        onSend={handleSendNotification}
        loading={loading}
        selectedFilters={appliedFilters}
      />

      {/* <PreviousNotifications notifications={notifications} /> */}
    </div>
  );
};

export default AdminNotification;
