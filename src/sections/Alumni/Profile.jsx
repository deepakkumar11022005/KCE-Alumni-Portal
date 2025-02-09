import { ProfileHeader ,PersonalInfo,EducationInfo,WorkInfo,TabNavigation, Loading, Header } from '../../components/index';
import './Profile.css';
import { useParams,useNavigate   } from 'react-router-dom';
import { useState,useEffect  } from 'react';
const AlumniProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);
  const [editableData, setEditableData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('personal');
  const [isEditing, setIsEditing] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);

  useEffect(() => {
    fetchProfileData();
  }, [id]);

  const fetchProfileData = async () => {
    if (!id) {
      setError('Invalid profile ID');
      setLoading(false);
      return;
    }
  
    try {
      setLoading(true);
  
      // Make an API request with a request body
      // const response = await fetch(`https://alumni-apis.onrender.com/student/${id}`, {
      //   method: 'POST', // Specify POST or PUT depending on API design
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ batch: "2024" }),
      // });
  
      // if (!response.ok) {
      //   throw new Error('Failed to load profile data');
      // }
  
      // const data = await response.json();
  const data={"success":true,"data":{"_id":"67186adb1ba8576e422bcd37","student_image_id":"img_001","roll_no":"2023CSE1004","student_name":"Deepak S","batch":"2024","degree":"B.Tech","branch":"Computer Science","department":"Engineering","email":"john224.doe@ample.com","mobile_number":"0000000000","aadhar_number":12345529012,"fathers_name":"Richard D","fathers_mobile":9876543211,"fathers_email":"richard.doe@example.com","mothers_name":"Jane Doe","mothers_mobile":9876543212,"mothers_email":"jane.doe@example.com","education":[{"institute_name":"ABC School","course":"High School","passed_out_year":"2020","grade":"A","_id":"67186adb1ba8576e422bcd38"}],"work_domain":"Software Development","is_entrepreneur":false,"is_employee":true,"is_unemployee":false,"is_highereducation":false,"is_exam":false,"work_experience":[{"company_name":"Tech Corp","company_address":"1234, Tech Park, NY","work_domain":"Web Development","company_url":"https://techcorp.com","company_type":"Private","designation":"Intern","from_year":"2023","to_year":"2024","_id":"67186adb1ba8576e422bcd39"}],"__v":0}};
      if (!data.success) {
        throw new Error(data.message || 'Failed to load profile data');
      }
  
      setProfileData(data.data);
      setEditableData(data.data);
    } catch (err) {
      setError(err.message);
      console.error('Profile fetch error:', err);
    } finally {
      setLoading(false);
    }
  };
  

  const handleSave = async () => {
    try {
      setSaveLoading(true);
      // API call would go here
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulating API call
      setProfileData(editableData);
      setIsEditing(false);
    } catch (err) {
      setError('Failed to save changes. Please try again.');
    } finally {
      setSaveLoading(false);
    }
  };

  if (loading) return <Loading />;
  if (error) {
    return (
      <div className="alumni-profile-error-container">
        <div className="alumni-profile-error-content">
          <h2>Oops! Something went wrong</h2>
          <p>{error}</p>
          <button onClick={() => navigate(-1)} className="alumni-profile-back-button">
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="alumni-profile-container">
        <Header/>
      <ProfileHeader 
        editableData={editableData}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        onSave={handleSave}
        onCancel={() => {
          setEditableData(profileData);
          setIsEditing(false);
        }}
        saveLoading={saveLoading}
        handleInputChange={(field, value) => 
          setEditableData(prev => ({ ...prev, [field]: value }))
        }
      />

      <div className="alumni-profile-body">
        <TabNavigation 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        <div className="alumni-profile-tab-content">
          {activeTab === 'personal' && (
            <PersonalInfo 
              editableData={editableData}
              isEditing={isEditing}
              handleInputChange={(field, value) => 
                setEditableData(prev => ({ ...prev, [field]: value }))
              }
            />
          )}
          {activeTab === 'education' && (
            <EducationInfo 
              editableData={editableData}
              isEditing={isEditing}
              setEditableData={setEditableData}
            />
          )}
          {activeTab === 'work' && (
            <WorkInfo 
              editableData={editableData}
              isEditing={isEditing}
              setEditableData={setEditableData}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AlumniProfile;