import React from 'react';
import { Home, Users, Bell, Calendar, Settings } from 'lucide-react';
import '../ManageAlumni/NavigationBar.css';

const EventNav = () => {
  return (
    <nav className="navigation-bar">
      <a href="#" className="nav-item"><Home size={20} /> Home</a>
      <a href="#" className="nav-item "><Users size={20} /> Alumni</a>
      <a href="#" className="nav-item "><Bell size={20} /> Notifications</a>
      <a href="#" className="nav-item active"><Calendar size={20} /> Events</a>
      <a href="#" className="nav-item"><Settings size={20} /> Settings</a>
    </nav>
  );
};

export default EventNav;