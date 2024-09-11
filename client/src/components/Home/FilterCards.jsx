import React from "react";
import { FaGraduationCap, FaCalendarAlt, FaTrophy } from "react-icons/fa";
import "./FilterCards.css";

const FilterCards = () => {
  const filters = [
    { title: "Alumni", icon: <FaGraduationCap /> },
    { title: "Event", icon: <FaCalendarAlt /> },
    { title: "Excellence", icon: <FaTrophy /> },
    { title: "Hots", icon: <FaTrophy /> },
  ];

  return (
    <div className="filter-cards">
      {filters.map((filter, index) => (
        <div key={index} className="filter-card">
          <div className="icon-bar">
            <div className="filter-icon">{filter.icon}</div>
          </div>
          <h2>{filter.title}</h2>
        </div>
      ))}
    </div>
  );
};

export default FilterCards;
