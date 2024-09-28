import React from 'react';
import './FilterResults.css';

const FilterResults = ({ filteredResults }) => {
    
    
    return (
        <div className="filter-results-container">
            <h3 className="filter-results-title">Results</h3>
            <div className="filter-results-grid">
                {filteredResults.length > 0 ? (
                    filteredResults.map((result, index) => (
                        <div key={index} className="result-card">
                            <div className="result-card-content">
                                <div className="result-icon-container">
                                    <div className="result-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="result-info">
                                    <p className="result-name">{`${result.first_name} ${result.last_name}`}</p>
                                    <p className="result-detail">Batch: {result.batch_start_year} - {result.batch_end_year}</p>
                                    <p className="result-detail">Department: {result.department}</p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="no-results">No results found.</p>
                )}
            </div>
        </div>
    );
};

export default FilterResults;
