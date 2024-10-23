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
  const [itemsPerPage] = useState(50);
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
      const url = `https://alumni-apis.vercel.app/students?page=1&limit=1000&sort=batch&order=desc`;
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

  // Define searchable fields, now including education and work experience fields
  const searchableFields = [
    'roll_no', 'student_name', 'batch', 'degree', 'branch', 'department', 'date_of_birth',
    // Additional fields within education
    'education.institute_name', 'education.course', 'education.passed_out_year', 'education.grade',
    // Additional fields within work experience
    'work_experience.company_name', 'work_experience.work_domain', 'work_experience.designation',
    'work_experience.from_year', 'work_experience.to_year'
  ];

  // Search within object and nested education/work experience
  const searchInObject = (obj, searchTerm) => {
    if (!searchTerm) return true;
    const searchTermLower = searchTerm.toLowerCase();

    // Search through searchable fields
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
