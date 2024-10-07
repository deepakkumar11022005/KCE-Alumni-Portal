import React from 'react';
import './AlumniTable.css';

const AlumniTable = ({ alumniData, currentPage, totalItems, itemsPerPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

 

  return (
    <div className="alumni-table">
      <table>
        <thead>
          <tr>
            <th>S.no.</th>
            <th>Name</th>
            <th>Year</th>
            <th>Department</th>
            <th>Location</th>
            <th>Company</th>
            <th>Domain</th>
          </tr>
        </thead>
        <tbody>
          {alumniData.map((alumni, index) => (
            <tr key={alumni._id}>
              <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
              <td>{`${alumni.first_name || 'N/A'} ${alumni.last_name || 'N/A'}`}</td>
              <td>{alumni.batch_end_year || 'N/A'}</td> {/* Graduation year */}
              <td>{alumni.department || 'N/A'}</td>
              <td>{alumni.company_address || 'N/A'}</td> {/* Use company_address or 'N/A' */}
              <td>{alumni.company_name || 'N/A'}</td> {/* Use company_name or 'N/A' */}
              <td>{alumni.work_domain || 'N/A'}</td> {/* Use work_domain or 'N/A' */}
            </tr>
          ))}
        </tbody>
      </table>
       
    </div>
  );
};

export default AlumniTable;
