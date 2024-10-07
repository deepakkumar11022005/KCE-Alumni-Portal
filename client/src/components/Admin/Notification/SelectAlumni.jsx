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
    const currentPageIds = alumniData.map(alumni => alumni._id);
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
                  selectedAlumni.includes(alumni._id)
                )}
                onChange={handleSelectAll}
              />
            </th>
            {/* <th>S.no.</th> */}
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
            <tr key={alumni._id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedAlumni.includes(alumni._id)}
                  onChange={() => handleSelect(alumni._id)}
                />
              </td>
              {/* <td>{((currentPage - 1) * itemsPerPage) + index + 1}</td> */}
              <td>{`${alumni.first_name} ${alumni.last_name}`}</td>
              <td>{`${alumni.batch_start_year}-${alumni.batch_end_year}`}</td>
              <td>{alumni.department}</td>
              <td>{alumni.company_name || '-'}</td>
              <td>{alumni.designation || '-'}</td>
              <td>{alumni.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default SelectAlumni;
