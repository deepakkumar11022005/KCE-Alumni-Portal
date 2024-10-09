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
  const [notifications, setNotifications] = useState([]);
  const [selectedAlumni, setSelectedAlumni] = useState([]);
  const [data, setData] = useState([]);
  const [filteredAlumni, setFilteredAlumni] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [appliedFilters, setAppliedFilters] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  // Define searchable fields
  const searchableFields = ['student_name', 'email', 'mobile_number'];

  const fetchData = async () => {
    setLoading(true);
    try {
      const url = `https://alumni-apis.vercel.app/students?limit=1000&sort=batch&order=desc`;
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

      const result = await response.json();
      setData(result.data);
      setFilteredAlumni(result.data);
      setTotalItems(result.pagination.totalRecords);
      setTotalPages(Math.ceil(result.pagination.totalRecords / itemsPerPage));
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

  const filterAlumni = () => {
    const filtered = data.filter((alumni) => {
      const matchesFilters = Object.keys(appliedFilters).every((key) => {
        if (!appliedFilters[key]) return true;
        return alumni[key]?.toString().toLowerCase()
          .includes(appliedFilters[key].toLowerCase());
      });
      
      const matchesSearch = searchableFields.some(field => {
        const value = alumni[field];
        return value && value.toString().toLowerCase().includes(searchQuery.toLowerCase());
      });
      
      return matchesFilters && matchesSearch;
    });

    setFilteredAlumni(filtered);
    setTotalItems(filtered.length);
    setTotalPages(Math.ceil(filtered.length / itemsPerPage));
    setCurrentPage(1);
  };

  useEffect(() => {
    filterAlumni();
  }, [appliedFilters, searchQuery, data]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleFilter = (filters) => {
    setAppliedFilters(filters);
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

  const paginatedAlumni = filteredAlumni.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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
            alumniData={paginatedAlumni}
            onSelectAlumni={setSelectedAlumni}
            selectedAlumni={selectedAlumni}
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
