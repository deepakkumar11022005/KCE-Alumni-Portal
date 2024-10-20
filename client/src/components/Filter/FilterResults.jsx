import React from 'react';
import { useNavigate } from 'react-router-dom';
import './FilterResults.css';

const FilterResults = ({ filteredResults, totalResults }) => {
    const navigate = useNavigate(); // Initialize the useNavigate hook
    const actualResultsCount = filteredResults.length;

    const handleCardClick = (id) => {
        // navigate(`/alumni/profile/${id}`);  
    };

    return (
        <div className="filter-results-container">
            <h3 className="filter-results-title">Results</h3>
            <p className="total-results">
                Total Results: {actualResultsCount}
                {actualResultsCount !== totalResults && (
                    <span className="results-mismatch">
                        {" "}(Displaying {actualResultsCount} of {totalResults} total records)
                    </span>
                )}
            </p>
            <div className="filter-results-grid">
                {actualResultsCount > 0 ? (
                    filteredResults.map((result) => (
                        <div
                            key={result.roll_no}
                            className="result-card"
                            onClick={() => handleCardClick(result._id)} // Use the result's ID
                        >
                            <div className="result-card-content">
                                <div className="result-icon-container">
                                    <div className="result-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="result-info">
                                    <p className="result-name">{result.student_name}</p>
                                    <p className="result-detail">Batch: {result.batch}</p>
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
    