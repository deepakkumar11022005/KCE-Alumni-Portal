
import React, { useState, useEffect } from 'react'; 
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { PlusCircle, Save } from 'lucide-react';
import './AlumniForm.css';

const AlumniForm = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [formOptions, setFormOptions] = useState({
    Batch: [],
    Department: [],
    Company: [],
    Domain: [],
    Location: [],
    Role: [],
    BloodGroup: []
  });

  const [alumniData, setAlumniData] = useState({
    personal: {
      name: '',
      rollNo: '',
      batch: '',
      degree: '',
      branch:"",
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
      instagram: ''
    },
    education: [{ instituteName: '', degree: '', year: '', grade: '' }],
    work: [{
      company: '',
      role: '',
      startDate: '',
      endDate: '',
      companyAddress: '',    
      workDomain: '',       
      companyURL: '',
      companyType: '',
      designation: ''
    }]
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const degreeOptions = [
    "B.Sc", "B.Tech", "M.Sc", "M.Tech", "Ph.D", "MBA", "B.A", "M.A"
  ];

  useEffect(() => {
    fetch('https://alumni-apis.vercel.app/options')
      .then((res) => res.json())
      .then((data) => {
        const { Degree, Branch, ...otherOptions } = data.data || {};
        setFormOptions((prevOptions) => ({
          ...prevOptions,
          ...otherOptions,
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

  const formatAlumniDataForRequest = (alumniData) => {
    return {
      roll_no: alumniData.personal.rollNo,
      student_name: alumniData.personal.name,
      batch: alumniData.personal.batch,
      degree: alumniData.personal.degree,
      branch: "BE",
      department: alumniData.personal.department,
      date_of_birth: alumniData.personal.dateOfBirth,
      blood_group: alumniData.personal.bloodGroup,
      email: alumniData.personal.email,
      mobile_number: alumniData.personal.mobileNumber,
      aadhar_number: alumniData.personal.aadharNumber,
      pan_number: alumniData.personal.panNumber,
      fathers_name: alumniData.personal.fathersName,
      fathers_mobile: alumniData.personal.fathersMobile,
      fathers_email: alumniData.personal.fathersEmail,
      mothers_name: alumniData.personal.mothersName,
      mothers_mobile: alumniData.personal.mothersMobile,
      mothers_email: alumniData.personal.mothersEmail,
      linkedin_id: alumniData.social.linkedin,
      instagram_id: alumniData.social.instagram,
      facebook_id: alumniData.social.facebook,
      is_entrepreneur: false,
      is_employee: true,
      is_unemployee: false,
      is_highereducation: false,
      is_exam: false,
      education: alumniData.education.map(edu => ({
        institute_name: edu.instituteName,
        course: edu.degree,
        passed_out_year: edu.year,
        grade: edu.grade
      })),
      work_experience: alumniData.work.map(work => ({
        company_name: work.company,
        company_address: work.companyAddress,
        work_domain: work.workDomain,
        company_url: work.companyURL,
        company_type: work.companyType,
        designation: work.designation,
        from_year: work.startDate ? work.startDate.split('-')[0] : '',
        to_year: work.endDate ? work.endDate.split('-')[0] : ''
      }))
    };
  };

  const resetForm = () => {
    setAlumniData({
      personal: {
        name: '',
        rollNo: '',
        batch: '',
        degree: '',
        branch:"",
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
        instagram: ''
      },
      education: [{ instituteName: '', degree: '', year: '', grade: '' }],
      work: [{
        company: '',
        role: '',
        startDate: '',
        endDate: '',
        companyAddress: '',
        workDomain: '',
        companyURL: '',
        companyType: '',
        designation: ''
      }]
    });
    setActiveTab(0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMessage('');

    const formattedAlumniData = formatAlumniDataForRequest(alumniData);

    const { personal } = alumniData;
    const requiredPersonalFields = ['name', 'rollNo', 'batch', 'degree', 'department', 'email', 'mobileNumber'];
    for (let field of requiredPersonalFields) {
      if (!personal[field]) {
        setError(`Please fill the required field: ${field.replace(/([A-Z])/g, ' $1').trim()}`);
        setLoading(false);
        return;
      }
    }

    try {
      const response = await fetch('https://alumni-apis.vercel.app/student', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formattedAlumniData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        
        throw new Error(errorData.message || 'Failed to submit the form');
      }

      const result = await response.json();
      console.log('Form submitted successfully:', result);
      setSuccessMessage('Form submitted successfully!');
      resetForm();
    } catch (error) {
      setError('Error submitting the form: ' + error.message);
      console.error('Submission error:', error);
    } finally {
      setLoading(false);
    }
  };
const branchOptions=[
  "PG", "UG"
]
const BloodGroupOptions = [
  "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-", "Rh+", "Rh-"
];

  const renderPersonalInfo = () => (
    <div className="input-grid">
      {Object.entries(alumniData.personal).map(([key, value]) => (
        <div className="input-group" key={key}>
          <label htmlFor={key}>
            {['name', 'rollNo', 'batch', 'department', 'degree', 'branch', 'email', 'mobileNumber'].includes(key) ? (
              <>
                {key.replace(/([A-Z])/g, ' $1').trim().toUpperCase()} <span style={{ color: 'red' }}>*</span>
              </>
            ) : (
              key.replace(/([A-Z])/g, ' $1').trim().toUpperCase()
            )}
          </label>
          {['batch', 'department', 'degree', 'branch'].includes(key) ? (
            <select
              id={key}
              value={value}
              className="select-input"
              onChange={(e) => handleChange('personal', key, e.target.value)}
              required={['batch', 'department', 'degree', 'branch'].includes(key)}
            >
              <option value="">Select {key.replace(/([A-Z])/g, ' $1').trim()}</option>
              {key === 'degree' 
                ? degreeOptions.map((option, idx) => (
                    <option key={idx} value={option}>
                      {option}
                    </option>
                  ))
                : key === 'branch'
                ? (branchOptions || []).map((option, idx) => (
                // ? (formOptions.Branch || []).map((option, idx) => (
                    <option key={idx} value={option}>
                      {option}
                    </option>
                  ))
                : (formOptions[key.charAt(0).toUpperCase() + key.slice(1)] || []).map((option, idx) => (
                    <option key={idx} value={option}>
                      {option}
                    </option>
                  ))
              }
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
              {/* {(BloodGroupOptions || []).map((option, idx) => ( */}
              {(BloodGroupOptions || []).map((option, idx) => (
                <option key={idx} value={option}>
                  {option}
                </option>
              ))}
            </select>
          ) : (
            <input
              id={key}
              type={key.toLowerCase().includes('email') ? 'email' : (key.toLowerCase().includes('number') ? 'number' : 'text')}
              value={value}
              onChange={(e) => handleChange('personal', key, e.target.value)}
              required={['name', 'rollNo', 'batch', 'degree', 'department', 'branch', 'email', 'mobileNumber'].includes(key)}
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
                {key === 'degree' ? (
                  <select
                    id={`${key}-${index}`}
                    value={value}
                    className='select-input'
                    onChange={(e) => handleChange('education', key, e.target.value, index)}
                    required={['instituteName', 'degree', 'year', 'grade'].includes(key)} // Make education fields required
                  >
                    <option value="">Select Degree</option>
                    {degreeOptions.map((option, idx) => (
                      <option key={idx} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : key === 'year' ? (
                  <input
                    id={`${key}-${index}`}
                    type="number"
                    value={value}
                    onChange={(e) => handleChange('education', key, e.target.value, index)}
                    required={['instituteName', 'degree', 'year', 'grade'].includes(key)} // Make education fields required
                  />
                ) : (
                  <input
                    id={`${key}-${index}`}
                    type="text"
                    value={value}
                    onChange={(e) => handleChange('education', key, e.target.value, index)}
                    required={['instituteName', 'degree', 'year', 'grade'].includes(key)} // Make education fields required
                  />
                )}
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
              <label htmlFor={`company-${index}`}>Company <span style={{color: 'red'}}>*</span></label>
              <input
                id={`company-${index}`}
                type="text"
                value={work.company}
                onChange={(e) => handleChange('work', 'company', e.target.value, index)}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor={`role-${index}`}>Role <span style={{color: 'red'}}>*</span></label>
              <input
                id={`role-${index}`}
                type="text"
                value={work.role}
                onChange={(e) => handleChange('work', 'role', e.target.value, index)}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor={`startDate-${index}`}>Start Date <span style={{color: 'red'}}>*</span></label>
              <input
                id={`startDate-${index}`}
                type="date"
                value={work.startDate}
                onChange={(e) => handleChange('work', 'startDate', e.target.value, index)}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor={`endDate-${index}`}>End Date <span style={{color: 'red'}}>*</span></label>
              <input
                id={`endDate-${index}`}
                type="date"
                value={work.endDate}
                onChange={(e) => handleChange('work', 'endDate', e.target.value, index)}
                required
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
              <label htmlFor={`designation-${index}`}>Designation <span style={{color: 'red'}}>*</span></label>
              <input
                id={`designation-${index}`}
                type="text"
                value={work.designation}
                onChange={(e) => handleChange('work', 'designation', e.target.value, index)}
                required
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
      
      {successMessage && <div className="success-message">{successMessage}</div>}
      {error && <div className="error-message">{error}</div>}

      <button type="submit" className="submit-buttonn" disabled={loading}>
        {loading ? 'Submitting...' : <Save size={20} />}
        {loading ? '' : ' Submit'}
      </button>
    </form>
  );
};

export default AlumniForm;
 