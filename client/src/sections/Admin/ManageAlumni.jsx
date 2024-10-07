import React, { useState, useEffect } from "react";
import { Users, Upload, Plus } from "lucide-react";
import { AlumniFilters, AlumniForm, CSVUpload, AlumniTable, Pagination, NavigationBar } from "../../components";
import "./ManageAlumni.css";

const ManageAlumni = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [appliedFilters, setAppliedFilters] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(2);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [view, setView] = useState("table");
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleViewChange = (newView) => {
    setView(newView);
  };

  const handleCSVUpload = (file) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setUploadProgress(0);
          setView("table");
        }, 1000);
      }
    }, 500);
  };

  const fetchData = async (page) => {
    setLoading(true);
    try {
      const url = `https://alumni-apis.vercel.app/students?page=${page}&limit=${itemsPerPage}&sort=batch&order=desc`;
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
      setData(result.data);
      setTotalItems(result.pagination.totalRecords);
      setTotalPages(result.pagination.totalPages);
      setCurrentPage(result.pagination.currentPage);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("An error occurred while fetching data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage, itemsPerPage]);

  const handleFilter = (filters) => {
    setAppliedFilters(filters);
    setCurrentPage(1);
    fetchData(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchData(page);
  };

  // Define searchable fields
  const searchableFields = [
    // Personal Information
    'first_name',
    'last_name',
    'email',
    'mobile_number',
    'blood_group',
    'date_of_birth',
    'aadhar_number',
    'pan_number',
    
    // Academic Information
    'department',
    'degree',
    'batch_start_year',
    'batch_end_year',
    
    // Family Information
    'fathers_name',
    'fathers_email',
    'fathers_mobile',
    'mothers_name',
    'mothers_email',
    'mothers_mobile',
    
    // Educational History
    'sslc_institute',
    'sslc_course',
    'sslc_passedoutyear',
    'sslc_grade',
    'hsc_institute',
    'hsc_course',
    'hsc_passedoutyear',
    'hsc_grade',
    'pg_college',
    'pg_branch',
    'pg_department',
    
    // Professional Information
    'company_name',
    'company_address',
    'work_domain',
    'company_type',
    'designation',
    'experience'
  ];

  const searchInObject = (obj, searchTerm) => {
    if (!searchTerm) return true;
    
    // Convert search term to lowercase for case-insensitive search
    const searchTermLower = searchTerm.toLowerCase();
    
    // Check if any searchable field contains the search term
    return searchableFields.some(field => {
      const value = obj[field];
      
      // Skip if the field doesn't exist or is null/undefined
      if (value === null || value === undefined) return false;
      
      // Convert the value to string and search
      const stringValue = value.toString().toLowerCase();
      return stringValue.includes(searchTermLower);
    });
  };

  const filteredAlumnis = data.filter((alumni) => {
    // First check the applied filters
    const matchesFilters = Object.keys(appliedFilters).every((key) => {
      if (!appliedFilters[key]) return true;
      const filterValue = appliedFilters[key].toLowerCase();
      const alumniValue = alumni[key]?.toString().toLowerCase();
      return alumniValue?.includes(filterValue);
    });

    // Then check the search query across all searchable fields
    const matchesSearch = searchInObject(alumni, searchQuery);

    // Return true only if both conditions are met
    return (Object.keys(appliedFilters).length === 0 && searchQuery === "") || 
           (matchesFilters && matchesSearch);
  });

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
              setSearchQuery={setSearchQuery}
            />
            {loading && <div className="loading-message">Loading...</div>}
            {error && <div className="error-message">{error}</div>}
            {!loading && !error && (
              <>
                <AlumniTable
                  alumniData={filteredAlumnis}
                  currentPage={currentPage}
                  totalItems={totalItems}
                  itemsPerPage={itemsPerPage}
                  onPageChange={handlePageChange}
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
        {view === "upload" && <CSVUpload onUpload={handleCSVUpload} progress={uploadProgress} />}
        {view === "add" && <AlumniForm />}
      </div>
    </div>
  );
};

export default ManageAlumni;