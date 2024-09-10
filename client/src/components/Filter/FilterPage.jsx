import React, { useState } from 'react';
import { CustomNavbar, FilterBar, FilterAndSort, FilterResults, Footer } from '../';
import './FilterPage.css';

const Filter = () => {
  const [showFilterBar, setShowFilterBar] = useState(false);

  const toggleFilterBar = () => {
    setShowFilterBar(!showFilterBar);
  };

  return (
    <div className="filter-page">
      
      <div className="filter-content">
        <FilterBar showFilterBar={showFilterBar} toggleFilterBar={toggleFilterBar} />
        <div className="main-content">
          {/* <FilterAndSort /> */}
          {/* <FilterResults /> */}
        </div>
      </div>
    
    </div>
  );
};

export default Filter;