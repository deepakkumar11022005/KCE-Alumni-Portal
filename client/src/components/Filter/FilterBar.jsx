import React, { useState, useEffect } from 'react';
import './FilterBar.css';

const FilterBar = ({ onFilter }) => {
    const [filters, setFilters] = useState({
        department: '',
        batch: '',
        domain: '',
        location: '',
        company: '',
        role: '' // employer or entrepreneur
    });

    const [showFilter, setShowFilter] = useState(false);
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleFilter = () => {
        onFilter(filters);
    };

    const toggleFilterBar = () => {
        setShowFilter(!showFilter);
    };

    useEffect(() => {
        const checkScreenSize = () => {
            setIsSmallScreen(window.innerWidth < 820);
        };

        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);

        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    return (
        <>
            <div className={`filter-component ${isSmallScreen && showFilter ? 'show' : ''}`}>
                <h4>Filter Records</h4>
                <div className="filter-group">
                    <label>Department:</label>
                    <select name="department" value={filters.department} onChange={handleChange}>
                        <option value="">Select Department</option>
                        <option value="CSE">CSE</option>
                        <option value="ECE">ECE</option>
                        <option value="EEE">EEE</option>
                        {/* Add more departments as needed */}
                    </select>
                </div>
                <div className="filter-group">
                    <label>Batch:</label>
                    <select name="batch" value={filters.batch} onChange={handleChange}>
                        <option value="">Select Batch</option>
                        <option value="2020">2020</option>
                        <option value="2021">2021</option>
                        <option value="2022">2022</option>
                        {/* Add more batches as needed */}
                    </select>
                </div>
                <div className="filter-group">
                    <label>Domain:</label>
                    <select name="domain" value={filters.domain} onChange={handleChange}>
                        <option value="">Select Domain</option>
                        <option value="Software">Software</option>
                        <option value="Hardware">Hardware</option>
                        <option value="Research">Research</option>
                        {/* Add more domains as needed */}
                    </select>
                </div>
                <div className="filter-group">
                    <label>Location:</label>
                    <select name="location" value={filters.location} onChange={handleChange}>
                        <option value="">Select Location</option>
                        <option value="Chennai">Chennai</option>
                        <option value="Bangalore">Bangalore</option>
                        <option value="Hyderabad">Hyderabad</option>
                        {/* Add more locations as needed */}
                    </select>
                </div>
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
                <div className="filter-group">
                    <label>Role:</label>
                    <select name="role" value={filters.role} onChange={handleChange}>
                        <option value="">Select Role</option>
                        <option value="Employer">Employer</option>
                        <option value="Entrepreneur">Entrepreneur</option>
                    </select>
                </div>
                <button className="filter-btn" onClick={handleFilter}>Filter</button>
            </div>

            {/* Toggle Button for Filter Bar */}
            {isSmallScreen && (
                <div className="filter-toggle" onClick={toggleFilterBar}>
                    <i className={`fas ${showFilter ? 'fa-times' : 'fa-filter'}`}></i>
                </div>
            )}
        </>
    );
};

export default FilterBar;
