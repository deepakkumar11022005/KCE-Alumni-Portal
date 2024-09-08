import React from "react";
import { FaGraduationCap, FaCalendarAlt, FaTrophy } from "react-icons/fa"; // Import icons from react-icons
import "./FilterCards.css"; // Ensure to add appropriate styles

const FilterCards = () => {
  const filters = [
    { title: "Alumni ", icon: <FaGraduationCap /> }, // Graduation cap icon
    { title: "Event", icon: <FaCalendarAlt /> }, // Calendar icon for events
    { title: "Excellence", icon: <FaTrophy /> },
    { title: "Hots", icon: <FaTrophy /> }, // Trophy icon for achievements
  ];

  return (
    <div className="filter-cards">
      {filters.map((filter, index) => (
        <div key={index} className="filter-card">
          <div className="icon-bar">
            {" "}
            <div className="filter-icon">{filter.icon}</div>{" "}
          </div>
          {/* Render icon */}
          <div className="">
            <h2>{filter.title}</h2>
            <div className="bar"></div>
          </div>{" "}
          {/* Bar element below each card */}
        </div>
      ))}
    </div>
  );
};

export default FilterCards;
