import React, { useState } from 'react';
import { PlusCircle, MinusCircle } from 'lucide-react';
import './EditProfile.css';

const EditProfile = () => {
  const [activeSection, setActiveSection] = useState('account');
  const [workInfo, setWorkInfo] = useState([{ type: '', details: {} }]);

  const addWorkInfo = () => {
    setWorkInfo([...workInfo, { type: '', details: {} }]);
  };

  const removeWorkInfo = (index) => {
    const newWorkInfo = workInfo.filter((_, i) => i !== index);
    setWorkInfo(newWorkInfo);
  };

  const handleWorkInfoChange = (index, field, value) => {
    const newWorkInfo = [...workInfo];
    if (field === 'type') {
      newWorkInfo[index] = { type: value, details: {} };
    } else {
      newWorkInfo[index].details[field] = value;
    }
    setWorkInfo(newWorkInfo);
  };

  const renderWorkInfoFields = (type, index) => {
    switch (type) {
      case 'employee':
        return (
          <>
            <label>Company Name</label>
            <input type="text" onChange={(e) => handleWorkInfoChange(index, 'companyName', e.target.value)} />
            <label>Designation</label>
            <input type="text" onChange={(e) => handleWorkInfoChange(index, 'designation', e.target.value)} />
            <label>Address</label>
            <input type="text" onChange={(e) => handleWorkInfoChange(index, 'address', e.target.value)} />
          </>
        );
      case 'entrepreneur':
        return (
          <>
            <label>Company Name</label>
            <input type="text" onChange={(e) => handleWorkInfoChange(index, 'companyName', e.target.value)} />
            <label>Address</label>
            <input type="text" onChange={(e) => handleWorkInfoChange(index, 'address', e.target.value)} />
            <label>Type</label>
            <input type="text" onChange={(e) => handleWorkInfoChange(index, 'type', e.target.value)} />
            <label>Description about company</label>
            <textarea onChange={(e) => handleWorkInfoChange(index, 'description', e.target.value)}></textarea>
          </>
        );
      case 'higherEducation':
        return (
          <>
            <label>Institution Name</label>
            <input type="text" onChange={(e) => handleWorkInfoChange(index, 'institutionName', e.target.value)} />
            <label>Branch</label>
            <input type="text" onChange={(e) => handleWorkInfoChange(index, 'branch', e.target.value)} />
            <label>Department</label>
            <input type="text" onChange={(e) => handleWorkInfoChange(index, 'department', e.target.value)} />
            <label>Address</label>
            <input type="text" onChange={(e) => handleWorkInfoChange(index, 'address', e.target.value)} />
          </>
        );
      case 'exam':
        return (
          <>
            <label>Exam Type</label>
            <select onChange={(e) => handleWorkInfoChange(index, 'examType', e.target.value)}>
              <option value="">Select Exam Type</option>
              <option value="JEE">JEE</option>
              <option value="CAT">CAT</option>
            </select>
            <label>Status</label>
            <input type="text" onChange={(e) => handleWorkInfoChange(index, 'status', e.target.value)} />
          </>
        );
      default:
        return null;
    }
  };

  const renderSection = (section) => {
    switch (section) {
      case 'account':
        return (
          <div className="section">
            <h3>Account Info</h3>
            <label>Email</label>
            <input type="email" placeholder="Email" />
            <label>Password</label>
            <input type="password" placeholder="Password" />
          </div>
        );
      case 'personal':
        return (
          <div className="section">
            <h3>Personal Details</h3>
            <div className="form-row">
              <label>First Name</label>
              <input type="text" placeholder="First Name" />
              <label>Last Name</label>
              <input type="text" placeholder="Last Name" />
            </div>
            <div className="form-row">
              <label>Batch Start Year</label>
              <input type="number" placeholder="Batch Start Year" />
              <label>Batch End Year</label>
              <input type="number" placeholder="Batch End Year" />
            </div>
            <div className="form-row">
              <label>Email</label>
              <input type="email" placeholder="Email" />
              <label>Mobile Number</label>
              <input type="tel" placeholder="Mobile Number" />
            </div>
            <div className="form-row">
              <label>Date of Birth</label>
              <input type="date" />
              <label>Blood Group</label>
              <input type="text" placeholder="Blood Group" />
            </div>
            <div className="form-row">
              <label>Aadhar Number</label>
              <input type="text" placeholder="Aadhar Number" />
              <label>PAN Number</label>
              <input type="text" placeholder="PAN Number" />
            </div>
            <label>Address</label>
            <textarea placeholder="Address"></textarea>
          </div>
        );
      case 'parent':
        return (
          <div className="section">
            <h3>Parent Info</h3>
            <div className="form-row">
              <label>Father's Name</label>
              <input type="text" placeholder="Father's Name" />
              <label>Father's Contact Number</label>
              <input type="tel" placeholder="Father's Contact Number" />
            </div>
            <label>Father's Email</label>
            <input type="email" placeholder="Father's Email" />
            <div className="form-row">
              <label>Mother's Name</label>
              <input type="text" placeholder="Mother's Name" />
              <label>Mother's Contact Number</label>
              <input type="tel" placeholder="Mother's Contact Number" />
            </div>
            <label>Mother's Email</label>
            <input type="email" placeholder="Mother's Email" />
          </div>
        );
      case 'school':
        return (
          <div className="section">
            <h3>School Info</h3>
            {['10th', '12th', 'College'].map((level) => (
              <div key={level} className="education-level">
                <h4>{level}</h4>
                <label>Institution Name</label>
                <input type="text" placeholder="Institution Name" />
                <label>Degree/Department</label>
                <input type="text" placeholder="Degree/Department" />
                <div className="form-row">
                  <label>Year</label>
                  <input type="number" placeholder="Year" />
                  <label>Grade</label>
                  <input type="text" placeholder="Grade" />
                </div>
              </div>
            ))}
          </div>
        );
      case 'work':
        return (
          <div className="section">
            <h3>Work Info</h3>
            {workInfo.map((work, index) => (
              <div key={index} className="work-info">
                <label>Work Type</label>
                <select value={work.type} onChange={(e) => handleWorkInfoChange(index, 'type', e.target.value)}>
                  <option value="">Select Type</option>
                  <option value="employee">Employee</option>
                  <option value="entrepreneur">Entrepreneur</option>
                  <option value="higherEducation">Higher Education</option>
                  <option value="exam">Exam</option>
                  <option value="unemployed">Unemployed</option>
                </select>
                {renderWorkInfoFields(work.type, index)}
                <button onClick={() => removeWorkInfo(index)} className="remove-btn">
                  <MinusCircle size={20} />
                  Remove
                </button>
              </div>
            ))}
            <button onClick={addWorkInfo} className="add-btn">
              <PlusCircle size={20} />
              Add More Work Info
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="edit-profile-container">
      <h2>Edit Profile</h2>
      <div className="tabs">
        <button className={activeSection === 'account' ? 'active' : ''} onClick={() => setActiveSection('account')}>
          Account Info
        </button>
        <button className={activeSection === 'personal' ? 'active' : ''} onClick={() => setActiveSection('personal')}>
          Personal Details
        </button>
        <button className={activeSection === 'parent' ? 'active' : ''} onClick={() => setActiveSection('parent')}>
          Parent Info
        </button>
        <button className={activeSection === 'school' ? 'active' : ''} onClick={() => setActiveSection('school')}>
          School Info
        </button>
        <button className={activeSection === 'work' ? 'active' : ''} onClick={() => setActiveSection('work')}>
          Work Info
        </button>
      </div>
      {renderSection(activeSection)}
    </div>
  );
};

export default EditProfile;
