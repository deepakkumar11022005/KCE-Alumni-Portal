import React, { useState, useEffect } from "react";
import {
  FilterBar,
  FilterAndSort,
  FilterResults,
  Pagination,
} from "../";
import "./FilterPage.css";

const FilterPage = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showFilterBar, setShowFilterBar] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState({});
  const [sortOrder, setSortOrder] = useState("ascending");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage] = useState(20); // Set the number of items per page

  const fetchData = async (url) => {
    setLoading(true); // Start loading
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result = await response.json();
      setData(result.data || []);
      setTotalPages(result.pagination.totalPages); // Set total pages from response
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("An error occurred while fetching data. Please try again later.");
    } finally {
      setLoading(false); // End loading
    }
  };

  useEffect(() => {
    const url = `https://alumni-apis.vercel.app/students?page=${currentPage}&limit=${itemsPerPage}&sort=batch&order=desc`;
    fetchData(url);
  }, [currentPage]);

  const toggleFilterBar = () => {
    setShowFilterBar(!showFilterBar);
  };

  const handleFilter = (filters) => {
    setAppliedFilters(filters);
    setCurrentPage(1); // Reset to first page when filters are applied
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
    setCurrentPage(1); // Reset to first page when filters are cleared
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Filtering logic for all data
  const filteredAlumnis = data
    .filter((alumni) => {
      const matchesFilters = Object.keys(appliedFilters).every((key) => {
        if (!appliedFilters[key]) return true;
        return alumni[key]
          ?.toString()
          .toLowerCase()
          .includes(appliedFilters[key].toLowerCase());
      });

      const matchesSearch = `${alumni.first_name} ${alumni.last_name}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      return matchesFilters && matchesSearch;
    })
    .sort((a, b) => {
      if (sortOrder === "ascending") {
        return a.first_name.localeCompare(b.first_name);
      } else {
        return b.first_name.localeCompare(a.first_name);
      }
    });

  return (
    <div className="filter-page">
      <div className="filter-content">
        <FilterBar
          showFilterBar={showFilterBar}
          toggleFilterBar={toggleFilterBar}
          onFilter={handleFilter}
        />
        <div className="main-content">
          <FilterAndSort
            onSort={handleSortChange}
            onSearchChange={handleSearchChange}
            onClear={handleClear}
          />
          {loading && <div className="loading-message">Loading...</div>}
          {error && <div className="error-message">{error}</div>}
          {!loading && !error && (
            <>
              <FilterResults filteredResults={filteredAlumnis} />
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
