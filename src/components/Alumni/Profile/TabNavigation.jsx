
// src/components/AlumniProfile/TabNavigation.jsx
import React from 'react';

const TabNavigation = ({ activeTab, setActiveTab }) => (
  <div className="alumni-profile-tabs">
    {['personal', 'education', 'work'].map((tab) => (
      <button
        key={tab}
        className={`alumni-profile-tab-button ${activeTab === tab ? 'active' : ''}`}
        onClick={() => setActiveTab(tab)}
      >
        {tab.charAt(0).toUpperCase() + tab.slice(1)} Info
      </button>
    ))}
  </div>
);

export default TabNavigation;
