import React from 'react';
import './FilterAndSort.css';
import { FaFilter } from 'react-icons/fa';

const FilterAndSort = ({ onSort, onSearchChange, onClear, totalResults, sortOrder, searchQuery }) => {
    const handleSortChange = (e) => {
        const { value } = e.target;
        onSort(value);
    };

    const handleSearchChange = (e) => {
        const { value } = e.target;
        onSearchChange(value);
    };

    const handleClear = () => {
        onClear();
    };

    return (
        <div className="filter-and-sort">
            <div className="top-bar">
                <FaFilter className="filter-icon" />
                <span className="top-bar-title">Filter & Sort Options</span>
            </div>
            {/* <div className="sort-group">
                <label htmlFor="sortOrder">Sort by:</label>
                <select id="sortOrder" value={sortOrder} onChange={handleSortChange}>
                    <option value="ascending">Ascending</option>
                    <option value="descending">Descending</option>
                </select>
            </div> */}
            <div className="search-group">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder="Search Records"
                />
            </div>
            <button className="clear-btn" onClick={handleClear}>Clear</button>
           
        </div>
    );
};

export default FilterAndSort;