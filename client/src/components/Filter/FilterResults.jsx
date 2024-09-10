import React from 'react';
import './FilterResults.css';

const FilterResults = () => {
    const results = [
        { name: 'John Doe', batch: '2020', department: 'CSE' },
        { name: 'Jane Smith', batch: '2021', department: 'ECE' },
        { name: 'Alice Johnson', batch: '2019', department: 'IT' },
        { name: 'Robert Brown', batch: '2022', department: 'EEE' },
        { name: 'Michael Davis', batch: '2020', department: 'MECH' },
        { name: 'Emily Clark', batch: '2021', department: 'CIVIL' },
        { name: 'David Wilson', batch: '2018', department: 'CSE' },
        { name: 'Sophia Martinez', batch: '2019', department: 'ECE' },
        { name: 'James Rodriguez', batch: '2020', department: 'IT' },
        { name: 'Olivia Garcia', batch: '2021', department: 'EEE' },
    ];

    return (
        <div className="filter-results-container">
            <h3 className="filter-results-title">Results</h3>
            <div className="filter-results-grid">
                {results.length > 0 ? (
                    results.map((result, index) => (
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
                                    <p className="result-name">{result.name}</p>
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