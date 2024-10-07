import React, { useState } from "react";
import "./AlumniFilters.css";

const Select = ({ children, ...props }) => (
  <select className="select-input" {...props}>
    {children}
  </select>
);

const Input = (props) => <input className="text-input" {...props} />;

const Button = ({ children, ...props }) => (
  <button className="button" {...props}>
    {children}
  </button>
);

const AlumniFilters = ({ onApplyFilters, searchQuery, setSearchQuery }) => {
  const [activeFilters, setActiveFilters] = useState({
    department: "",
    batch: "",
    location: "",
    company: "",
    domain: "",
    role: "",
  });

  const handleFilterChange = (field, value) => {
    setActiveFilters((prevFilters) => ({
      ...prevFilters,
      [field]: value,
    }));
  };

  const applyFilters = () => {
    onApplyFilters(activeFilters);
  };

  const clearFilters = () => {
    setActiveFilters({
      department: "",
      batch: "",
      location: "",
      company: "",
      domain: "",
      role: "",
    });
    setSearchQuery("");
    onApplyFilters({});
  };

  return (
    <div className="filters-container">
      <form onSubmit={(e) => { e.preventDefault(); applyFilters(); }}>
        <div className="filters-header">
          <h2 className="filters-title">Alumni Explorer</h2>
          <Button className="download-button" type="button">
            Download
            <span className="dropdown-icon">▼</span>
          </Button>
        </div>
        <div className="filters-content">
          <div className="filters-grid">
            <Select 
              onChange={(e) => handleFilterChange("department", e.target.value)}
              value={activeFilters.department}
              aria-label="Select Department"
            >
              <option value="">Select Department</option>
              <option value="CSE">Computer Science</option>
              <option value="ECE">Electronics</option>
              <option value="ME">Mechanical</option>
            </Select>
            <Select 
              onChange={(e) => handleFilterChange("batch", e.target.value)}
              value={activeFilters.batch}
              aria-label="Select Batch"
            >
              <option value="">Select Batch</option>
              <option value="2020">2020</option>
              <option value="2021">2021</option>
              <option value="2022">2022</option>
            </Select>
            <Select 
              onChange={(e) => handleFilterChange("location", e.target.value)}
              value={activeFilters.location}
              aria-label="Select Location"
            >
              <option value="">Select Location</option>
              <option value="New York">New York</option>
              <option value="San Francisco">San Francisco</option>
              <option value="London">London</option>
            </Select>
            <Select 
              onChange={(e) => handleFilterChange("company", e.target.value)}
              value={activeFilters.company}
              aria-label="Select Company"
            >
              <option value="">Select Company</option>
              <option value="TCS">TCS</option>
              <option value="Accenture">Accenture</option>
            </Select>
            <Select 
              onChange={(e) => handleFilterChange("domain", e.target.value)}
              value={activeFilters.domain}
              aria-label="Select Domain"
            >
              <option value="">Select Domain</option>
              <option value="UI/UX">UI / UX</option>
              <option value="Spring Boot">Spring Boot</option>
            </Select>
            <Select 
              onChange={(e) => handleFilterChange("role", e.target.value)}
              value={activeFilters.role}
              aria-label="Select Role"
            >
              <option value="">Select Role</option>
              <option value="Employee">Employee</option>
              <option value="Entrepreneur">Entrepreneur</option>
            </Select>
          </div>
          <div className="filters-row">
            <div className="search-wrapper">
              <Input
                type="text"
                placeholder="Search by name, company, or role..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search alumni"
              />
              <span className="search-icon" aria-hidden="true">🔍</span>
            </div>
            <div className="filter-buttons">
              <Button className="apply-buttons" type="submit">
                Apply Filters
              </Button>
              <Button className="clear-btn" onClick={clearFilters} type="button">
                Clear 
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AlumniFilters;