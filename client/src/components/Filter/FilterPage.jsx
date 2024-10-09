import React, { useState, useEffect, useMemo } from "react";
import FilterBar from "./FilterBar";
import FilterAndSort from "./FilterAndSort";
import FilterResults from "./FilterResults";
import Pagination from "./Pagination";
import "./FilterPage.css";

const FilterPage = () => {
  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [appliedFilters, setAppliedFilters] = useState({});
  const [sortOrder, setSortOrder] = useState("ascending");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(50);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const fetchData = async () => {
    setLoading(true);
    try {
      const url = `https://alumni-apis.vercel.app/students?page=1&limit=2000&sort=batch&order=desc`;
      const response = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const result = await response.json();
      setAllData(result.data);
      applyFiltersAndSearch(result.data, appliedFilters, searchQuery, sortOrder);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("An error occurred while fetching data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    applyFiltersAndSearch(allData, appliedFilters, searchQuery, sortOrder);
  }, [allData, appliedFilters, searchQuery, sortOrder]);

  const applyFiltersAndSearch = (data, filters, query, order) => {
    let filtered = data.filter((alumni) => {
      // Apply filters
      const matchesFilters = Object.keys(filters).every((key) => {
        if (!filters[key]) return true;
        const filterValue = filters[key].toLowerCase();

        // Check if key matches in the top-level fields
        const alumniValue = alumni[key]?.toString().toLowerCase();
        let matchesTopLevel = alumniValue?.includes(filterValue);

        // Check nested education fields
        let matchesEducation = alumni.education?.some(edu => {
          return (
            edu.institute_name.toLowerCase().includes(filterValue) ||
            edu.course.toLowerCase().includes(filterValue) ||
            edu.passed_out_year.toString().includes(filterValue) ||
            edu.grade.toLowerCase().includes(filterValue)
          );
        });

        // Check nested work experience fields
        let matchesWorkExperience = alumni.work_experience?.some(work => {
          return (
            work.company_name.toLowerCase().includes(filterValue) ||
            work.company_address.toLowerCase().includes(filterValue) ||
            work.work_domain.toLowerCase().includes(filterValue) ||
            work.designation.toLowerCase().includes(filterValue) ||
            work.from_year.toString().includes(filterValue) ||
            work.to_year.toString().includes(filterValue)
          );
        });

        // Return true if matches top-level, education, or work experience
        return matchesTopLevel || matchesEducation || matchesWorkExperience;
      });

      // Apply search logic
      const matchesSearch = searchInObject(alumni, query);

      return matchesFilters && matchesSearch;
    });

    // Apply sorting
    filtered.sort((a, b) => {
      const nameA = `${a.student_name || ''}`.toLowerCase();
      const nameB = `${b.student_name || ''}`.toLowerCase();
      return order === "ascending" ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
    });

    setFilteredData(filtered);
    setTotalItems(filtered.length);
    setTotalPages(Math.ceil(filtered.length / itemsPerPage));
    setCurrentPage(1);
  };

  const handleFilter = (filters) => {
    setAppliedFilters(filters);
  };

  const handleSortChange = (sortValue) => {
    setSortOrder(sortValue);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  const handleClear = () => {
    setAppliedFilters({});
    setSortOrder("ascending");
    setSearchQuery("");
    setCurrentPage(1);
    applyFiltersAndSearch(allData, {}, "", "ascending");
  };

  const handlePageChange = (page) => setCurrentPage(page);

  // Define searchable fields, including education and work experience fields
  const searchableFields = [
    'roll_no', 'student_name', 'batch', 'degree', 'branch', 'department', 'date_of_birth',
    'education.institute_name', 'education.course', 'education.passed_out_year', 'education.grade',
    'work_experience.company_name', 'work_experience.work_domain', 'work_experience.designation',
    'work_experience.from_year', 'work_experience.to_year'
  ];

  // Search within object and nested education/work experience
  const searchInObject = (obj, searchTerm) => {
    if (!searchTerm) return true;
    const searchTermLower = searchTerm.toLowerCase();

    return searchableFields.some(field => {
      const [mainField, subField] = field.split('.');

      if (subField && Array.isArray(obj[mainField])) {
        // If it's a nested array (education or work experience)
        return obj[mainField].some(item => {
          const value = item[subField];
          if (value === null || value === undefined) return false;
          const stringValue = value.toString().toLowerCase();
          return stringValue.includes(searchTermLower);
        });
      } else {
        // Search in top-level fields
        const value = obj[mainField];
        if (value === null || value === undefined) return false;
        const stringValue = value.toString().toLowerCase();
        return stringValue.includes(searchTermLower);
      }
    });
  };

  const paginatedResults = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredData, currentPage, itemsPerPage]);

  return (
    <div className="filter-page">
      <div className="filter-content">
        <FilterBar onFilter={handleFilter} />
        <div className="main-content">
          <FilterAndSort 
            onSort={handleSortChange} 
            onSearchChange={handleSearchChange} 
            onClear={handleClear}
            totalResults={totalItems}
            sortOrder={sortOrder}
            searchQuery={searchQuery}
          />
          {loading && <div className="loading-message">Loading...</div>}
          {error && <div className="error-message">{error}</div>}
          {!loading && !error && (
            <>
              <FilterResults 
                filteredResults={paginatedResults}
                totalResults={totalItems}
              />
              <div className="pages">
                <Pagination 
                  currentPage={currentPage} 
                  totalPages={totalPages} 
                  onPageChange={handlePageChange} 
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterPage;