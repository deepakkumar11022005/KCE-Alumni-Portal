import React, { useState, useEffect } from "react";
import { Users, Upload, Plus } from "lucide-react";
import {
  AlumniFilters,
  AlumniForm,
  CSVUpload,
  AlumniTable,
  Pagination,
  NavigationBar,
} from "../../components";
import "./ManageAlumni.css";

const ManageAlumni = () => {
  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [appliedFilters, setAppliedFilters] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [view, setView] = useState("table");
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleViewChange = (newView) => {
    setView(newView);
  };

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const url = `https://alumni-apis.vercel.app/students?sort=batch&order=desc`;
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
      setAllData(result.data);
      setTotalItems(result.data.length);
      applyFiltersAndSearch(result.data, appliedFilters, searchQuery);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("An error occurred while fetching data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  useEffect(() => {
    applyFiltersAndSearch(allData, appliedFilters, searchQuery);
  }, [allData, appliedFilters, searchQuery]);

  const applyFiltersAndSearch = (data, filters, query) => {
    let filtered = data.filter((alumni) => {
      // Apply filters
      const matchesFilters = Object.keys(filters).every((key) => {
        if (!filters[key]) return true;
        const filterValue = filters[key].toLowerCase();
        const alumniValue = alumni[key]?.toString().toLowerCase();
        return alumniValue?.includes(filterValue);
      });

      // Apply search
      const matchesSearch = searchInObject(alumni, query);

      return matchesFilters && matchesSearch;
    });

    setFilteredData(filtered);
    setTotalItems(filtered.length);
    setTotalPages(Math.ceil(filtered.length / itemsPerPage));
    setCurrentPage(1);
  };

  const handleFilter = (filters) => {
    setAppliedFilters(filters);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  // Define searchable fields
  const searchableFields = [
    'first_name', 'last_name', 'email', 'mobile_number', 'blood_group', 
    'date_of_birth', 'aadhar_number', 'pan_number', 'department', 'degree', 
    'batch_start_year', 'batch_end_year', 'fathers_name', 'fathers_email', 
    'fathers_mobile', 'mothers_name', 'mothers_email', 'mothers_mobile', 
    'sslc_institute', 'sslc_course', 'sslc_passedoutyear', 'sslc_grade', 
    'hsc_institute', 'hsc_course', 'hsc_passedoutyear', 'hsc_grade', 
    'pg_college', 'pg_branch', 'pg_department', 'company_name', 
    'company_address', 'work_domain', 'company_type', 'designation', 'experience'
  ];

  const searchInObject = (obj, searchTerm) => {
    if (!searchTerm) return true;
    const searchTermLower = searchTerm.toLowerCase();
    return searchableFields.some(field => {
      const value = obj[field];
      if (value === null || value === undefined) return false;
      const stringValue = value.toString().toLowerCase();
      return stringValue.includes(searchTermLower);
    });
  };

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="manage-alumni">
      <div className="">
        <h1 className="admin-title">KCE Alumni Admin Dashboard</h1>
      </div>
      <NavigationBar />

      <h1 className="page-title">Manage Alumni</h1>

      <div className="manage-content">
        <div className="action-buttons">
          <button
            className={`action-button ${view === "table" ? "active" : ""}`}
            onClick={() => handleViewChange("table")}
          >
            <Users size={20} />
            View Alumni
          </button>
          <button
            className={`action-button ${view === "upload" ? "active" : ""}`}
            onClick={() => handleViewChange("upload")}
          >
            <Upload size={20} />
            Upload CSV
          </button>
          <button
            className={`action-button ${view === "add" ? "active" : ""}`}
            onClick={() => handleViewChange("add")}
          >
            <Plus size={20} />
            Add Alumni
          </button>
        </div>

        {view === "table" && (
          <>
            <AlumniFilters
              onApplyFilters={handleFilter}
              searchQuery={searchQuery}
              setSearchQuery={handleSearch}
            />
            {loading && <div className="loading-message">Loading...</div>}
            {error && <div className="error-message">{error}</div>}
            {!loading && !error && (
              <>
                <AlumniTable
                  alumniData={paginatedData}
                  currentPage={currentPage}
                  totalItems={totalItems}
                  itemsPerPage={itemsPerPage}
                />
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </>
            )}
          </>
        )}
        {view === "upload" && (
          <CSVUpload />
        )}
        {view === "add" && <AlumniForm />}
      </div>
    </div>
  );
};

export default ManageAlumni;