import React, { useState, useEffect } from "react";
import { Users, Upload, Plus } from "lucide-react";
import {
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
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(50);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [view, setView] = useState("table");
  const [selectedBatch, setSelectedBatch] = useState("");
  const [batches, setBatches] = useState([]);
  const [searchTags, setSearchTags] = useState([]);

  const handleViewChange = (newView) => {
    setView(newView);
  };

  const fetchBatches = async () => {
    try {
      const response = await fetch("https://alumni-apis.onrender.com/batches");
      const data = await response.json();

      if (data.success) {
        setBatches(data.data);
        const currentYear = new Date().getFullYear();
        const prevYearBatch = `batch_${currentYear - 1}`;
        const defaultBatch = data.data.includes(prevYearBatch)
          ? prevYearBatch
          : data.data[data.data.length - 2];
        setSelectedBatch(defaultBatch);
        fetchBatchAlumni(defaultBatch);
      } else {
        throw new Error(data.message || "Failed to fetch batches");
      }
    } catch (error) {
      setError("Unable to fetch batch data. Please try again later.");
      console.error("Error:", error);
    }
  };

  const fetchBatchAlumni = async (batch) => {
    setLoading(true);
    try {
      const url = `https://alumni-apis.onrender.com/batch-students?page=1&limit=${100000}&sort=roll_no&order=asc`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          batch: batch.slice(-4),
        }),
      });

      const data = await response.json();
      if (data.success) {
        setAllData(data.data);
        setFilteredData(data.data);
        setTotalItems(data.data.length);
        setTotalPages(Math.ceil(data.data.length / itemsPerPage));
        setCurrentPage(1);
        setError(null);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(
        "An error occurred while fetching data. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBatches();
  }, []);

  useEffect(() => {
    filterAlumni(searchTags);
  }, [searchTags, allData]);

  const handleSearch = (e) => {
    if (e.key === "Enter" && e.target.value.trim() !== "") {
      const newTag = e.target.value.trim().toLowerCase();
      if (!searchTags.includes(newTag)) {
        const updatedTags = [...searchTags, newTag];
        setSearchTags(updatedTags);
      }
      e.target.value = "";
    }
  };

  const removeSearchTag = (tagToRemove) => {
    const updatedTags = searchTags.filter((tag) => tag !== tagToRemove);
    setSearchTags(updatedTags);
  };

  const clearTags = () => {
    setSearchTags([]);
    setFilteredData(allData);
    setCurrentPage(1);
  };

  const filterAlumni = (tags) => {
    if (tags.length === 0) {
      setFilteredData(allData);
      setTotalItems(allData.length);
      setTotalPages(Math.ceil(allData.length / itemsPerPage));
      return;
    }

    const filtered = allData.filter((alumni) =>
      tags.every((tag) => {
        const searchableFields = [
          alumni.student_name,
          alumni.roll_no,
          alumni.batch,
          alumni.department,
          alumni.degree,
          // Add education fields
          ...(alumni.education
            ?.map((edu) => [
              edu.institute_name,
              edu.course,
              edu.passed_out_year,
              edu.grade,
            ])
            .flat() || []),
          // Add work experience fields
          ...(alumni.work_experience
            ?.map((work) => [
              work.company_name,
              work.work_domain,
              work.designation,
              work.company_address,
            ])
            .flat() || []),
        ].map((field) => (field || "").toString().toLowerCase());

        return searchableFields.some((field) => field.includes(tag));
      })
    );

    setFilteredData(filtered);
    setTotalItems(filtered.length);
    setTotalPages(Math.ceil(filtered.length / itemsPerPage));
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return  (
    <div className="admin-manage-alumni">
      <div className="admin-header">
        <h1 className="admin-main-title">KCE Alumni Admin Dashboard</h1>
      </div>
      <NavigationBar />

      <h1 className="admin-page-title">Manage Alumni</h1>

      <div className="admin-manage-content">
        <div className="admin-action-container">
          <button
            className={`admin-action-button ${view === "table" ? "admin-active" : ""}`}
            onClick={() => handleViewChange("table")}
          >
            <Users size={20} />
            View Alumni
          </button>
          <button
            className={`admin-action-button ${view === "upload" ? "admin-active" : ""}`}
            onClick={() => handleViewChange("upload")}
          >
            <Upload size={20} />
            Upload CSV
          </button>
          <button
            className={`admin-action-button ${view === "add" ? "admin-active" : ""}`}
            onClick={() => handleViewChange("add")}
          >
            <Plus size={20} />
            Add Alumni
          </button>
        </div>

        {view === "table" && (
          <>
            <div className="admin-filters-container">
              <div className="admin-batch-filter">
                <div className="admin-select-group">
                  <span className="admin-filter-label">Batch</span>
                  <select
                    value={selectedBatch}
                    onChange={(e) => setSelectedBatch(e.target.value)}
                    className="admin-select-input"
                  >
                    <option value="">Select Batch</option>
                    {batches.map((batch) => (
                      <option key={batch} value={batch}>
                        {batch.replace("batch_", "")}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  onClick={() => fetchBatchAlumni(selectedBatch)}
                  className="admin-fetch-button"
                  disabled={!selectedBatch}
                >
                  Get
                </button>
              </div>

              <div className="admin-search-section">
                <div className="admin-search-wrapper">
                  <span className="admin-search-icon">🔍</span>
                  <input
                    type="text"
                    placeholder="Search alumni..."
                    onKeyDown={handleSearch}
                    className="admin-search-input"
                  />
                </div>
                <div className="admin-search-tags">
                  {searchTags.map((tag, index) => (
                    <span key={index} className="admin-tag-item">
                      {tag}
                      <button
                        onClick={() => removeSearchTag(tag)}
                        className="admin-tag-remove-btn"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                  {searchTags.length > 0 && (
                    <button onClick={clearTags} className="admin-clear-all-btn">
                      Clear All
                    </button>
                  )}
                </div>
              </div>
            </div>

            {loading && <div className="admin-loading">Loading...</div>}
            {error && <div className="admin-error">{error}</div>}
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
        {view === "upload" && <CSVUpload />}
        {view === "add" && <AlumniForm />}
      </div>
    </div>);
};

export default ManageAlumni;
