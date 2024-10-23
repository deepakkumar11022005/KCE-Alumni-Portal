import React, { useState, useEffect } from "react";
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

  const [batchOptions, setBatchOptions] = useState([]);
  const [companyOptions, setCompanyOptions] = useState([]);
  const [departmentOptions, setDepartmentOptions] = useState([]);
  const [domainOptions, setDomainOptions] = useState([]);
  const [locationOptions, setLocationOptions] = useState([]);
  const [roleOptions, setRoleOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        const response = await fetch("https://alumni-apis.vercel.app/options");
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const result = await response.json();
        if (result.success) {
          setBatchOptions(result.data.Batch || []);
          setCompanyOptions(result.data.Company || []);
          setDepartmentOptions(result.data.Department || []);
          setDomainOptions(result.data.Domain || []);
          setLocationOptions(result.data.Location || []);
          setRoleOptions(result.data.Role || []);
        } else {
          throw new Error("Failed to load options");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFilterOptions();
  }, []);

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

  if (isLoading) {
    return <div>Loading filter options...</div>;
  }

  if (error) {
    return <div>Error loading filter options: {error}</div>;
  }

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
              {departmentOptions.map((dept, index) => (
                <option key={index} value={dept}>{dept}</option>
              ))}
            </Select>

            <Select
              onChange={(e) => handleFilterChange("batch", e.target.value)}
              value={activeFilters.batch}
              aria-label="Select Batch"
            >
              <option value="">Select Batch</option>
              {batchOptions.map((batch, index) => (
                <option key={index} value={batch}>{batch}</option>
              ))}
            </Select>

            <Select
              onChange={(e) => handleFilterChange("location", e.target.value)}
              value={activeFilters.location}
              aria-label="Select Location"
            >
              <option value="">Select Location</option>
              {locationOptions.map((location, index) => (
                <option key={index} value={location}>{location}</option>
              ))}
            </Select>

            <Select
              onChange={(e) => handleFilterChange("company", e.target.value)}
              value={activeFilters.company}
              aria-label="Select Company"
            >
              <option value="">Select Company</option>
              {companyOptions.map((company, index) => (
                <option key={index} value={company}>{company}</option>
              ))}
            </Select>

            <Select
              onChange={(e) => handleFilterChange("domain", e.target.value)}
              value={activeFilters.domain}
              aria-label="Select Domain"
            >
              <option value="">Select Domain</option>
              {domainOptions.map((domain, index) => (
                <option key={index} value={domain}>{domain}</option>
              ))}
            </Select>

            <Select
              onChange={(e) => handleFilterChange("role", e.target.value)}
              value={activeFilters.role}
              aria-label="Select Role"
            >
              <option value="">Select Role</option>
              {roleOptions.map((role, index) => (
                <option key={index} value={role}>{role}</option>
              ))}
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
