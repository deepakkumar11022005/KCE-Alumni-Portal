import React from 'react';
import './FilterResults.css';

const FilterResults = () => {
    const results = [
        { image: 'https://via.placeholder.com/50', name: 'John Doe', batch: '2020', department: 'CSE' },
        { image: 'https://via.placeholder.com/50', name: 'Jane Smith', batch: '2021', department: 'ECE' },
        { image: 'https://via.placeholder.com/50', name: 'Alice Johnson', batch: '2019', department: 'IT' },
        { image: 'https://via.placeholder.com/50', name: 'Robert Brown', batch: '2022', department: 'EEE' },
        { image: 'https://via.placeholder.com/50', name: 'Michael Davis', batch: '2020', department: 'MECH' },
        { image: 'https://via.placeholder.com/50', name: 'Emily Clark', batch: '2021', department: 'CIVIL' },
        { image: 'https://via.placeholder.com/50', name: 'David Wilson', batch: '2018', department: 'CSE' },
        { image: 'https://via.placeholder.com/50', name: 'Sophia Martinez', batch: '2019', department: 'ECE' },
        { image: 'https://via.placeholder.com/50', name: 'James Rodriguez', batch: '2020', department: 'IT' },
        { image: 'https://via.placeholder.com/50', name: 'Olivia Garcia', batch: '2021', department: 'EEE' },
    ];

    return (
        <div className="filter-results">
            <h3>Results</h3>
            {results.length > 0 ? (
                results.map((result, index) => (
                    <div key={index} className="result-bar">
                        <div className="result-img-container">
                            <i className="fas fa-phone-alt"></i>
                        </div>
                        <div className="result-info">
                            <h4 className="result-name">{result.name}</h4>
                            <p className="result-batch">Batch: {result.batch}</p>
                            <p className="result-department">Department: {result.department}</p>
                        </div>
                    </div>
                ))
            ) : (
                <p>No results found.</p>
            )}
        </div>
    );
};

export default FilterResults;
