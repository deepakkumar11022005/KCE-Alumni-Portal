import React, { useState, useEffect } from 'react'; 
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { PlusCircle, Save } from 'lucide-react';
import './AlumniForm.css'; // Import CSS for styling

const AlumniForm = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [formOptions, setFormOptions] = useState({
    Batch: [],
    Department: [],
    Company: [],
    Domain: [],
    Location: [],
    Role: [],
    Degree: [],
    BloodGroup: []
  });

  const [alumniData, setAlumniData] = useState({
    personal: {
      name: '',
      rollNo: '',
      batch: '',
      degree: '',
      department: '',
      dateOfBirth: '',
      bloodGroup: '',
      email: '',
      mobileNumber: '',
      aadharNumber: '',
      panNumber: '',
      fathersName: '',
      fathersMobile: '',
      fathersEmail: '',
      mothersName: '',
      mothersMobile: '',
      mothersEmail: ''
    },
    social: {
      linkedin: '',
      github: '',
      twitter: '',
      facebook: '',
      instagram: '' // Added Instagram field
    },
    education: [{ instituteName: '', degree: '', year: '', grade: '' }],
    work: [{
      company: '',
      role: '',
      startDate: '',
      endDate: '',
      companyAddress: '',    
      workDomain: '',       
      companyURL: '',       // Added Company URL
      companyType: '',      // Added Company Type
      designation: ''       // Added Designation
    }]
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('https://alumni-apis.vercel.app/options')
      .then((res) => res.json())
      .then((data) => {
        console.log('Fetched form options:', data.data); // Debugging line
        setFormOptions((prevOptions) => ({
          ...prevOptions,
          ...data.data,
        }));
      })
      .catch((error) => {
        console.error('Error fetching form options:', error);
      });
  }, []);

  const handleChange = (section, field, value, index = null) => {
    if (index !== null) {
      setAlumniData(prev => ({
        ...prev,
        [section]: prev[section].map((item, i) =>
          i === index ? { ...item, [field]: value } : item
        )
      }));
    } else {
      setAlumniData(prev => ({
        ...prev,
        [section]: { ...prev[section], [field]: value }
      }));
    }
  };

  const addItem = (section) => {
    setAlumniData(prev => ({
      ...prev,
      [section]: [...prev[section], section === 'education'
        ? { instituteName: '', degree: '', year: '', grade: '' }
        : { 
            company: '',
            role: '',
            startDate: '',
            endDate: '',
            companyAddress: '',
            workDomain: '',
            companyURL: '',
            companyType: '',
            designation: ''
          }
      ]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('https://alumni-apis.vercel.app/student', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(alumniData),
        mode: 'no-cors'
        
      });

      if (!response.ok) {
        console.log(alumniData);
        
        throw new Error(response);
      }

      const result = await response.json();
      console.log('Form submitted successfully:', result);
      // You can also reset the form or show a success message here

    } catch (error) {
      setError('Error submitting the form: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const renderPersonalInfo = () => (
    <div className="input-grid">
      {Object.entries(alumniData.personal).map(([key, value]) => (
        <div className="input-group" key={key}>
          <label htmlFor={key}>
            {['name', 'batch', 'department', 'degree', 'email','rollNo'].includes(key) ? (
              <>
                {key.replace(/([A-Z])/g, ' $1').trim().toUpperCase()} <span style={{color: 'red'}}>*</span> {/* Required field indicator */}
              </>
            ) : (
              key.replace(/([A-Z])/g, ' $1').trim().toUpperCase()
            )}
          </label>
          {['batch', 'department'].includes(key) ? (
            <select
              id={key}
              value={value}
              className='select-input'
              onChange={(e) => handleChange('personal', key, e.target.value)}
            >
              <option value="">Select {key.replace(/([A-Z])/g, ' $1').trim()}</option>
              {(formOptions[key.charAt(0).toUpperCase() + key.slice(1)] || []).map((option, idx) => (
                <option key={idx} value={option}>
                  {option}
                </option>
              ))}
            </select>
          ) : key === 'dateOfBirth' ? (
            <input
              id={key}
              type="date"
              value={value}
              onChange={(e) => handleChange('personal', key, e.target.value)}
            />
          ) : key === 'bloodGroup' ? (
            <select
              id={key}
              value={value}
              onChange={(e) => handleChange('personal', key, e.target.value)}
            >
              <option value="">Select Blood Group</option>
              {(formOptions.BloodGroup || []).map((option, idx) => (
                <option key={idx} value={option}>
                  {option}
                </option>
              ))}
            </select>
          ) : (
            <input
              id={key}
              type={key.toLowerCase().includes('email') ? 'email' : 'text'}
              value={value}
              onChange={(e) => handleChange('personal', key, e.target.value)}
            />
          )}
        </div>
      ))}
    </div>
  );

  const renderSocialLinks = () => (
    <div className="input-grid">
      {Object.entries(alumniData.social).map(([key, value]) => (
        <div className="input-group" key={key}>
          <label htmlFor={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
          <input
            id={key}
            type="url"
            placeholder={`https://www.${key}.com`}
            value={value}
            onChange={(e) => handleChange('social', key, e.target.value)}
          />
        </div>
      ))}
    </div>
  );

  const renderEducation = () => (
    <>
      {alumniData.education.map((edu, index) => (
        <div className="education-section" key={index}>
          <h4 className='added-title'>Education {index + 1}</h4>
          <div className="input-grid">
            {Object.entries(edu).map(([key, value]) => (
              <div className="input-group" key={key}>
                <label htmlFor={`${key}-${index}`}>
                  {key.replace(/([A-Z])/g, ' $1').trim().toUpperCase()}
                </label>
                <input
                  id={`${key}-${index}`}
                  type={key.toLowerCase().includes('year') ? 'number' : 'text'}
                  value={value}
                  onChange={(e) => handleChange('education', key, e.target.value, index)}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
      <button className="add-button" type="button" onClick={() => addItem('education')}>
        <PlusCircle size={20} /> Add Education
      </button>
    </>
  );

  const renderWorkExperience = () => (
    <>
      {alumniData.work.map((work, index) => (
        <div className="work-section" key={index}>
          <h4 className='added-title'>Work Experience {index + 1}</h4>
          <div className="input-grid">
            {/* Existing Fields */}
            <div className="input-group">
              <label htmlFor={`company-${index}`}>Company</label>
              <input
                id={`company-${index}`}
                type="text"
                value={work.company}
                onChange={(e) => handleChange('work', 'company', e.target.value, index)}
              />
            </div>
            <div className="input-group">
              <label htmlFor={`role-${index}`}>Role</label>
              <input
                id={`role-${index}`}
                type="text"
                value={work.role}
                onChange={(e) => handleChange('work', 'role', e.target.value, index)}
              />
            </div>
            <div className="input-group">
              <label htmlFor={`startDate-${index}`}>Start Date</label>
              <input
                id={`startDate-${index}`}
                type="date"
                value={work.startDate}
                onChange={(e) => handleChange('work', 'startDate', e.target.value, index)}
              />
            </div>
            <div className="input-group">
              <label htmlFor={`endDate-${index}`}>End Date</label>
              <input
                id={`endDate-${index}`}
                type="date"
                value={work.endDate}
                onChange={(e) => handleChange('work', 'endDate', e.target.value, index)}
              />
            </div>
            {/* New Fields */}
            <div className="input-group">
              <label htmlFor={`companyAddress-${index}`}>Company Address</label>
              <input
                id={`companyAddress-${index}`}
                type="text"
                value={work.companyAddress}
                onChange={(e) => handleChange('work', 'companyAddress', e.target.value, index)}
              />
            </div>
            <div className="input-group">
              <label htmlFor={`workDomain-${index}`}>Work Domain</label>
              <input
                id={`workDomain-${index}`}
                type="text"
                value={work.workDomain}
                onChange={(e) => handleChange('work', 'workDomain', e.target.value, index)}
              />
            </div>
            <div className="input-group">
              <label htmlFor={`companyURL-${index}`}>Company URL</label>
              <input
                id={`companyURL-${index}`}
                type="url"
                value={work.companyURL}
                onChange={(e) => handleChange('work', 'companyURL', e.target.value, index)}
              />
            </div>
            <div className="input-group">
              <label htmlFor={`companyType-${index}`}>Company Type</label>
              <input
                id={`companyType-${index}`}
                type="text"
                value={work.companyType}
                onChange={(e) => handleChange('work', 'companyType', e.target.value, index)}
              />
            </div>
            <div className="input-group">
              <label htmlFor={`designation-${index}`}>Designation</label>
              <input
                id={`designation-${index}`}
                type="text"
                value={work.designation}
                onChange={(e) => handleChange('work', 'designation', e.target.value, index)}
              />
            </div>
          </div>
        </div>
      ))}
      <button className="add-button" type="button" onClick={() => addItem('work')}>
        <PlusCircle size={20} /> Add Work Experience
      </button>
    </>
  );

  return (
    <form onSubmit={handleSubmit} className='alumni-form'>
      <h1 className='form-title'>Alumni Registration</h1>
      <Tabs selectedIndex={activeTab} onSelect={index => setActiveTab(index)}>
        <TabList>
          <Tab>Personal Information</Tab>
          <Tab>Social Links</Tab>
          <Tab>Education</Tab>
          <Tab>Work Experience</Tab>
        </TabList>

        <TabPanel>{renderPersonalInfo()}</TabPanel>
        <TabPanel>{renderSocialLinks()}</TabPanel>
        <TabPanel>{renderEducation()}</TabPanel>
        <TabPanel>{renderWorkExperience()}</TabPanel>
      </Tabs>
      {error && <div className="error-message">{error}</div>} {/* Display error message */}
      <button type="submit" className="submit-buttonn" disabled={loading}>
        {loading ? 'Submitting...' : <Save size={20} />} {/* Change button text based on loading state */}
        {loading ? '' : ' Submit'}
      </button>
    </form>
  );
};

export default AlumniForm;
