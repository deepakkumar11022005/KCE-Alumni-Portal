import React from 'react';
import './AlumniTable.css';

const AlumniTable = () => {
  const mockData = [
    { id: 1, name: 'John Doe', graduationYear: 2020, department: 'Computer Science', location: 'New York', domain: 'Technology',company :"Accenture" },
    { id: 2, name: 'Jane Smith', graduationYear: 2019, department: 'Electrical Engineering', location: 'San Francisco', domain: 'Energy' ,company:"TCS"},
    // Add more mock data as needed
  ];

  return (
    <div className="alumni-table">
      <table>
        <thead>
          <tr>
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

export default AlumniTable;