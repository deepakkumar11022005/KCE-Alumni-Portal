import React from 'react';
import { Upload } from 'lucide-react';
import './CSVUpload.css';

const CSVUpload = ({ onUpload, progress }) => {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      onUpload(file);
    }
  };

  return (
    <div className="csv-upload">
      <div className="upload-area">
        <Upload size={30} />
        <h5>Drag and drop your CSV file here</h5>
        <p>or</p>
        <input type="file" id="csv-file" accept=".csv" onChange={handleFileChange} />
        <label htmlFor="csv-file" className="file-input-label">Select File</label>
      </div>
      {progress > 0 && (
        <div className="progress-bar-container">
          <div className="progress-bar" style={{ width: `${progress}%` }}></div>
        </div>
      )}
    </div>
  );
};

export default CSVUpload;