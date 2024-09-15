import React from 'react';
import './QuickActionCard.css';

const QuickActionCard = ({ icon, title, description }) => (
  <div className="quick-action-card">
    <div className="icon-container">{icon}</div>
    <div className="card-content">
      <h3 className="card-title">{title}</h3>
      <p className="card-description">{description}</p>
    </div>
  </div>
);

export default QuickActionCard;