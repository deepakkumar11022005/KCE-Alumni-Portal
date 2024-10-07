import React, { useState, useEffect } from "react";
import "./AdminNotification.css";
import {
  NotificationForm,
  PreviousNotifications,
  NotificationNav,
  AlumniFilters,
  SelectAlumni,
  Pagination
} from "../../components";

const AdminNotification = () => {
  // State management for notifications
  const [notifications, setNotifications] = useState([]);
  const [selectedAlumni, setSelectedAlumni] = useState([]);

  // State for alumni data and pagination
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [appliedFilters, setAppliedFilters] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  // Search and filter configuration
  const searchableFields = [
    'first_name', 'last_name', 'email', 'mobile_number', 'department',
    'degree', 'batch_start_year', 'batch_end_year', 'company_name',
    'designation', 'work_domain'
  ];

  // Fetch alumni data
  const fetchData = async (page) => {
    setLoading(true);
    try {
      const url = `https://alumni-apis.vercel.app/students?page=${page}&limit=${itemsPerPage}&sort=batch&order=desc`;
      const response = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

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

  // Search helper function
  const searchInObject = (obj, searchTerm) => {
    if (!searchTerm) return true;
    
    const searchTermLower = searchTerm.toLowerCase();
    return searchableFields.some(field => {
      const value = obj[field];
      if (value === null || value === undefined) return false;
      return value.toString().toLowerCase().includes(searchTermLower);
    });
  };

  // Filter alumni based on search and filters
  const filteredAlumni = data.filter((alumni) => {
    const matchesFilters = Object.keys(appliedFilters).every((key) => {
      if (!appliedFilters[key]) return true;
      return alumni[key]?.toString().toLowerCase()
        .includes(appliedFilters[key].toLowerCase());
    });

    const matchesSearch = searchInObject(alumni, searchQuery);
    return (Object.keys(appliedFilters).length === 0 && searchQuery === "") || 
           (matchesFilters && matchesSearch);
  });

  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchData(page);
  };

  const handleFilter = (filters) => {
    setAppliedFilters(filters);
    setCurrentPage(1);
    fetchData(1);
  };

  const handleSendNotification = (newNotification) => {
    const notificationWithDetails = {
      ...newNotification,
      date: new Date().toLocaleString(),
      recipients: selectedAlumni,
    };
    setNotifications([notificationWithDetails, ...notifications]);
    console.log("Sending notification:", notificationWithDetails);
  };

  return (
    <div className="admin-notification">
      <h1 className="admin-title">KCE Alumni Admin Dashboard</h1>
      <NotificationNav />
      <h2 className="page-title">Manage Notifications</h2>

      <AlumniFilters
        onApplyFilters={handleFilter}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {loading && <div className="loading-message">Loading...</div>}
      {error && <div className="error-message">{error}</div>}

      {!loading && !error && (
        <>
          <SelectAlumni
            alumniData={filteredAlumni}
            onSelectAlumni={setSelectedAlumni}
            selectedAlumni={selectedAlumni}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
          />
          
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}

      <NotificationForm 
        onSend={handleSendNotification}
        selectedAlumniCount={selectedAlumni.length}
      />
      
      <PreviousNotifications notifications={notifications} />
    </div>
  );
};

export default AdminNotification;