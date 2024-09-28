import React, { useState, useEffect } from 'react';
import { FaTimes, FaFilter } from 'react-icons/fa';
import './FilterBar.css';

const FilterBar = ({ onFilter, showFilterBar, toggleFilterBar }) => {
    const initialFilters = {
        department: '',
        batch: '',
        domain: '',
        location: '',
        company: '',
        role: ''
    };

    // State for filter fields
    const [filters, setFilters] = useState(initialFilters);

    // State to track window width for responsiveness
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    // Update filter fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Apply filters and close filter bar on small screens
    const handleFilter = () => {
        onFilter(filters); // Pass filter data to parent component
        if (windowWidth < 768) {
            toggleFilterBar();
        }
    };

    // Track window resize for responsive handling
    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Options for different filters
    const filterOptions = [
        { name: 'department', label: 'Department', options: ['CSE', 'ECE', 'EEE'] },
        { name: 'batch', label: 'Batch', options: ['2020', '2021', '2022'] },
        { name: 'domain', label: 'Domain', options: ['Software', 'Hardware', 'Research'] },
        { name: 'location', label: 'Location', options: ['Chennai', 'Bangalore', 'Hyderabad'] },
        { name: 'role', label: 'Role', options: ['Employer', 'Entrepreneur'] }
    ];

    return (
        <>
            <div className={`filter-component ${showFilterBar ? 'show' : ''}`}>
                <h4>Filter Records</h4>
                {filterOptions.map(({ name, label, options }) => (
                    <div className="filter-group" key={name}>
                        <label>{label}:</label>
                        <select name={name} value={filters[name]} onChange={handleChange}>
                            <option value="">Select {label}</option>
                            {options.map(option => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                    </div>
                ))}
                <div className="filter-group">
                    <label>Company:</label>
                    <input
                        type="text"
                        name="company"
                        value={filters.company}
                        onChange={handleChange}
                        placeholder="Enter Company Name"
                    />
                </div>
                <button className="filter-btn" onClick={handleFilter}>Apply Filters</button>
            </div>

            <button className={`filter-toggle ${showFilterBar ? 'show' : ''}`} onClick={toggleFilterBar}>
                {showFilterBar ? <FaTimes /> : <FaFilter />}
            </button>
        </>
    );
};

export default FilterBar;
