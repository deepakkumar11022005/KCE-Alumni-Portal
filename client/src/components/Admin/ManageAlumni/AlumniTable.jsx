import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import './AlumniTable.css';
import default_pic from '../../../assets/images/me.jpg';

const AlumniTable = ({ alumniData ,totalItems}) => {
  const [expandedRows, setExpandedRows] = useState({});

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
                alt={alumni.student_name}
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
                  {alumni.email && <tr><td>Email:</td><td>{alumni.email}</td></tr>}
                  {alumni.mobile_number && <tr><td>Mobile:</td><td>{alumni.mobile_number}</td></tr>}
                  {alumni.date_of_birth && <tr><td>Date of Birth:</td><td>{alumni.date_of_birth}</td></tr>}
                  {alumni.blood_group && <tr><td>Blood Group:</td><td>{alumni.blood_group}</td></tr>}

                  {/* Parent Information */}
                  {(alumni.fathers_name || alumni.mothers_name) && (
                    <>
                      <tr>
                        <th colSpan="2" className="highlight">Parent Information</th>
                      </tr>
                      {alumni.fathers_name && <tr><td>Father's Name:</td><td>{alumni.fathers_name}</td></tr>}
                      {alumni.fathers_mobile && <tr><td>Father's Mobile:</td><td>{alumni.fathers_mobile}</td></tr>}
                      {alumni.mothers_name && <tr><td>Mother's Name:</td><td>{alumni.mothers_name}</td></tr>}
                      {alumni.mothers_mobile && <tr><td>Mother's Mobile:</td><td>{alumni.mothers_mobile}</td></tr>}
                    </>
                  )}

                  {/* Education Information */}
                  <tr>
                    <th colSpan="2" className="highlight">Education Information</th>
                  </tr>
                  {alumni.education && alumni.education.length > 0 ? (
                    alumni.education.map((edu, index) => (
                      <tr key={index}>
                        <td>{edu.institute_name}:</td>
                        <td>{edu.course} ({edu.passed_out_year}) - {edu.grade}</td>
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
                        <td>{work.company_name}:</td>
                        <td>{work.designation} ({work.from_year} - {work.to_year})</td>
                      </tr>
                    ))
                  ) : (
                    <tr><td colSpan="2">No Work Experience Available</td></tr>
                  )}

                  {/* Other Information */}
                  <tr>
                    <th colSpan="2" className="highlight">Other Information</th>
                  </tr>
                  {alumni.work_domain && (
                    <tr><td>Work Domain:</td><td>{alumni.work_domain}</td></tr>
                  )}
                  {alumni.is_entrepreneur !== undefined && (
                    <tr><td>Is Entrepreneur:</td><td>{alumni.is_entrepreneur ? 'Yes' : 'No'}</td></tr>
                  )}
                  {alumni.is_employee !== undefined && (
                    <tr><td>Is Employee:</td><td>{alumni.is_employee ? 'Yes' : 'No'}</td></tr>
                  )}
                  {alumni.is_highereducation !== undefined && (
                    <tr><td>Is Higher Education:</td><td>{alumni.is_highereducation ? 'Yes' : 'No'}</td></tr>
                  )}
                  {alumni.experience && (
                    <tr><td>Experience:</td><td>{alumni.experience}</td></tr>
                  )}

                  {/* Social Media Information */}
                  {(alumni.linkedin_id || alumni.instagram_id || alumni.facebook_id) && (
                    <>
                      <tr>
                        <th colSpan="2" className="highlight">Social Media</th>
                      </tr>
                      {alumni.linkedin_id && (
                        <tr><td>LinkedIn:</td><td><a href={alumni.linkedin_id} target="_blank" rel="noopener noreferrer">{alumni.linkedin_id}</a></td></tr>
                      )}
                      {alumni.instagram_id && (
                        <tr><td>Instagram:</td><td><a href={alumni.instagram_id} target="_blank" rel="noopener noreferrer">{alumni.instagram_id}</a></td></tr>
                      )}
                      {alumni.facebook_id && (
                        <tr><td>Facebook:</td><td><a href={alumni.facebook_id} target="_blank" rel="noopener noreferrer">{alumni.facebook_id}</a></td></tr>
                      )}
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
                <td>{alumni.student_name || 'N/A'}</td>
                <td>{alumni.batch || 'N/A'}</td>
                <td>{alumni.department || 'N/A'}</td>
                <td>{alumni.company_address || 'N/A'}</td>
                <td>{alumni.company_name || 'N/A'}</td>
                <td>{alumni.work_domain || 'N/A'}</td>
                <td>
                  <button
                    onClick={() => toggleRowExpansion(alumni._id)}
                    className="view-more-btn"
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
