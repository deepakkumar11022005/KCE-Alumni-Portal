import React from 'react';
import { X } from 'lucide-react';
import './MarkedAlumni.css';

const SelectedAlumniDisplay = ({ selectedAlumni, onRemove }) => {
  return (
    <div className="selected-alumni-container">
      <h3 className="selected-alumni-title">Selected Alumni</h3>
      <div className="selected-alumni-list">
        {selectedAlumni.length === 0 ? (
          <p className="text-gray-500">No alumni selected</p>
        ) : (
          selectedAlumni.map((rollNo) => (
            <div
              key={rollNo}
              className="selected-alumni-item"
            >
              <span>{rollNo}</span>
              <button
                onClick={() => onRemove(rollNo)}
                className="selected-alumni-remove-btn"
                aria-label={`Remove ${rollNo}`}
              >
                <X size={16} />
              </button>
            </div>
          ))
        )}
      </div>
      {selectedAlumni.length > 0 && (
        <p className="selected-alumni-total">
          Total selected: {selectedAlumni.length}
        </p>
      )}
    </div>
  );
};

export default SelectedAlumniDisplay;
