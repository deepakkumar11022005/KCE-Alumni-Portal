import React, { useState } from 'react';
import './FilterAndSort.css';
import { FaFilter } from 'react-icons/fa';

const FilterAndSort = ({ onSort, onLimitChange, onClear }) => {
    const [sortOrder, setSortOrder] = useState('ascending');
    const [limit, setLimit] = useState('');

    const handleSortChange = (e) => {
        const { value } = e.target;
        setSortOrder(value);
        onSort(value);
    };

    const handleLimitChange = (e) => {
        const { value } = e.target;
        setLimit(value);
        onLimitChange(value);
    };

    const handleClear = () => {
        setSortOrder('ascending');
        setLimit('');
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
            <div className="limit-group">
                 
                <input
                    type="number"
                    value={limit}
                    onChange={handleLimitChange}
                    placeholder="Search Records"
                />
            </div>
            <button className="clear-btn" onClick={handleClear}>Clear</button>
        </div>
    );
};

export default FilterAndSort;
