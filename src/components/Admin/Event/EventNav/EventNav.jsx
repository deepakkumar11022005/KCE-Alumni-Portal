// EventNav.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Users, Bell, Calendar, Settings } from 'lucide-react';
// import '../ManageAlumni/NavigationBar/NavigationBar.css';

const EventNav = () => {
  return (
    <nav className="navigation-bar">
      <Link to="/admin" className="nav-item"><Home size={20} /> Home</Link>
      <Link to="/admin/manage-alumni" className="nav-item"><Users size={20} /> Alumni</Link>
      <Link to="/admin/notification" className="nav-item"><Bell size={20} /> Notifications</Link>
      <Link to="/admin/event" className="nav-item active"><Calendar size={20} /> Events</Link>
      <Link to="/admin/profile" className="nav-item"><Settings size={20} /> Profile</Link>
    </nav>
  );
};

export default EventNav;
