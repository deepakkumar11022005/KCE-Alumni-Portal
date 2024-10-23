import React, { useState } from "react";
import { Upload } from "lucide-react";
import "./CSVUpload.css";

const CSVUpload = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fileName, setFileName] = useState(""); // State to store the selected file name
  const [uploadStatus, setUploadStatus] = useState(""); // State to store the upload status
  const [errorRows, setErrorRows] = useState([]); // State to store error rows

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name); // Set the file name once selected
      await handleFileUpload(file);
    }
  };

  const handleFileUpload = async (file) => {
    setError(null);
    const formData = new FormData();
    formData.append("file", file);

    setIsLoading(true);
    setUploadStatus("Uploading..."); // Set the status to "Uploading"
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

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();

      if (result.success) {
        setUploadStatus("Upload successful!");
        alert("Upload successful!");
      } else if (result.errorCount > 0) {
        setUploadStatus("Upload completed with errors");
        setErrorRows(result.errorRows);
        alert(`Upload failed: ${result.errorCount} rows have issues.`);
      } else {
        throw new Error(result.message || "Upload failed");
      }
    } catch (error) {
      alert(`Error uploading file: ${error.message}`);
      setError(error.message);
      setUploadStatus("Upload failed");
      // downloadLogFile(error.message);
    } finally {
      setIsLoading(false);
      // Only reset fileName after a successful upload, not after failure
      
        setFileName(""); // Clear file after successful upload
        
    }
  };

  const downloadLogFile = (errorMessage) => {
    const blob = new Blob([errorMessage], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "error_log.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const downloadSampleFile = () => {
    const fileUrl = "/assets/Xl/Alumni Student Details.xlsx"; // Ensure this path is correct
    const a = document.createElement("a");
    a.href = fileUrl;
    a.download = "xlformat.xlsx"; // This will be the name of the downloaded file
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="csv-upload">
      <div className="upload-area">
        <Upload size={30} />
        <h5>Drag and drop your Excel file here</h5>
        <p>or</p>
        <input
          type="file"
          id="excel-file"
          accept=".xlsx"
          onChange={handleFileChange}
          disabled={isLoading} // Disable input while uploading
        />

        {fileName ? (
          <div className="file-name">Selected File: {fileName}</div>
        ) : (
          <label htmlFor="excel-file" className="file-input-label">
            Select File
          </label>
        )}
      </div>
      {isLoading && <div className="loading-message">{uploadStatus}</div>}
      {error && <div className="error">{error}</div>}

      <button onClick={downloadSampleFile} className="download-button">
        Download Sample Excel File
      </button>

      {/* Display Error Rows */}
      {errorRows.length > 0 && (
        <div className="error-rows">
          <h4>Upload Errors:</h4>
          <ul>
            {errorRows.map((errorRow, index) => (
              <li key={index}>
                Row {index + 1}: {errorRow.error}
                <br />
                Data: {JSON.stringify(errorRow.row)}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CSVUpload;
