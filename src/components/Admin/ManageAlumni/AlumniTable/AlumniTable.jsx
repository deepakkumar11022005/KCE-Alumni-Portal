import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import './AlumniTable.css';
import default_pic from '../../../../assets/images/me.jpg';

const AlumniTable = ({ alumniData, totalItems }) => {
  const [expandedRows, setExpandedRows] = useState({});

  // Helper function to check for empty or undefined data
  const getValidData = (data, defaultValue = 'N/A') => {
    return data || defaultValue;
  };

  const toggleRowExpansion = (id) => {
    setExpandedRows((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const renderDetailRow = (alumni) => {
    return (
      <tr className="expanded-row">
        <td colSpan="8" className="p-4">
          <div className="detail-container">
            <div className="image-containerr">
              <img
                src={default_pic}
                alt={getValidData(alumni.student_name)}
                className="rounded-full w-40 h-40 object-cover"
              />
            </div>
            <div className="table-container">
              <table className="detail-table">
                <tbody>
                  {/* Personal Information */}
                  <tr>
                    <th colSpan="2" className="highlight">Personal Information</th>
                  </tr>
                  <tr><td>Roll Number:</td><td>{getValidData(alumni.roll_no)}</td></tr>
                  <tr><td>Email:</td><td>{getValidData(alumni.email)}</td></tr>
                  <tr><td>Mobile:</td><td>{getValidData(alumni.mobile_number)}</td></tr>
                  <tr><td>Date of Birth:</td><td>{getValidData(alumni.date_of_birth)}</td></tr>
                  <tr><td>Blood Group:</td><td>{getValidData(alumni.blood_group)}</td></tr>

                  {/* Parent Information */}
                  {(alumni.fathers_name || alumni.mothers_name) && (
                    <>
                      <tr>
                        <th colSpan="2" className="highlight">Parent Information</th>
                      </tr>
                      <tr><td>Father's Name:</td><td>{getValidData(alumni.fathers_name)}</td></tr>
                      <tr><td>Father's Mobile:</td><td>{getValidData(alumni.fathers_mobile)}</td></tr>
                      <tr><td>Mother's Name:</td><td>{getValidData(alumni.mothers_name)}</td></tr>
                      <tr><td>Mother's Mobile:</td><td>{getValidData(alumni.mothers_mobile)}</td></tr>
                    </>
                  )}

                  {/* Education Information */}
                  <tr>
                    <th colSpan="2" className="highlight">Education Information</th>
                  </tr>
                  {alumni.education && alumni.education.length > 0 ? (
                    alumni.education.map((edu, index) => (
                      <tr key={index}>
                        <td>{getValidData(edu.institute_name)}</td>
                        <td>{getValidData(edu.course)} ({getValidData(edu.passed_out_year)}) - {getValidData(edu.grade)}</td>
                      </tr>
                    ))
                  ) : (
                    <tr><td colSpan="2">No Education Records Available</td></tr>
                  )}

                  {/* Work Experience */}
                  <tr>
                    <th colSpan="2" className="highlight">Work Experience</th>
                  </tr>
                  {alumni.work_experience && alumni.work_experience.length > 0 ? (
                    alumni.work_experience.map((work, index) => (
                      <tr key={index}>
                        <td>{getValidData(work.company_name)}</td>
                        <td>{getValidData(work.designation)} ({getValidData(work.from_year)} - {getValidData(work.to_year)})</td>
                      </tr>
                    ))
                  ) : (
                    <tr><td colSpan="2">No Work Experience Available</td></tr>
                  )}

                  {/* Other Information */}
                  <tr>
                    <th colSpan="2" className="highlight">Other Information</th>
                  </tr>
                  <tr><td>Work Domain:</td><td>{getValidData(alumni.work_domain)}</td></tr>
                  <tr><td>Is Entrepreneur:</td><td>{alumni.is_entrepreneur ? 'Yes' : 'No'}</td></tr>
                  <tr><td>Is Employee:</td><td>{alumni.is_employee ? 'Yes' : 'No'}</td></tr>
                  <tr><td>Is Higher Education:</td><td>{alumni.is_highereducation ? 'Yes' : 'No'}</td></tr>
                  <tr><td>Experience:</td><td>{getValidData(alumni.experience)}</td></tr>

                  {/* Social Media Information */}
                  {(alumni.linkedin_id || alumni.instagram_id || alumni.facebook_id) && (
                    <>
                      <tr>
                        <th colSpan="2" className="highlight">Social Media</th>
                      </tr>
                      <tr><td>LinkedIn:</td><td><a href={getValidData(alumni.linkedin_id)} target="_blank" rel="noopener noreferrer">{getValidData(alumni.linkedin_id)}</a></td></tr>
                      <tr><td>Instagram:</td><td><a href={getValidData(alumni.instagram_id)} target="_blank" rel="noopener noreferrer">{getValidData(alumni.instagram_id)}</a></td></tr>
                      <tr><td>Facebook:</td><td><a href={getValidData(alumni.facebook_id)} target="_blank" rel="noopener noreferrer">{getValidData(alumni.facebook_id)}</a></td></tr>
                    </>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </td>
      </tr>
    );
  };

  return (
    <div className="alumni-table">
      <div className="results-bar">
        <span>{totalItems} {totalItems === 1 ? 'result' : 'results'} available</span>
      </div>
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
            <th>View More</th>
          </tr>
        </thead>
        <tbody>
          {alumniData.map((alumni, index) => (
            <React.Fragment key={alumni._id}>
              <tr>
                <td>{index + 1}</td>
                <td>{getValidData(alumni.student_name)}</td>
                <td>{getValidData(alumni.batch)}</td>
                <td>{getValidData(alumni.department)}</td>
                <td>{getValidData(alumni.company_address)}</td>
                <td>{getValidData(alumni.company_name)}</td>
                <td>{getValidData(alumni.work_domain)}</td>
                <td>
                  <button
                    onClick={() => toggleRowExpansion(alumni._id)}
                    className="view-more-btnn"
                  >
                    View
                    {expandedRows[alumni._id] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                </td>
              </tr>
              {expandedRows[alumni._id] && renderDetailRow(alumni)}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AlumniTable;
