import React from 'react';
import './SelectAlumni.css';

const SelectAlumni = ({ 
  alumniData, 
  onSelectAlumni, 
  selectedAlumni, 
  currentPage, 
  itemsPerPage 
}) => {
  const handleSelect = (id) => {
    const updatedSelected = selectedAlumni.includes(id)
      ? selectedAlumni.filter((alumniId) => alumniId !== id)
      : [...selectedAlumni, id];
    
    onSelectAlumni(updatedSelected);
  };

  const handleSelectAll = () => {
    const currentPageIds = alumniData.map(alumni => alumni.roll_no); // Use roll_no as ID
    const allSelected = currentPageIds.every(id => selectedAlumni.includes(id));
    
    let updatedSelected;
    if (allSelected) {
      // Deselect only current page items
      updatedSelected = selectedAlumni.filter(id => !currentPageIds.includes(id));
    } else {
      // Add current page items to selection
      updatedSelected = [...new Set([...selectedAlumni, ...currentPageIds])];
    }
    
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
                checked={alumniData.length > 0 && alumniData.every(alumni => 
                  selectedAlumni.includes(alumni.roll_no) // Use roll_no as ID
                )}
                onChange={handleSelectAll}
              />
            </th>
            <th>Name</th>
            <th>Batch</th>
            <th>Department</th>
            <th>Company</th>
            <th>Designation</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {alumniData.map((alumni, index) => (
            <tr key={alumni.roll_no}> {/* Use roll_no as key */}
              <td>
                <input
                  type="checkbox"
                  checked={selectedAlumni.includes(alumni.roll_no)} // Use roll_no as ID
                  onChange={() => handleSelect(alumni.roll_no)} // Use roll_no as ID
                />
              </td>
              <td>{alumni.student_name}</td> {/* Updated to match the data structure */}
              <td>{alumni.batch}</td> {/* Updated to match the data structure */}
              <td>{alumni.department}</td> {/* Updated to match the data structure */}
              <td>{alumni.work_experience.length > 0 ? alumni.work_experience[0].company_name : '-'}</td> {/* First company from work experience */}
              <td>{alumni.work_experience.length > 0 ? alumni.work_experience[0].designation : '-'}</td> {/* First designation from work experience */}
              <td>{alumni.email || "-"}</td> {/* Updated to match the data structure */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SelectAlumni;
