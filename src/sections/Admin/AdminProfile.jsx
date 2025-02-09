import React, { useState } from "react";
import "./AdminProfile.css";
import { Key, User, Save, PlusCircle, AlertCircle, Loader } from "lucide-react";
import { ProfileNav } from "../../components";

const AdminProfile = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    console.log("Password change submitted");
  };

  const handleAddAdmin = async (e) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);
    try {
      const response = await fetch("https://alumni-apis.onrender.com/admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: adminEmail }),
      });

      const data = await response.json();
      setIsLoading(false);

      if (!response.ok) {
        throw new Error(data.message || "Failed to add admin");
      }

      setAdminEmail("");
      alert("New admin added successfully!");
    } catch (error) {
      setErrorMessage(error.message);
      console.error("Error adding admin:", error);
    }
  };

  return (
    <div className="admin-profile">
      <header className="admin-header">
        <h1 className="admin-title">KCE Alumni Admin Dashboard</h1>
      </header>
      <ProfileNav />

      <div className="admin-profile-info">
        <User size={64} className="admin-profile-icon" />
        <h3>John Doe</h3>
        <p>john.doe@example.com</p>
      </div>

      <div className="admin-forms-container">
        {/* Password Form Section */}
        <div className="admin-form-section">
          <h2 className="admin-section-title">Change Password</h2>
          <form onSubmit={handlePasswordSubmit} className="admin-password-form">
            <div className="admin-form-group">
              <label htmlFor="oldPassword">
                <Key size={20} /> Old Password
              </label>
              <input
                type="password"
                id="oldPassword"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                required
              />
            </div>
            <div className="admin-form-group">
              <label htmlFor="newPassword">
                <Key size={20} /> New Password
              </label>
              <input
                type="password"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <div className="admin-form-group">
              <label htmlFor="confirmPassword">
                <Key size={20} /> Confirm New Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="admin-submit-button">
              <Save size={20} /> Change Password
            </button>
          </form>
        </div>

        {/* Add Admin Form Section */}
        <div className="admin-form-section">
          <h2 className="admin-section-title">Add New Admin</h2>
          <form onSubmit={handleAddAdmin} className="admin-email-form">
            {errorMessage && (
              <div className="admin-error-message">
                <AlertCircle size={20} className="admin-alert-icon" />
                {errorMessage}
              </div>
            )}
            <div className="admin-form-group">
              <label htmlFor="adminEmail">
                <PlusCircle size={20} /> Admin Email
              </label>
              <input
                type="email"
                id="adminEmail"
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                required
                placeholder="Enter admin email"
              />
            </div>
            <div className="admin-note">
              <AlertCircle size={20} className="admin-alert-icon" />
              <p>
                <strong>Note:</strong> Adding a new admin grants them full
                access to the admin dashboard. Ensure you trust the person and
                they understand the responsibilities that come with admin
                privileges.
                <ul>
                  <li>
                    Admins are responsible for maintaining security and ensuring
                    data privacy.
                  </li>
                  <li>
                    Admins should follow proper procedures for managing users
                    and system resources to avoid conflicts or errors.
                  </li>
                </ul>
              </p>
            </div>
            <button
              type="submit"
              className="admin-submit-button"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader size={20} className="admin-loading-spinner" />
                  Processing...
                </>
              ) : (
                <>
                  <PlusCircle size={20} /> Add Admin
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
