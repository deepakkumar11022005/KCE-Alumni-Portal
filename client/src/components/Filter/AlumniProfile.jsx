import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  CustomNavbar,
  EducationalInfo,
  Footer,
  PersonalInfo,
  WorkExperience,
  EditProfile,
} from "../../components";
import defaultAlumnImg from '../../assets/images/me.jpg';

const AlumniProfile = () => {
  const { id } = useParams();
  const [alumniData, setAlumniData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchAlumniData = async () => {
      try {
        const response = await fetch(`https://alumni-apis.vercel.app/student/67061ddc81d1163c3f9826a7`);
        if (!response.ok) throw new Error("Failed to fetch profile data");

        const { data: studentData } = await response.json();
     
        const mappedExperiences = studentData.work_experience?.map((exp) => ({
          year: `${exp.from_year} - ${exp.to_year}`,
          role: exp.designation,
          company: exp.company_name,
          description: exp.work_domain,
          companyUrl: exp.company_url,
          companyType: exp.company_type,
          companyAddress: exp.company_address,
        })) || [];

        const mappedEducation = studentData.education?.map((edu) => ({
          _id: edu._id,
          institution: edu.institute_name || "N/A",
          course: edu.course || "N/A",
          year: edu.passed_out_year || "N/A",
          grade: edu.grade || "N/A",
        })) || [];
       console.log(studentData);
       
       setAlumniData({
        image: studentData.image || defaultAlumnImg,  // Use studentData.image if available, otherwise fallback to default
        name: `${studentData.student_name || "N/A"} ${studentData.roll_no || ""}`,
        domains: studentData.work_experience?.[0]?.work_domain ? [studentData.work_experience[0].work_domain] : ["N/A"],
        skills: [
          `Batch ${studentData.batch || "N/A"}`,
          studentData.degree || "N/A",
        ],
        email: studentData.email || "N/A",
        phone: studentData.mobile_number?.toString() || "N/A",
        linkedin: studentData.linkedin_id || "N/A",
        instagram: studentData.instagram_id || "N/A",
        facebook: studentData.facebook_id || "N/A",
        experiences: mappedExperiences,
        education: mappedEducation,
        dateOfBirth: studentData.date_of_birth || "N/A",
        bloodGroup: studentData.blood_group || "N/A",
        aadharNumber: studentData.aadhar_number || "N/A",
        panNumber: studentData.pan_number || "N/A",
        fatherName: studentData.fathers_name || "N/A",
        fatherMobile: studentData.fathers_mobile || "N/A",
        fatherEmail: studentData.fathers_email || "N/A",
        motherName: studentData.mothers_name || "N/A",
        motherMobile: studentData.mothers_mobile || "N/A",
        motherEmail: studentData.mothers_email || "N/A",
        experience: studentData.experience || "N/A",
        higherEducation: studentData.higher_education || false,
        pgCollege: studentData.pg_college || "N/A",
        pgBranch: studentData.pg_branch || "N/A",
        pgDepartment: studentData.pg_department || "N/A",
        pgAddress: studentData.pg_address || "N/A",
      });
      

      } catch (err) {
        console.error(err);
        setError("Failed to load alumni data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchAlumniData();
  }, [id]);

  const handleEdit = () => {
    setIsEditing(true);
  };
  
  const handleSaveChanges = (updatedData) => {
    setAlumniData(prevData => ({
      ...prevData,
      ...updatedData,
    }));
    setIsEditing(false);
  };

  // Loading and error handling
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!alumniData) return <div>No data available.</div>;  // Extra check for alumniData
   console.log(alumniData);
   
  return (
    <div className="profile-page">
      <CustomNavbar />
      <div className="profile-content">
        <h1>Profile of {alumniData?.name || 'Unknown'}</h1>
        <img src={alumniData?.image || defaultAlumnImg} alt={alumniData?.name || 'Profile Image'} />

        {!isEditing ? (
          <>
            <PersonalInfo data={alumniData} onEdit={handleEdit} />
            <WorkExperience experiences={alumniData?.workExperience || []} />
            <EducationalInfo education={alumniData?.education || []} />
          </>
        ) : (
          <EditProfile alumniData={alumniData} onSave={handleSaveChanges} onCancel={() => setIsEditing(false)} />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default AlumniProfile;
