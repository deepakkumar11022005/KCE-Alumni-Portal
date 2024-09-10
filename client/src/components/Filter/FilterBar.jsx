import React, { useState, useEffect } from 'react';
import { FaTimes, FaFilter } from 'react-icons/fa';
import './FilterBar.css';

const FilterBar = ({ onFilter }) => {
    const [filters, setFilters] = useState({
        department: '',
        batch: '',
        domain: '',
        location: '',
        company: '',
        role: ''
    });

    const [showFilter, setShowFilter] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleFilter = () => {
        onFilter(filters);
        if (windowWidth < 768) {
            setShowFilter(false);
        }
    };

    const toggleFilterBar = () => {
        setShowFilter(!showFilter);
    };

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const filterOptions = [
        { name: 'department', label: 'Department', options: ['CSE', 'ECE', 'EEE'] },
        { name: 'batch', label: 'Batch', options: ['2020', '2021', '2022'] },
        { name: 'domain', label: 'Domain', options: ['Software', 'Hardware', 'Research'] },
        { name: 'location', label: 'Location', options: ['Chennai', 'Bangalore', 'Hyderabad'] },
        { name: 'role', label: 'Role', options: ['Employer', 'Entrepreneur'] }
    ];

    return (
        <>
            <div className={`filter-component ${showFilter ? 'show' : ''}`}>
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

            <button className={`filter-toggle ${showFilter ? 'show' : ''}`} onClick={toggleFilterBar}>
                {showFilter ? <FaTimes /> : <FaFilter />}
            </button>
        </>
    );
};

export default FilterBar;