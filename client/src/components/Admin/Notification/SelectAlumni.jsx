import React, { useState } from 'react';
import './SelectAlumni.css';

const SelectAlumni = ({ onSelectAlumni }) => {
  const [selectedAlumni, setSelectedAlumni] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const mockData = [
    { id: 1, name: 'John Doe', graduationYear: 2020, department: 'Computer Science', location: 'New York', domain: 'Technology', company: "Accenture" },
    { id: 2, name: 'Jane Smith', graduationYear: 2019, department: 'Electrical Engineering', location: 'San Francisco', domain: 'Energy', company: "TCS" },
    // Add more mock data as needed
  ];

  // Toggle individual selection
  const handleSelect = (id) => {
    const updatedSelected = selectedAlumni.includes(id)
      ? selectedAlumni.filter((alumniId) => alumniId !== id)
      : [...selectedAlumni, id];
    
    setSelectedAlumni(updatedSelected);
    onSelectAlumni(updatedSelected);
  };

  // Toggle select all
  const handleSelectAll = () => {
    const updatedSelected = !selectAll ? mockData.map((alumni) => alumni.id) : [];
    setSelectedAlumni(updatedSelected);
    setSelectAll(!selectAll);
    onSelectAlumni(updatedSelected);
  };

  return (
    <div className="alumni-table">
      <table>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={selectAll}
                onChange={handleSelectAll}
              />
            </th>
            <th>S.no.</th>
            <th>Name</th>
            <th>Graduation Year</th>
            <th>Department</th>
            <th>Location</th>
            <th>Company</th>
            <th>Domain</th>
          </tr>
        </thead>
        <tbody>
          {mockData.map((alumni) => (
            <tr key={alumni.id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedAlumni.includes(alumni.id)}
                  onChange={() => handleSelect(alumni.id)}
                />
              </td>
              <td>{alumni.id}</td>
              <td>{alumni.name}</td>
              <td>{alumni.graduationYear}</td>
              <td>{alumni.department}</td>
              <td>{alumni.location}</td>
              <td>{alumni.company}</td>
              <td>{alumni.domain}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SelectAlumni;
