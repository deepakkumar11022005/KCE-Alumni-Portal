import React, { useState } from "react";
import { Users, Upload, Download, Plus } from "lucide-react";

import "./ManageAlumni.css";
import {
  NavigationBar,
  AlumniForm,
  CSVUpload,
  AlumniTable,
  AlumniFilters,
} from "../../components";

const ManageAlumni = () => {
  const [view, setView] = useState("table");
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleViewChange = (newView) => {
    setView(newView);
  };

  const handleCSVUpload = (file) => {
    // Simulating file upload progress
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

  const handleDownload = () => {
    // Implement CSV download logic here
    console.log("Downloading CSV...");
  };

  return (
    <div className="manage-alumni">
      <div className="header">
        <h1 className="admin-title">KCE Alumni Admin Dashboard</h1>
      </div>
      <NavigationBar />

      <h1 className="page-title">Manage Alumni</h1>

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
        
          <AlumniFilters />
          
          <AlumniTable />
        </>
      )}
      {view === "upload" && (
        <CSVUpload onUpload={handleCSVUpload} progress={uploadProgress} />
      )}
      {view === "add" && <AlumniForm />}
    </div>
  );
};

export default ManageAlumni;
