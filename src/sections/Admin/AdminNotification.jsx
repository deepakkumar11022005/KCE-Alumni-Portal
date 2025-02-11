import React, { useState, useEffect } from "react";
import NotificationNav from "../../components/Admin/Notification/NotificationNav/NotificationNav";
import './AdminNotification.css'
const AdminNotification = () => {
  const [activeFilters, setActiveFilters] = useState({
    department: "",
    batch: "",
  });
  const [batchOptions, setBatchOptions] = useState([]);
  const [departmentOptions, setDepartmentOptions] = useState([]);
  const [message, setMessage] = useState("");
  const [notificationType, setNotificationType] = useState("email");
  const [subject, setSubject] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successDetails, setSuccessDetails] = useState(null);

  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        const response = await fetch("https://alumni-apis.onrender.com/options");
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const result = await response.json();
        if (result.success) {
          setBatchOptions(result.data.Batch || []);
          setDepartmentOptions(result.data.Department || []);
        } else {
          throw new Error("Failed to load options");
        }
      } catch (error) {
        setError(error.message);
      }
    };

    fetchFilterOptions();
  }, []);

  const handleSendNotification = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessDetails(null);

    const payload = {
      department: activeFilters.department,
      batch: activeFilters.batch,
      message,
      notification_type: notificationType,
      subject,
    };

    try {
      const response = await fetch(
        "https://alumni-apis.onrender.com/send-notification",
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
      setSuccessDetails(result);
      setMessage("");
      setSubject("");
      setActiveFilters({ department: "", batch: "" });
    } catch (error) {
      setError("Failed to send notification. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-notification-container">
      <header className="admin-notification-header">
        <h1 className="admin-notification-title">KCE Alumni Admin Dashboard</h1>
      </header>
      
      <NotificationNav />
      
      <h2 className="admin-notification-subtitle">Manage Notification</h2>
      
      <p className="admin-note">
        Note: Notifications related to jobs are queued. You will be notified
        after all emails have been sent. Please ensure the email subject and
        message are clear and concise for better communication with the
        recipients.
      </p>

      {error && (
        <div className="admin-notification-error">{error}</div>
      )}
      
      {successDetails && (
        <div className="admin-notification-success">
          <div>{successDetails.message}</div>
          <div>Emails Sent: {successDetails.success_email_count}</div>
          <div>Messages Sent: {successDetails.success_message_count}</div>
        </div>
      )}

      <form
        onSubmit={handleSendNotification}
        className="admin-notification-form-container"
      >
        <div className="admin-notification-filters">
          <select
            className="admin-notification-select"
            value={activeFilters.department}
            onChange={(e) =>
              setActiveFilters((prev) => ({
                ...prev,
                department: e.target.value,
              }))
            }
            required
          >
            <option value="">Select Department</option>
            {departmentOptions.map((dept, index) => (
              <option key={index} value={dept}>
                {dept}
              </option>
            ))}
          </select>

          <select
            className="admin-notification-select"
            value={activeFilters.batch}
            onChange={(e) =>
              setActiveFilters((prev) => ({ ...prev, batch: e.target.value }))
            }
            required
          >
            <option value="">Select Batch</option>
            {batchOptions.map((batch, index) => (
              <option key={index} value={batch}>
                {batch}
              </option>
            ))}
          </select>
        </div>

        <div className="admin-notification-content">
          <input
            type="text"
            className="admin-notification-input"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Enter Subject"
            required
          />

          <textarea
            className="admin-notification-textarea"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter Message"
            required
          />
        </div>
        
        <div className="admin-notification-actions">
          <select
            className="admin-notification-type-select"
            value={notificationType}
            onChange={(e) => setNotificationType(e.target.value)}
          >
            <option value="email">Email</option>
            <option value="sms" disabled>SMS</option>
          </select>

          <button
            type="submit"
            className="admin-notification-submit"
            disabled={
              loading ||
              !message ||
              !subject ||
              !activeFilters.department ||
              !activeFilters.batch
            }
          >
            {loading ? "Sending..." : "Send Notification"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminNotification;