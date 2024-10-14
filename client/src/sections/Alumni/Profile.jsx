// src/pages/Profile/Profile.jsx

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  CustomNavbar,
  EditProfile,
  EducationalInfo,
  Footer,
  PersonalInfo,
  WorkExperience,
} from "../../components";

import "./Profile.css";
import defaultAlumnImg from '../../assets/images/me.jpg'; // Ensure this path is correct
import { data } from "jquery";

const Profile = () => {
  const { id } = useParams();
  const [alumniData, setAlumniData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [Editdata,setEditData]=useState(null);
  // State to manage editing
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchAlumniData = async () => {
      try {
        // const response = await fetch(`https://alumni-apis.vercel.app/student/${id}`);
        const response = await fetch(`https://alumni-apis.vercel.app/student/67061ddc81d1163c3f9826a7`);
        if (!response.ok) throw new Error("Failed to fetch profile data");

        const data = await response.json();
        const studentData = data.data; // Access the nested data
        setEditData(data.data);
        // Map work_experience to the format expected by WorkExperience component
        const mappedExperiences = studentData.work_experience.map((exp) => ({
          year: `${exp.from_year} - ${exp.to_year}`,
          role: exp.designation,
          company: exp.company_name,
          description: exp.work_domain, // Customize as needed
          companyUrl: exp.company_url,
          companyType: exp.company_type,
          companyAddress: exp.company_address,
        }));

        // Pass the education array directly
        const mappedEducation = studentData.education.map((edu) => ({
          _id: edu._id,
          institution: edu.institute_name || "N/A",
          course: edu.course || "N/A",
          year: edu.passed_out_year || "N/A",
          grade: edu.grade || "N/A",
        }));

        setAlumniData({
          image: defaultAlumnImg, // You can update this with a dynamic URL if needed
          name: `${studentData.student_name + "  "+  studentData.roll_no}`,
          domains: [studentData.work_experience[0].work_domain  || "N/A"],
          skills: [
            `Batch ${studentData.batch}`,
            studentData.degree || "N/A",
          ],
          email: studentData.email,
          phone: studentData.mobile_number.toString(),
          linkedin: studentData.linkedin_id,
          instagram: studentData.instagram_id,
          facebook: studentData.facebook_id,
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
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAlumniData();
  }, [id]);

  // Handler to initiate editing
  const handleEdit = () => {
    setIsEditing(true);
  };

  // Handler to save changes from EditProfile
  const handleSaveChanges = (updatedData) => {
    // Update alumniData with the new structure
    const mappedExperiences = updatedData.work_experience.map((exp) => ({
      year: `${exp.from_year} - ${exp.to_year}`, // Ensure this format matches your WorkExperience component's expectation
      role: exp.designation,
      company: exp.company_name,
      description: exp.work_domain,
      companyUrl: exp.company_url,
      companyType: exp.company_type,
      companyAddress: exp.company_address,
    }));
  
    const mappedEducation = updatedData.education.map((edu) => ({
      _id: edu._id,
      institution: edu.institute_name || "N/A",
      course: edu.course || "N/A",
      year: edu.passed_out_year || "N/A",
      grade: edu.grade || "N/A",
    }));
  
    setAlumniData({
      image: defaultAlumnImg, // Update with a dynamic URL if needed
      name: `${updatedData.student_name} ${updatedData.roll_no}`,
      domains: [updatedData.work_experience[0]?.work_domain || "N/A"],
      skills: [
        `Batch ${updatedData.batch}`,
        updatedData.degree || "N/A",
      ],
      email: updatedData.email,
      phone: updatedData.mobile_number.toString(),
      linkedin: updatedData.linkedin_id,
      instagram: updatedData.instagram_id,
      facebook: updatedData.facebook_id,
      experiences: mappedExperiences,
      education: mappedEducation,
      dateOfBirth: updatedData.date_of_birth || "N/A",
      bloodGroup: updatedData.blood_group || "N/A",
      aadharNumber: updatedData.aadhar_number || "N/A",
      panNumber: updatedData.pan_number || "N/A",
      fatherName: updatedData.fathers_name || "N/A",
      fatherMobile: updatedData.fathers_mobile || "N/A",
      fatherEmail: updatedData.fathers_email || "N/A",
      motherName: updatedData.mothers_name || "N/A",
      motherMobile: updatedData.mothers_mobile || "N/A",
      motherEmail: updatedData.mothers_email || "N/A",
      experience: updatedData.experience || "N/A",
      higherEducation: updatedData.higher_education || false,
      pgCollege: updatedData.pg_college || "N/A",
      pgBranch: updatedData.pg_branch || "N/A",
      pgDepartment: updatedData.pg_department || "N/A",
      pgAddress: updatedData.pg_address || "N/A",
    });
    setIsEditing(false); // Close the editing mode
  };
  
  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleDelete = (index) => {
    const newExperiences = alumniData.experiences.filter((_, i) => i !== index);
    setAlumniData({ ...alumniData, experiences: newExperiences });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!alumniData) return null;

  return (
    <div className="profile">
      <CustomNavbar />
      {isEditing ? (
        <EditProfile
          alumniData={Editdata}
          onSave={handleSaveChanges}
          onCancel={handleCancelEdit}
        />
      ) : (
        <>
          <PersonalInfo
            alumniData={alumniData}
            onEdit={handleEdit}
          />
          <div className="profile-content">
            <WorkExperience
              experiences={alumniData.experiences}
              onEdit={(index) => {
                // Implement section-specific editing if needed
                handleEdit();
              }}
              onDelete={handleDelete}
            />
            <EducationalInfo
              education={alumniData.education}
              onEdit={handleEdit}
            />
          </div>
          <Footer />
        </>
      )}
    </div>
  );
};

export default Profile;
