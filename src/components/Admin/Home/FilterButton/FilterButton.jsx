import React from 'react';
import { Filter } from 'lucide-react';
import './FilterButton.css';

const FilterButton = ({ label }) => (
  <button className="filter-button">
    <Filter size={16} />
    <span>{label}</span>
  </button>
);

export default FilterButton;