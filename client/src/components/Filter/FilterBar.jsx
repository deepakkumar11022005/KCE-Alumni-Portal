import React, { useState, useEffect } from 'react';
import { FaTimes, FaFilter } from 'react-icons/fa';
import './FilterBar.css';

const FilterBar = ({ onFilter, showFilterBar, toggleFilterBar }) => {
    const initialFilters = {
        department: '',
        batch: '',
        degree: '',
        branch: '',
        is_employee: '',
        is_entrepreneur: '',
        is_highereducation: '',
    };

    const [filters, setFilters] = useState(initialFilters);
    const [filterOptions, setFilterOptions] = useState({
        departmentOptions: [],
        batchOptions: [],
        degreeOptions: [],
        branchOptions: [],
    });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFilterOptions = async () => {
            try {
                const response = await fetch("https://alumni-apis.vercel.app/options");
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }
                const result = await response.json();
                if (result.success) {
                    setFilterOptions({
                        departmentOptions: result.data.Department || [],
                        batchOptions: result.data.Batch || [],
                        degreeOptions: result.data.Degree || [],
                        branchOptions: result.data.Branch || [],
                    });
                } else {
                    throw new Error("Failed to load options");
                }
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchFilterOptions();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleFilter = () => {
        onFilter(filters);
        if (window.innerWidth < 768) {
            toggleFilterBar();
        }
    };

    if (isLoading) {
        return <div>Loading filter options...</div>;
    }

    if (error) {
        return <div>Error loading filter options: {error}</div>;
    }

    return (
        <>
            <div className={`filter-component ${showFilterBar ? 'show' : ''}`}>
                <h4>Filter Records</h4>
                {Object.entries(filterOptions).map(([key, options]) => (
                    <div className="filter-group" key={key}>
                        <label>{key.replace('Options', '')}:</label>
                        <select name={key.replace('Options', '')} value={filters[key.replace('Options', '')]} onChange={handleChange}>
                            <option value="">Select {key.replace('Options', '')}</option>
                            {options.map(option => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                    </div>
                ))}
                <div className="filter-group">
                    <label>Employee:</label>
                    <select name="is_employee" value={filters.is_employee} onChange={handleChange}>
                        <option value="">All</option>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>
                </div>
                <div className="filter-group">
                    <label>Entrepreneur:</label>
                    <select name="is_entrepreneur" value={filters.is_entrepreneur} onChange={handleChange}>
                        <option value="">All</option>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>
                </div>
                <div className="filter-group">
                    <label>Higher Education:</label>
                    <select name="is_highereducation" value={filters.is_highereducation} onChange={handleChange}>
                        <option value="">All</option>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>
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
