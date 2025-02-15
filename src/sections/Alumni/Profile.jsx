import { ProfileHeader, PersonalInfo, EducationInfo, WorkInfo, TabNavigation, Loading, Header } from '../../components/index';
import './Profile.css';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const AlumniProfile = ({alumniAuthData}) => {
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
      // Get the current batch from your app's state/context if available
      const batch =  alumniAuthData?.batch; // Replace with actual batch value from your app state
      
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/student/${id}?batch=${batch}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${alumniAuthData?.token}`,
          }
        }
      );

      if (!response.ok) {
        throw new Error('Failed to load profile data');
      }

      const data = await response.json();
      
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
      
      const updateData = {
        batch: editableData.batch,
        email: editableData.email,
        // Add any other fields that need to be updated
        student_name: editableData.student_name,
        degree: editableData.degree,
        branch: editableData.branch,
        department: editableData.department,
        mobile_number: editableData.mobile_number,
        fathers_name: editableData.fathers_name,
        mothers_name: editableData.mothers_name,
        education: editableData.education,
        work_experience: editableData.work_experience,
        work_domain: editableData.work_domain,
        is_entrepreneur: editableData.is_entrepreneur,
        is_employee: editableData.is_employee,
        is_unemployee: editableData.is_unemployee,
        is_highereducation: editableData.is_highereducation,
        is_exam: editableData.is_exam
      };

      const response = await fetch(
        `https://alumni-apis.onrender.com/student/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updateData)
        }
      );

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.message || 'Failed to update profile');
      }

      setProfileData(editableData);
      setIsEditing(false);
      // Optionally show a success message
      alert('Profile updated successfully!');
    } catch (err) {
      setError('Failed to save changes. Please try again.');
      console.error('Profile update error:', err);
      alert('Failed to update profile. Please try again.');
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
      <Header />
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