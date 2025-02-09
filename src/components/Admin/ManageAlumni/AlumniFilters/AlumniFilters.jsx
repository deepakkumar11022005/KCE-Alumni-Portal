import React, { useState, useEffect } from "react";
import "./AlumniFilters.css"; // Ensure this file includes the necessary styles

const Select = ({ children, ...props }) => (
  <select className="filter-select" {...props}>
    {children}
  </select>
);

const Button = ({ children, ...props }) => (
  <button className="filter-button" {...props}>
    {children}
  </button>
);

const AlumniFilters = ({ onApplyFilters }) => {
  const [activeFilters, setActiveFilters] = useState({
    department: "",
    batch: "",
  });

  const [batchOptions, setBatchOptions] = useState([]);
  const [departmentOptions, setDepartmentOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Loading state
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
          setDepartmentOptions(result.data.Department || []);
        } else {
          throw new Error("Failed to load options");
        }
      } catch (error) {
        setError(error.message);
      }
    };

    fetchFilterOptions();
  }, []);

  const handleFilterChange = (field, value) => {
    const newFilters = {
      ...activeFilters,
      [field]: value,
    };
    // console.log(newFilters);
    
    setActiveFilters(newFilters);
   
  };

  const handleSubmit = async (e) => {
    // onApplyFilters(newFilters);
    e.preventDefault();
   
    setIsLoading(true); // Set loading state to true when submitting
    // Simulate an API request or any processing logic here
    setTimeout(() => {
      setIsLoading(false); // Reset loading state after 3 seconds
    }, 3000); // Simulated 3-second process
  };

  if (error) return <div className="error-message">Error loading filter options: {error}</div>;

  return (
    <div className="alumni-filters">
      <form onSubmit={handleSubmit}> {/* Wrap the filter form in a <form> element */}
        <div className="filters-container">
          <div className="filter-item">
            <Select
              onChange={(e) => handleFilterChange("department", e.target.value)}
              value={activeFilters.department}
              aria-label="Select Department"
              required
            >
              <option value="">Select Department</option>
              {departmentOptions.map((dept, index) => (
                <option key={index} value={dept}>{dept}</option>
              ))}
            </Select>
          </div>

          <div className="filter-item">
            <Select
              onChange={(e) => handleFilterChange("batch", e.target.value)}
              value={activeFilters.batch}
              aria-label="Select Batch"
              required
            >
              <option value="">Select Batch</option>
              {batchOptions.map((batch, index) => (
                <option key={index} value={batch}>{batch}</option>
              ))}
            </Select>
          </div>

          <Button onClick={handleSubmit} type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <div className="admin-loading-spinner" /> Processing...
              </>
            ) : (
              <>
                <span>Apply Filters</span>
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AlumniFilters;
