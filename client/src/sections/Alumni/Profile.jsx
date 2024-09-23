import React, { useState } from "react";
import {
  CustomNavbar,
  EditProfile,
  EducationalInfo,
  Footer,
  PersonalInfo,
  WorkExperience,
} from "../../components";

import './Profile.css'
const Profile = () => {
  const [alumniData, setAlumniData] = useState({
    image: '../../assets/images/me.jpg',
    name: "Deepakkumar S",
    domains: ["Web Development", "Data Science","Spring Boot", "MongoDb"],
    skills: ["Batch 2022-2026", "Computer Science and Engineering" ],
    email: "john.doe@example.com",
    phone: "+1 234 567 8900",
      experiences : [
      {
        year: '2023',
        role: 'Senior Software Engineer',
        company: 'Tech Innovations Inc.',
        description: 'Led a team of developers in creating cutting-edge web applications using React and Node.js.'
      },
      {
        year: '2021',
        role: 'Full Stack Developer',
        company: 'Digital Solutions Ltd.',
        description: 'Developed and maintained full-stack applications, improving system efficiency by 40%.'
      },
      {
        year: '2019',
        role: 'Junior Web Developer',
        company: 'WebCraft Studios',
        description: 'Assisted in the development of responsive websites and learned modern web technologies.'
      }
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
      <EditProfile/>
      {/* <PersonalInfo
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
      <Footer/> */}
    </div>
  );
};

export default Profile;
