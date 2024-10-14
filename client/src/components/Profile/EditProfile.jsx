import React, { useState,useEffect } from "react";
import { PlusCircle, MinusCircle, Camera } from "lucide-react";
import "./EditProfile.css";

const EditProfile = ({ alumniData, onSave, onCancel }) => {
  const [activeSection, setActiveSection] = useState("account");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  
  // Personal Info State
  const [studentName, setStudentName] = useState(alumniData?.student_name || "");
  const [email, setEmail] = useState(alumniData?.email || "");
  const [rollNo, setRollNo] = useState(alumniData?.roll_no || "");
  const [batch, setBatch] = useState(alumniData?.batch || "");
  const [degree, setDegree] = useState(alumniData?.degree || "");
  const [department, setDepartment] = useState(alumniData?.department || "");
  const [branch, setBranch] = useState(alumniData?.branch || "");
  const [linkedin, setLinkedin] = useState(alumniData?.linkedin_id || "");
  const [instagram, setInstagram] = useState(alumniData?.instagram_id || "");
  const [facebook, setFacebook] = useState(alumniData?.facebook_id || "");
  const [aadharNumber, setAadharNumber] = useState(alumniData?.aadhar_number?.toString() || "");
  const [panNumber, setPanNumber] = useState(alumniData?.pan_number || "");
  const [bloodGroup, setBloodGroup] = useState(alumniData?.blood_group || "");
  const [dateOfBirth, setDateOfBirth] = useState(alumniData?.date_of_birth || "");
  const [mobileNumber, setMobileNumber] = useState(alumniData?.mobile_number?.toString() || "");
  
  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];
  const degrees = ['B.Tech', 'M.Tech', 'MBA', 'B.Sc', 'M.Sc'];
  const [address, setAddress] = useState("");

  // Parent Info State
  const [fatherName, setFatherName] = useState(alumniData?.fathers_name || "");
  const [fatherEmail, setFatherEmail] = useState(alumniData?.fathers_email || "");
  const [fatherMobile, setFatherMobile] = useState(alumniData?.fathers_mobile?.toString() || "");
  const [motherName, setMotherName] = useState(alumniData?.mothers_name || "");
  const [motherEmail, setMotherEmail] = useState(alumniData?.mothers_email || "");
  const [motherMobile, setMotherMobile] = useState(alumniData?.mothers_mobile?.toString() || "");
  
  // Education Info State
  const [educationInfo, setEducationInfo] = useState(
    Array.isArray(alumniData?.education) && alumniData.education.length > 0
      ? alumniData.education
      : [{ institute_name: "", course: "", passed_out_year: "", grade: "" }]
  );

  // Work Info State
  const [workInfo, setWorkInfo] = useState(
    Array.isArray(alumniData?.work_experience) && alumniData.work_experience.length > 0
      ? alumniData.work_experience
      : [{
          company_name: "",
          company_address: "",
          work_domain: "",
          company_url: "",
          company_type: "",
          designation: "",
          from_year: "",
          to_year: "",
        }]
  );

  const [batches, setBatches] = useState([]);
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await fetch('https://alumni-apis.vercel.app/options');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        
        const { Batch, Department } = data.data || {};
        setBatches(Batch || []);
        setDepartments(Department || {});
      } catch (error) {
        setError(error.message);
      }
    };

    fetchOptions();
  }, []);
  // Define the sections in an ordered list
  const sections = ["account", "personal", "parent", "school", "work"];

  // ... (continued in next part)
  // Utility functions and handlers
  const addWorkInfo = () => {
    setWorkInfo([...workInfo, {
      company_name: "",
      company_address: "",
      work_domain: "",
      company_url: "",
      company_type: "",
      designation: "",
      from_year: "",
      to_year: "",
    }]);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("Image selected:", file);
      // Implement image upload logic here
    }
  };

  const removeWorkInfo = (index) => {
    const newWorkInfo = workInfo.filter((_, i) => i !== index);
    setWorkInfo(newWorkInfo);
  };

  const handleWorkInfoChange = (index, field, value) => {
    const newWorkInfo = [...workInfo];
    newWorkInfo[index][field] = value;
    setWorkInfo(newWorkInfo);
  };

  const goToPreviousSection = () => {
    const currentIndex = sections.indexOf(activeSection);
    if (currentIndex > 0) {
      setActiveSection(sections[currentIndex - 1]);
    }
  };

  const goToNextSection = () => {
    const currentIndex = sections.indexOf(activeSection);
    if (currentIndex < sections.length - 1) {
      setActiveSection(sections[currentIndex + 1]);
    }
  };

  const handleSave = async () => {
    const updatedData = {
      roll_no: rollNo,
      student_name: studentName,
      batch,
      degree,
      branch,
      department,
      date_of_birth: dateOfBirth,
      blood_group: bloodGroup,
      linkedin_id: linkedin,
      instagram_id: instagram,
      facebook_id: facebook,
      email,
      mobile_number: parseInt(mobileNumber),
      aadhar_number: parseInt(aadharNumber),
      pan_number: panNumber,
      fathers_name: fatherName,
      fathers_mobile: parseInt(fatherMobile),
      fathers_email: fatherEmail,
      mothers_name: motherName,
      mothers_mobile: parseInt(motherMobile),
      mothers_email: motherEmail,
      education: educationInfo,
      work_experience: workInfo,
    };
  
    setLoading(true);
    setSuccess(false); // Reset success message
    setError(null); // Reset error message
  
    try {
      const response = await fetch('https://alumni-apis.vercel.app/student/67061ddc81d1163c3f9826a7', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });
  
      const responseData = await response.json(); 
  
      if (!response.ok) {
        throw new Error(responseData.message || "An error occur red while saving.");
      }
  
     
      setSuccess(true);
      onSave(updatedData);  
  
    } catch (error) {
      setError(error.message); 
    } finally {
      setLoading(false);  
    }
  };
  
  
  // ... (continued in next part)
  // Render functions for each section
  const renderAccountSection = () => (
    <div className="section">
      <h3 className="section-title">Account Info</h3>
      <div className="profile-image-wrapper">
        <div className="placeholder-image">
          <Camera size={40} />
        </div>
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
        <input
          type="email"
          className="form-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label className="form-label">Password</label>
        <input
          type="password"
          className="form-input"
          placeholder="Enter new password"
        />
      </div>
    </div>
  );
  const renderPersonalSection = () => (
    <div className="section">
      <h3 className="section-title">Personal Details</h3>
  
      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-input"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
          />
        </div>
  
        <div className="form-group">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
  
        <div className="form-group">
          <label className="form-label">Mobile Number</label>
          <input
            type="text"
            className="form-input"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
          />
        </div>
  
        <div className="form-group">
          <label className="form-label">Date of Birth</label>
          <input
            type="text"
            className="form-input"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
          />
        </div>
  
        <div className="form-group">
          <label className="form-label">Blood Group</label>
          <select
            className="form-input"
            value={bloodGroup}
            onChange={(e) => setBloodGroup(e.target.value)}
          >
            <option value="">Select Blood Group</option>
            {/* Sample data or API response mapping */}
            {bloodGroups.map((group) => (
              <option key={group} value={group}>
                {group}
              </option>
            ))}
          </select>
        </div>
  
        <div className="form-group">
          <label className="form-label">Roll No</label>
          <input
            type="text"
            className="form-input"
            value={rollNo}
            onChange={(e) => setRollNo(e.target.value)}
          />
        </div>
  
        <div className="form-group">
          <label className="form-label">Batch</label>
          <select
            className="form-input"
            value={batch}
            onChange={(e) => setBatch(e.target.value)}
          >
            <option value="">Select Batch</option>
            {/* Sample data or API response mapping */}
            {batches.map((batchOption) => (
              <option key={batchOption} value={batchOption}>
                {batchOption}
              </option>
            ))}
          </select>
        </div>
  
        <div className="form-group">
          <label className="form-label">Degree</label>
          <select
            className="form-input"
            value={degree}
            onChange={(e) => setDegree(e.target.value)}
          >
            <option value="">Select Degree</option>
            {/* Sample data or API response mapping */}
            {degrees.map((degreeOption) => (
              <option key={degreeOption} value={degreeOption}>
                {degreeOption}
              </option>
            ))}
          </select>
        </div>
  
         
  
        <div className="form-group">
          <label className="form-label">Department</label>
          <select
            className="form-input"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          >
            <option value="">Select Department</option>
            {/* Sample data or API response mapping */}
            {departments.map((departmentOption) => (
              <option key={departmentOption} value={departmentOption}>
                {departmentOption}
              </option>
            ))}
          </select>
        </div>
  
        <div className="form-group">
          <label className="form-label">LinkedIn</label>
          <input
            type="text"
            className="form-input"
            value={linkedin}
            onChange={(e) => setLinkedin(e.target.value)}
          />
        </div>
  
        <div className="form-group">
          <label className="form-label">Instagram</label>
          <input
            type="text"
            className="form-input"
            value={instagram}
            onChange={(e) => setInstagram(e.target.value)}
          />
        </div>
  
        <div className="form-group">
          <label className="form-label">Facebook</label>
          <input
            type="text"
            className="form-input"
            value={facebook}
            onChange={(e) => setFacebook(e.target.value)}
          />
        </div>
  
        <div className="form-group">
          <label className="form-label">Aadhar Number</label>
          <input
            type="text"
            className="form-input"
            value={aadharNumber}
            onChange={(e) => setAadharNumber(e.target.value)}
          />
        </div>
  
        <div className="form-group">
          <label className="form-label">PAN Number</label>
          <input
            type="text"
            className="form-input"
            value={panNumber}
            onChange={(e) => setPanNumber(e.target.value)}
          />
        </div>
  
        
      </div>
      <div className="form-group">
          <label className="form-label">Address</label>
          <textarea
            className="form-input"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          ></textarea>
        </div>
    </div>
  );
  
  
  
  const renderParentSection = () => (
    <div className="section">
      <h3 className="section-title">Parent Info</h3>
      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Father's Name</label>
          <input
            type="text"
            className="form-input"
            value={fatherName}
            onChange={(e) => setFatherName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Father's Email</label>
          <input
            type="email"
            className="form-input"
            value={fatherEmail}
            onChange={(e) => setFatherEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Father's Contact Number</label>
          <input
            type="tel"
            className="form-input"
            value={fatherMobile}
            onChange={(e) => setFatherMobile(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Mother's Name</label>
          <input
            type="text"
            className="form-input"
            value={motherName}
            onChange={(e) => setMotherName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Mother's Email</label>
          <input
            type="email"
            className="form-input"
            value={motherEmail}
            onChange={(e) => setMotherEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Mother's Contact Number</label>
          <input
            type="tel"
            className="form-input"
            value={motherMobile}
            onChange={(e) => setMotherMobile(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
  
  const renderSchoolSection = () => (
    <div className="section">
      <h3 className="section-title">Education Info</h3>
      {educationInfo.map((edu, index) => (
        <div key={index} className="education-info">
          <div className="form-group">
            <label className="form-label">Institution Name</label>
            <input
              type="text"
              className="form-input"
              value={edu.institute_name}
              onChange={(e) => {
                const newEducationInfo = [...educationInfo];
                newEducationInfo[index].institute_name = e.target.value;
                setEducationInfo(newEducationInfo);
              }}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Course</label>
            <input
              type="text"
              className="form-input"
              value={edu.course}
              onChange={(e) => {
                const newEducationInfo = [...educationInfo];
                newEducationInfo[index].course = e.target.value;
                setEducationInfo(newEducationInfo);
              }}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Passed Out Year</label>
            <input
              type="text"
              className="form-input"
              value={edu.passed_out_year}
              onChange={(e) => {
                const newEducationInfo = [...educationInfo];
                newEducationInfo[index].passed_out_year = e.target.value;
                setEducationInfo(newEducationInfo);
              }}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Grade</label>
            <input
              type="text"
              className="form-input"
              value={edu.grade}
              onChange={(e) => {
                const newEducationInfo = [...educationInfo];
                newEducationInfo[index].grade = e.target.value;
                setEducationInfo(newEducationInfo);
              }}
            />
          </div>
          <button
            type="button"
            onClick={() => {
              const newEducationInfo = educationInfo.filter((_, i) => i !== index);
              setEducationInfo(newEducationInfo);
            }}
            className="btn-remove"
          >
            Remove
          </button>
        </div>
      ))}
      <button
        onClick={() => setEducationInfo([...educationInfo, { institute_name: "", course: "", passed_out_year: "", grade: "" }])}
        className="btn-add"
      >
        Add Education
      </button>
    </div>
  );
  

  const renderWorkSection = () => (
    <div className="section">
      <h3 className="section-title">Work Info</h3>
      {workInfo.map((work, index) => (
        <div key={index} className="work-info">
          <div className="form-group">
            <label className="form-label">Company Name</label>
            <input
              type="text"
              className="form-input"
              value={work.company_name}
              onChange={(e) => handleWorkInfoChange(index, "company_name", e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Company Address</label>
            <input
              type="text"
              className="form-input"
              value={work.company_address}
              onChange={(e) => handleWorkInfoChange(index, "company_address", e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Work Domain</label>
            <input
              type="text"
              className="form-input"
              value={work.work_domain}
              onChange={(e) => handleWorkInfoChange(index, "work_domain", e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Designation</label>
            <input
              type="text"
              className="form-input"
              value={work.designation}
              onChange={(e) => handleWorkInfoChange(index, "designation", e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label">From Year</label>
            <input
              type="text"
              className="form-input"
              value={work.from_year}
              onChange={(e) => handleWorkInfoChange(index, "from_year", e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label">To Year</label>
            <input
              type="text"
              className="form-input"
              value={work.to_year}
              onChange={(e) => handleWorkInfoChange(index, "to_year", e.target.value)}
            />
          </div>
          <button onClick={() => removeWorkInfo(index)} className="btn-remove">
            <MinusCircle size={20} />
            <span> Remove</span>
          </button>
        </div>
      ))}
      <button onClick={addWorkInfo} className="btn-add">
        <PlusCircle size={20} />
        <span> Add More Work Info</span>
      </button>
    </div>
  );
  

  const renderSection = (section) => {
    switch (section) {
      case "account": return renderAccountSection();
      case "personal": return renderPersonalSection();
      case "parent": return renderParentSection();
      case "school": return renderSchoolSection();
      case "work": return renderWorkSection();
      default: return null;
    }
  };

  return (
    <div className="edit-profile-container">
      <h2 className="edit-profile-title">
        <span>Edit Profile </span>
        <button className="btn-save-changes" onClick={handleSave} disabled={loading}>
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </h2>

      <div className="tabs">
        {sections.map((section) => (
          <button
            key={section}
            className={`tab-button ${activeSection === section ? "active" : ""}`}
            onClick={() => setActiveSection(section)}
          >
            {section.charAt(0).toUpperCase() + section.slice(1)} Info
          </button>
        ))}
      </div>

      {success && <p className="success-message">Changes saved successfully!</p>}
      {error && <p className="error-message">{error}</p>}

      <div className="section">{renderSection(activeSection)}</div>

      <div className="navigation-buttons">
        <button
          onClick={goToPreviousSection}
          disabled={activeSection === sections[0]}
          className="prev-btn"
        >
          Previous
        </button>
        <button
          onClick={goToNextSection}
          disabled={activeSection === sections[sections.length - 1]}
          className="next-btn"
        >
          Next
        </button>
      </div>
    </div>
  );
};


export default EditProfile;