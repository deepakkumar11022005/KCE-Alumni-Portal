import React, { useState } from "react";
import "./AlumniFilters.css";

const Select = ({ children, ...props }) => (
  <select className="custom-select" {...props}>
    {children}
  </select>
);

const Input = (props) => <input className="custom-input" {...props} />;

const Button = ({ children, ...props }) => (
  <button className="custom-button" {...props}>
    {children}
  </button>
);

const AlumniFilters = () => {
  const [activeFilters, setActiveFilters] = useState([]);

  const addFilter = (filter) => {
    if (!activeFilters.includes(filter)) {
      setActiveFilters([...activeFilters, filter]);
    }
  };

  const removeFilter = (filter) => {
    setActiveFilters(activeFilters.filter((f) => f !== filter));
  };

  return (
    <div className="alumni-filters-card">
      <div className="card-header">
        <h2 className="card-title">Alumni Explorer</h2>
        <Button className="advanced-filters-btn">
          Download
          <span className="chevron-down">▼</span>
        </Button>
      </div>
      <div className="card-content">
        {/* <div className="active-filters">
          {activeFilters.map(filter => (
            <span key={filter} className="filter-badge">
              {filter}
              <span className="remove-icon" onClick={() => removeFilter(filter)}>×</span>
            </span>
          ))}
        </div> */}

        <div className="filter-grid">
          <Select onChange={(e) => addFilter(`Department: ${e.target.value}`)}>
            <option value="">Select Department</option>
            <option value="CSE">Computer Science</option>
            <option value="ECE">Electronics</option>
            <option value="ME">Mechanical</option>
          </Select>
          <Select onChange={(e) => addFilter(`Batch: ${e.target.value}`)}>
            <option value="">Select Batch</option>
            <option value="2020">2020</option>
            <option value="2021">2021</option>
            <option value="2022">2022</option>
          </Select>
          <Select onChange={(e) => addFilter(`Location: ${e.target.value}`)}>
            <option value="">Select Location</option>
            <option value="New York">New York</option>
            <option value="San Francisco">San Francisco</option>
            <option value="London">London</option>
          </Select>

          <Select onChange={(e) => addFilter(`Location: ${e.target.value}`)}>
            <option value="">Select Company</option>
            <option value="New York">TCS</option>
            <option value="San Francisco">Accenture</option>
          </Select>
          <Select onChange={(e) => addFilter(`Location: ${e.target.value}`)}>
            <option value="">Select Domain</option>
            <option value="New York">UI / UX</option>
            <option value="San Francisco">Spring Boot</option>
          </Select>
          <Select onChange={(e) => addFilter(`Location: ${e.target.value}`)}>
            <option value="">Select Role</option>
            <option value="New York">Employee</option>
            <option value="San Francisco">Entreprenour</option>
          </Select>
        </div>
        <div className="filter-row2">
          <div className="search-container">
            <Input
              type="text"
              placeholder="Search by name, company, or role..."
              className="search-input"
            />
            <span className="search-icon">🔍</span>
          </div>
          <div className="sort-container">
            
            <Select defaultValue="relevance" className="sort-select">
            <option value="sort">Sort By</option>
              <option value="relevance">Relevance</option>
              <option value="recent">Most Recent</option>
              <option value="name">Name</option>
            </Select>
          </div>
         
          <Button className="apply-filters-btn">Apply Filters</Button>
       
        </div>
     
      </div>
    </div>
  );
};

export default AlumniFilters;
