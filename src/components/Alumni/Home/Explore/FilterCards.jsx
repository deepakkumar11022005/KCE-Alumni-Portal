import React, { useState } from "react";
import "./FilterCards.css";
import {filters} from "../../../../assets/JSON/AlumniHomeFilterCard.json"
const ExploreCards = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  return (
    <div className="filter-cards-container">
      <h1 className="filter-cards-title">Explore Our Services</h1>
      <p className="filter-cards-subtitle">Discover what's new and important at a glance.</p>

      <div className="filter-cards">
        {filters.map((filter, index) => (
          <div
            key={index}
            className={`cardd ${hoveredIndex === index ? "hovered" : ""}`}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            <div className="card-icon">
              <span role="img" aria-label={filter.title}>
                {filter.icon}
              </span>
            </div>
            <div className="card-content">
              <h3>{filter.title}</h3>
              <p>{filter.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExploreCards;
