import React, { useState } from 'react';
import { PlusCircle, MinusCircle } from 'lucide-react';
import './EditProfile.css';
import profileImage from '../../assets/images/me.jpg'
import { Camera } from "lucide-react";
const EditProfile = () => {

  const [activeSection, setActiveSection] = useState('account');
  const [workInfo, setWorkInfo] = useState([{ type: '', details: {} }]);

  const addWorkInfo = () => {
    setWorkInfo([...workInfo, { type: '', details: {} }]);
  };
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Add logic to handle image upload
      console.log("Image selected:", file);
    }
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
            <div className="form-group">
              <label className="form-label">Company Name</label>
              <input type="text" className="form-input" onChange={(e) => handleWorkInfoChange(index, 'companyName', e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Designation</label>
              <input type="text" className="form-input" onChange={(e) => handleWorkInfoChange(index, 'designation', e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Address</label>
              <input type="text" className="form-input" onChange={(e) => handleWorkInfoChange(index, 'address', e.target.value)} />
            </div>
          </>
        );
      case 'entrepreneur':
        return (
          <>
            <div className="form-group">
              <label className="form-label">Company Name</label>
              <input type="text" className="form-input" onChange={(e) => handleWorkInfoChange(index, 'companyName', e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Address</label>
              <input type="text" className="form-input" onChange={(e) => handleWorkInfoChange(index, 'address', e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Type</label>
              <input type="text" className="form-input" onChange={(e) => handleWorkInfoChange(index, 'type', e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Description about company</label>
              <textarea className="form-textarea" onChange={(e) => handleWorkInfoChange(index, 'description', e.target.value)}></textarea>
            </div>
          </>
        );
      case 'higherEducation':
        return (
          <>
            <div className="form-group">
              <label className="form-label">Institution Name</label>
              <input type="text" className="form-input" onChange={(e) => handleWorkInfoChange(index, 'institutionName', e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Branch</label>
              <input type="text" className="form-input" onChange={(e) => handleWorkInfoChange(index, 'branch', e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Department</label>
              <input type="text" className="form-input" onChange={(e) => handleWorkInfoChange(index, 'department', e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Address</label>
              <input type="text" className="form-input" onChange={(e) => handleWorkInfoChange(index, 'address', e.target.value)} />
            </div>
          </>
        );
      case 'exam':
        return (
          <>
            <div className="form-group">
              <label className="form-label">Exam Type</label>
              <select className="form-select" onChange={(e) => handleWorkInfoChange(index, 'examType', e.target.value)}>
                <option value="">Select Exam Type</option>
                <option value="JEE">JEE</option>
                <option value="CAT">CAT</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Status</label>
              <input type="text" className="form-input" onChange={(e) => handleWorkInfoChange(index, 'status', e.target.value)} />
            </div>
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
            <h3 className="section-title">Account Info</h3>
            <div className="profile-image-wrapper">
              {profileImage ? (
                <img src={profileImage} alt="Profile" className="profile-image" />
              ) : (
                <div className="placeholder-image">
                  <Camera size={40} />
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                id="image-upload"
                className="image-upload-input"
              />
              <label htmlFor="image-upload" className="btn-upload">
                <Camera size={20} />
                
                Change Image
              </label>
            </div>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input type="email" className="form-input" placeholder="Email" />
            </div>
            <div className="form-group">
              <label className="form-label">Password</label>
              <input type="password" className="form-input" placeholder="Password" />
            </div>
          </div>
        );
      case 'personal':
        return (
          <div className="section">
            <h3 className="section-title">Personal Details</h3>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">First Name</label>
                <input type="text" className="form-input" placeholder="First Name" />
              </div>
              <div className="form-group">
                <label className="form-label">Last Name</label>
                <input type="text" className="form-input" placeholder="Last Name" />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Batch Start Year</label>
                <input type="number" className="form-input" placeholder="Batch Start Year" />
              </div>
              <div className="form-group">
                <label className="form-label">Batch End Year</label>
                <input type="number" className="form-input" placeholder="Batch End Year" />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Email</label>
                <input type="email" className="form-input" placeholder="Email" />
              </div>
              <div className="form-group">
                <label className="form-label">Mobile Number</label>
                <input type="tel" className="form-input" placeholder="Mobile Number" />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Date of Birth</label>
                <input type="date" className="form-input" />
              </div>
              <div className="form-group">
                <label className="form-label">Blood Group</label>
                <input type="text" className="form-input" placeholder="Blood Group" />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Aadhar Number</label>
                <input type="text" className="form-input" placeholder="Aadhar Number" />
              </div>
              <div className="form-group">
                <label className="form-label">PAN Number</label>
                <input type="text" className="form-input" placeholder="PAN Number" />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Address</label>
              <textarea className="form-textarea" placeholder="Address"></textarea>
            </div>
          </div>
        );
      case 'parent':
        return (
          <div className="section">
            <h3 className="section-title">Parent Info</h3>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Father's Name</label>
                <input type="text" className="form-input" placeholder="Father's Name" />
              </div>
              <div className="form-group">
                <label className="form-label">Father's Contact Number</label>
                <input type="tel" className="form-input" placeholder="Father's Contact Number" />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Father's Email</label>
              <input type="email" className="form-input" placeholder="Father's Email" />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Mother's Name</label>
                <input type="text" className="form-input" placeholder="Mother's Name" />
              </div>
              <div className="form-group">
                <label className="form-label">Mother's Contact Number</label>
                <input type="tel" className="form-input" placeholder="Mother's Contact Number" />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Mother's Email</label>
              <input type="email" className="form-input" placeholder="Mother's Email" />
            </div>
          </div>
        );
      case 'school':
        return (
        
          <div className="section">
  <h3 className="section-title">School Info</h3>

  {/* College Section */}
  <div className="education-level">
    <h4 className="section-subtitle">College</h4>
    <div className="form-group">
      <label className="form-label">Institution Name</label>
      <input type="text" className="form-input" placeholder="Institution Name" />
    </div>
    <div className="form-group">
      <label className="form-label">Degree</label>
      <select className="form-input">
        <option value="">Select Degree</option>
        <option value="BE">BE</option>
        <option value="BTech">BTech</option>
        <option value="BSc">BSc</option>
        <option value="BCA">BCA</option>
      </select>
    </div>
    <div className="form-group">
      <label className="form-label">Department</label>
      <select className="form-input">
        <option value="">Select Department</option>
        <option value="CSE">Computer Science Engineering (CSE)</option>
        <option value="IT">Information Technology (IT)</option>
        <option value="ECE">Electronics and Communication Engineering (ECE)</option>
        <option value="EEE">Electrical and Electronics Engineering (EEE)</option>
      </select>
    </div>
    <div className="form-row">
      <div className="form-group">
        <label className="form-label">Year</label>
        <input type="number" className="form-input" placeholder="Year" />
      </div>
      <div className="form-group">
        <label className="form-label">CGPA</label>
        <input type="text" className="form-input" placeholder="CGPA" />
      </div>
    </div>
  </div>

  {/* HSC Section */}
  <div className="education-level">
    <h4 className="section-subtitle">HSC</h4>
    <div className="form-group">
      <label className="form-label">School Name</label>
      <input type="text" className="form-input" placeholder="School Name" />
    </div>
    <div className="form-group">
      <label className="form-label">Group</label>
      <select className="form-input">
        <option value="">Select Group</option>
        <option value="Biomath">Biomath</option>
        <option value="CS">Computer Science</option>
        <option value="Economics">Economics</option>
      </select>
    </div>
    <div className="form-row">
      <div className="form-group">
        <label className="form-label">Year</label>
        <input type="number" className="form-input" placeholder="Year" />
      </div>
      <div className="form-group">
        <label className="form-label">Scored Marks / Total Marks</label>
        <input type="text" className="form-input" placeholder="Scored Marks / Total Marks" />
      </div>
    </div>
  </div>

  {/* SSLC Section */}
  <div className="education-level">
    <h4 className="section-subtitle">SSLC</h4>
    <div className="form-group">
      <label className="form-label">School Name</label>
      <input type="text" className="form-input" placeholder="School Name" />
    </div>
    <div className="form-row">
      <div className="form-group">
        <label className="form-label">Year</label>
        <input type="number" className="form-input" placeholder="Year" />
      </div>
      <div className="form-group">
        <label className="form-label">Scored Marks / Total Marks</label>
        <input type="text" className="form-input" placeholder="Scored Marks / Total Marks" />
      </div>
    </div>
  </div>
</div>

        );
      case 'work':
        return (
          <div className="section">
            <h3 className="section-title">Work Info</h3>
            {workInfo.map((work, index) => (
              <div key={index} className="work-info">
                <div className="form-group">
                  <label className="form-label">Work Type</label>
                  <select className="form-select" value={work.type} onChange={(e) => handleWorkInfoChange(index, 'type', e.target.value)}>
                    <option value="">Select Type</option>
                    <option value="employee">Employee</option>
                    <option value="entrepreneur">Entrepreneur</option>
                    <option value="higherEducation">Higher Education</option>
                    <option value="exam">Exam</option>
                    <option value="unemployed">Unemployed</option>
                  </select>
                </div>
                {renderWorkInfoFields(work.type, index)}
                <button onClick={() => removeWorkInfo(index)} className="btn-remove">
                  <MinusCircle size={20} />
                <span>  Remove</span>
                </button>
                
              </div>
            ))}
            <button onClick={addWorkInfo} className="btn-add">
              <PlusCircle size={20} />
            <span>  Add More Work Info</span>
            </button>
          </div>
        );
      default:
        return null;
    }
  };



  return (
    <div className="edit-profile-container">
      
  <h2 className="edit-profile-title"><span>Edit Profile </span> <button className='btn-save-changes'> Save Changes</button></h2> 
  
  <div className="tabs">
    <button
      className={`tab-button ${activeSection === 'account' ? 'active' : ''}`}
      onClick={() => setActiveSection('account')}
    >
      Account Info
    </button>
    <button
      className={`tab-button ${activeSection === 'personal' ? 'active' : ''}`}
      onClick={() => setActiveSection('personal')}
    >
      Personal Details
    </button>
    <button
      className={`tab-button ${activeSection === 'parent' ? 'active' : ''}`}
      onClick={() => setActiveSection('parent')}
    >
      Parent Info
    </button>
    <button
      className={`tab-button ${activeSection === 'school' ? 'active' : ''}`}
      onClick={() => setActiveSection('school')}
    >
      School Info
    </button>
    <button
      className={`tab-button ${activeSection === 'work' ? 'active' : ''}`}
      onClick={() => setActiveSection('work')}
    >
      Work Info
    </button>
  </div>
  <div className="section">
    {renderSection(activeSection)}
  </div>
</div>

  );
};

export default EditProfile;
