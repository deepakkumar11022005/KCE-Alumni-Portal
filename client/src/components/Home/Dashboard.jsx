import React from 'react';
import WelcomeBanner from './WelcomeBanner.jsx';
import FilterCards from './FilterCards.jsx';

const Dashboard = () => {
  return (
    <div className="welcome-alumni">
      <WelcomeBanner />
      <FilterCards />
    </div>
  );
};

export default Dashboard;
