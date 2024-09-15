import React, { useState } from "react";
import {
  CustomNavbar,
  EducationalInfo,
  Footer,
  PersonalInfo,
  WorkExperience,
} from "../components";

import './Profile.css'
const Profile = () => {
  const [alumniData, setAlumniData] = useState({
    image: '../../assets/images/me.jpg',
    name: "John Doe",
    domains: ["Web Development", "Data Science","Spring Boot", "MongoDb"],
    skills: ["React", "Python", "Machine Learning"],
    email: "john.doe@example.com",
    phone: "+1 234 567 8900",
    experiences: [
      {
        company: "Tech Corp",
        address: "Silicon Valley, CA",
        jobDomain: "Frontend Developer",
        duration: "2020-Present",
      },
      {
        company: "Data Inc",
        address: "New York, NY",
        jobDomain: "Data Analyst",
        duration: "2018-2020",
      },
    ],
    education: {
      "10th": { school: "City High School", year: 2010, percentage: 92 },
      "12th": { school: "State Senior Secondary", year: 2012, percentage: 88 },
      college: {
        name: "National Institute of Technology",
        degree: "B.Tech in Computer Science",
        year: 2016,
        cgpa: 8.5,
      },
    },
  });

  const handleEdit = (section, index) => {
    // Implement edit functionality
    console.log(`Editing ${section}`, index);
  };

  const handleDelete = (index) => {
    // Implement delete functionality for work experience
    const newExperiences = alumniData.experiences.filter((_, i) => i !== index);
    setAlumniData({ ...alumniData, experiences: newExperiences });
  };

  return (
    <div className="profile">
      <CustomNavbar />
      <PersonalInfo
        alumniData={alumniData}
        onEdit={(section) => handleEdit(section)}
      />
     <div className="profile-content">
     <WorkExperience
        experiences={alumniData.experiences}
        onEdit={(index) => handleEdit("experience", index)}
        onDelete={handleDelete}
      />
      <EducationalInfo
        education={alumniData.education}
        onEdit={(section) => handleEdit(section)}
      />
     </div>
      <Footer/>
    </div>
  );
};

export default Profile;
