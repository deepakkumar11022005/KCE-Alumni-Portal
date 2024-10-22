import React, { useState } from "react";
import "./ArchiveSidebar.css";

const ArchiveSidebar = ({ events, onFilterChange, onClear }) => {
  const [openYear, setOpenYear] = useState(null);

  // Extract unique years and months from events
  const eventsByYear = events.reduce((acc, event) => {
    const year = new Date(event.event_date).getFullYear();
    const month = new Date(event.event_date).toLocaleString('default', { month: 'long' });
    
    if (!acc[year]) {
      acc[year] = {};
    }
    
    if (!acc[year][month]) {
      acc[year][month] = 0;
    }
    
    acc[year][month] += 1;
    return acc;
  }, {});

  // Toggle dropdown for selected year
  const handleYearToggle = (year) => {
    setOpenYear(openYear === year ? null : year);
  };

  // Handle year and month filtering
  const handleFilter = (year, month) => {
    onFilterChange(year, month);
  };

  return (
    <div className="archive-sidebar">
      <div className="archive-header">
        <h3>Archive</h3>
        <button className="clear-button" onClick={onClear}>✕ Clear</button>
      </div>

      {Object.keys(eventsByYear).map((year) => (
        <div key={year} className="year-section">
          <h4 onClick={() => handleYearToggle(year)} className="year-header">
            {year} <span>{openYear === year ? '▲' : '▼'}</span>
          </h4>
          {openYear === year && (
            <ul className="months-list">
              {Object.keys(eventsByYear[year]).map((month) => (
                <li key={month} className="month-item" onClick={() => handleFilter(year, month)}>
                  {month} <span>({eventsByYear[year][month]})</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

export default ArchiveSidebar;
