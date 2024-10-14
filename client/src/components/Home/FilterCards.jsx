import React, { useState } from "react";
import "./FilterCards.css";

const FilterCards = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const filters = [
    { title: "Alumni", color: "rgba(46, 204, 113, 0.9)", icon: "🎓" },
    { title: "Event", color: "rgba(243, 156, 18, 0.9)", icon: "📅" },
    { title: "Excellence", color: "rgba(241, 196, 15, 0.9)", icon: "🏆" },
    { title: "Hots", color: "rgba(52, 152, 219, 0.9)", icon: "🔥" },
  ];

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  return (
    <div className="filter-cards">
      {filters.map((filter, index) => (
        <div
          key={index}
          className="cardd"
          style={{ backgroundColor: filter.color }}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
        >
          <div className="text">
            <span className="icon">{filter.icon}</span>
            <span className="title">{filter.title}</span>
          </div>
          <button className="view-more-btn">
            View More
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`arrow-icon ${hoveredIndex === index ? 'animate' : ''}`}
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
};

export default FilterCards;
