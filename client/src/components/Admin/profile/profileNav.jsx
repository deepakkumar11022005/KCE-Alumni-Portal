import React from 'react';
import { Home, Users, Bell, Calendar, Settings } from 'lucide-react';
import './profileNav.css';

const ProfileNav = () => {
  return (
    <nav className="navigation-bar">
      <a href="#" className="nav-item"><Home size={20} /> Home</a>
      <a href="#" className="nav-item "><Users size={20} /> Alumni</a>
      <a href="#" className="nav-item"><Bell size={20} /> Notifications</a>
      <a href="#" className="nav-item"><Calendar size={20} /> Events</a>
      <a href="#" className="nav-item active"><Settings size={20} /> Profile</a>
    </nav>
  );
};

export default ProfileNav;