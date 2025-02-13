// AdminHome.jsx
import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, Bell, Calendar, UserCog, Moon, Sun } from 'lucide-react';
import { Link } from 'react-router-dom';
import './AdminHome.css';
import { QuickActionCard, FilterButton, NotificationsSection } from '../../components';

const mockData = [
  { name: 'Jan', alumni: 400 },
  { name: 'Feb', alumni: 300 },
  { name: 'Mar', alumni: 200 },
  { name: 'Apr', alumni: 278 },
  { name: 'May', alumni: 189 },
  { name: 'Jun', alumni: 239 },
];

const AdminHome = ({adminAuthData}) => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode');
  };

  return (
    <div className={`admin-home ${darkMode ? 'dark-mode' : ''}`}>
      <div className="admin-header">
        <h1 className="admin-title">KCE Alumni Admin Dashboard</h1>
        <p className="admin-username">{adminAuthData.username}</p>
      </div>
      
      <div className="quick-actions">
        <Link to="/admin/manage-alumni">
          <QuickActionCard icon={<Users size={24} />} title="Manage Alumni" description="View and edit alumni data" />
        </Link>
        <Link to="/admin/notification">
          <QuickActionCard icon={<Bell size={24} />} title="Notification" description="Send updates to alumni" />
        </Link>
        <Link to="/admin/event">
          <QuickActionCard icon={<Calendar size={24} />} title="Events" description="Manage upcoming events" />
        </Link>
        <Link to="/admin/profile">
          <QuickActionCard icon={<UserCog size={24} />} title="Profile Updates" description="Review profile changes" />
        </Link>
      </div>
      
      <div className="dashboard-content">
        <div className="chart-container">
          <h2 className="section-title">Alumni Registration Trend</h2>
          <div className="chart">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={mockData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="alumni" stroke="#8884d8" strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="filters-container">
           {/* add notification components */}
          <NotificationsSection/>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
