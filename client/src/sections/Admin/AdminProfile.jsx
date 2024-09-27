import React, { useState } from 'react';
import './AdminProfile.css'; // Import the new CSS file
import { Key, User, Save, PlusCircle, AlertCircle } from 'lucide-react';
import { ProfileNav } from '../../components';

const AdminProfile = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [adminEmail, setAdminEmail] = useState('');

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    // Implement password change logic here
  };

  const handleAddAdmin = (e) => {
    e.preventDefault();
    // Implement logic to add new admin with email
    console.log('Adding new admin:', adminEmail);
  };

  return (
    <div className="admin-profile">
      <div className="">
        <h1 className="admin-title">KCE Alumni Admin Dashboard</h1>
      </div>
      <ProfileNav />

      <div className="profile-info">
            <User size={64} className="profile-icon" />
            <h3>John Doe</h3>
            <p>john.doe@example.com</p>
          </div>
      <div className="forms-container">
        <div className="form-section">
          <h2 className="section-title">Admin Profile</h2>
        
          <form onSubmit={handlePasswordSubmit} className="password-form">
            <h3>Change Password</h3>
            <div className="form-group">
              <label htmlFor="oldPassword">
                <Key size={20} />
                Old Password
              </label>
              <input
                type="password"
                id="oldPassword"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="newPassword">
                <Key size={20} />
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">
                <Key size={20} />
                Confirm New Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="submit-button">
              <Save size={20} />
              Change Password
            </button>
          </form>
        </div>

        <div className="form-section">
          <h2 className="section-title">Add New Admin</h2>
          <form onSubmit={handleAddAdmin} className="admin-email-form">
            <div className="form-group">
              <label htmlFor="adminEmail">
                <PlusCircle size={20} />
                Admin Email
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
            <AlertCircle size={20} className="alert-icon" />
            <p>
              <strong>Note:</strong> Adding a new admin grants them full access to the admin dashboard. Ensure you trust the person and they understand the responsibilities that come with admin privileges.
            </p>
          </div>
            <button type="submit" className="submit-button">
              <PlusCircle size={20} />
              Add Admin
            </button>
          </form>
         
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
