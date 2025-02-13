import React, { useState, useCallback } from "react";
import {
  Upload,
  Rocket,
  FileSpreadsheet,
  Info,
  X,
  AlertCircle,
  Download, // Added Download icon
} from "lucide-react";
import "./CSVUpload.css";

const CSVUpload = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fileName, setFileName] = useState("");
  const [uploadStatus, setUploadStatus] = useState("");
  const [errorRows, setErrorRows] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  const currentYear = new Date().getFullYear();
  const batchYears = Array.from(
    { length: currentYear - 1999 },
    (_, i) => currentYear - i
  );

  const handleTemplateDownload = () => {
    const templatePath = "../../../../assets/AlumniTemplatecsv.csv";

    fetch(templatePath)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "AlumniTemplate.csv";
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      })
      .catch((error) => {
        setError("Failed to download template file");
        console.error("Template download error:", error);
      });
  };
  const validateFile = (file) => {
    const allowedTypes = [
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx
      "application/vnd.ms-excel", // .xls
      "text/csv", // .csv
    ];

    if (!allowedTypes.includes(file.type)) {
      setError("Please upload only Excel (.xlsx, .xls) or CSV files");
      return false;
    }

    // 10MB size limit
    if (file.size > 10 * 1024 * 1024) {
      setError("File size should be less than 10MB");
      return false;
    }

    return true;
  };

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!selectedBatch) {
      setError("Please select a batch year first");
      return;
    }

    if (validateFile(file)) {
      setFileName(file.name);
      setError(null);
      await handleFileUpload(file);
    }
  };

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    async (e) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      if (!selectedBatch) {
        setError("Please select a batch year first");
        return;
      }

      const file = e.dataTransfer.files[0];
      if (file && validateFile(file)) {
        setFileName(file.name);
        setError(null);
        await handleFileUpload(file);
      }
    },
    [selectedBatch]
  );

  const handleFileUpload = async (file) => {
    setError(null);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("batch", selectedBatch);

    setIsLoading(true);
    setUploadStatus("Processing your file... 🚀");

    try {
      const response = await fetch(
        "https://alumni-apis.vercel.app/uploadexcel",
        {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json",
          },
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || `Upload failed: ${response.statusText}`
        );
      }

      if (result.success) {
        setUploadStatus("Upload successful! 🎉");
        setTimeout(() => {
          setUploadStatus("");
          setFileName("");
          setSelectedBatch("");
        }, 3000);
      } else if (result.errorCount > 0) {
        setUploadStatus("Issues found in upload 🔧");
        setErrorRows(result.errorRows);
      } else {
        throw new Error(result.message || "Upload failed");
      }
    } catch (error) {
      setError(`Upload failed: ${error.message}`);
      setUploadStatus("Upload failed 💥");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="admin-db-upload-container">
      <div className="admin-db-upload-wrapper">
        <div className="admin-db-upload-instructions">
          <Info size={20} />
          <div className="admin-db-upload-instructions-text">
            <ul>
              <li>
                Select the batch year and upload Excel (.xlsx, .xls) or CSV
                files (max size: 10MB).
              </li>
              <li>
                Ensure the file is correctly formatted and all required fields
                are filled.
              </li>
              <li>Download the sample file to ensure the correct format.</li>
              <li className="admin-db-template-download">
                <button
                  onClick={handleTemplateDownload}
                  className="admin-db-template-button"
                >
                  <Download size={16} className="mr-2" />
                  Download CSV Template
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="admin-db-upload-batch-select">
          <label htmlFor="batch-select">Select Batch Year:</label>
          <select
            id="batch-select"
            value={selectedBatch}
            onChange={(e) => {
              setSelectedBatch(e.target.value);
              setError(null);
            }}
            className="admin-db-upload-select"
          >
            <option value="">Choose year</option>
            {batchYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <div
          className={`admin-db-upload-area ${isDragging ? "dragging" : ""}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {isLoading ? (
            <div className="admin-db-upload-loading">
              <Rocket className="admin-db-upload-rocket" size={40} />
              <p>{uploadStatus}</p>
            </div>
          ) : (
            <label
              htmlFor="excel-file"
              className="admin-db-upload-dragdrop-area"
            >
              {fileName ? (
                <div className="admin-db-upload-file-selected">
                  <FileSpreadsheet size={30} />
                  <span>{fileName}</span>
                  <button
                    className="admin-db-upload-file-remove"
                    onClick={(e) => {
                      e.preventDefault();
                      setFileName("");
                    }}
                  >
                    <X size={20} />
                  </button>
                </div>
              ) : (
                <>
                  <Upload size={40} className="admin-db-upload-icon" />
                  <h5 className="admin-db-upload-title">
                    Drag and drop your file here
                  </h5>
                  <p className="admin-db-upload-subtitle">or</p>
                  <button type="button" className="admin-db-upload-button">
                    select a batch year before uploading a file.
                  </button>
                </>
              )}
              <input
                type="file"
                id="excel-file"
                accept=".xlsx,.xls,.csv"
                onChange={handleFileChange}
                disabled={isLoading || !selectedBatch}
                className="admin-db-upload-input-hidden"
              />
            </label>
          )}
        </div>

        {error && (
          <div className="admin-db-upload-error">
            <AlertCircle size={20} />
            {error}
          </div>
        )}

        {errorRows.length > 0 && (
          <div className="admin-db-upload-error-list">
            <h4>Upload Issues:</h4>
            <ul>
              {errorRows.map((errorRow, index) => (
                <li key={index}>
                  <span className="error-row-number">Row {errorRow.row}:</span>
                  <span className="error-message">{errorRow.error}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default CSVUpload;
