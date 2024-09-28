import React, { useState } from 'react';
import './FilterAndSort.css';
import { FaFilter } from 'react-icons/fa';

const FilterAndSort = ({ onSort, onSearchChange, onClear }) => {
    const [sortOrder, setSortOrder] = useState('ascending');
    const [searchQuery, setSearchQuery] = useState('');

    const handleSortChange = (e) => {
        const { value } = e.target;
        setSortOrder(value);
        onSort(value);
    };

    const handleSearchChange = (e) => {
        const { value } = e.target;
        setSearchQuery(value);
        onSearchChange(value);
    };

    const handleClear = () => {
        setSortOrder('ascending');
        setSearchQuery('');
        onClear();
    };

    return (
        <div className="filter-and-sort">
            <div className="top-bar">
                <FaFilter className="filter-icon" />
                <span className="top-bar-title">Filter & Sort Options</span>
            </div>
            <div className="sort-group">
                <label>Sort by :</label>
                <select value={sortOrder} onChange={handleSortChange}>
                    <option value="ascending">Ascending</option>
                    <option value="descending">Descending</option>
                </select>
            </div>
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
