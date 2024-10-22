import React, { useState } from "react";
import "./AboutUs.css"; // Ensure the CSS file is correctly linked
import { Footer, Header, NavBar } from "../../components";
import aboutimg from "../../assets/images/about.png";
import company from '../../assets/images/companiesList.png';

const AboutUs = () => {
  const [activeSection, setActiveSection] = useState("About Alumni");

  // Function to render the content based on the active section
  const renderContent = () => {
    switch (activeSection) {
      case "About Alumni":
        return (
          <div className="about-section">
            <h2>About Karpagam College of Engineering</h2>
            <img src={aboutimg} alt="Karpagam College of Engineering" className="about-img" />
            <p>
              The Karpagam College of Engineering, established in the Year 2000,
              is an Autonomous institution, Approved by AICTE, New Delhi, and
              Affiliated to Anna University, Chennai. The college offers various
              Under Graduate and Post Graduate Engineering programmes...
              <br />
              <br />
              The Karpagam College of Engineering, established in the Year 2000,
              is an Autonomous institution, Approved by AICTE, New Delhi, and
              Affiliated to Anna University, Chennai. The college offers various
              Under Graduate and Post Graduate Engineering programmes. The
              College is accredited by NAAC with ‘A+’ Grade, TCS and Wipro with
              4500 students and 426 teaching and non-teaching staff members,
              Karpagam College of Engineering strives to impart quality
              education and an excellent career start to all its students.
            </p>
          </div>
        );
      case "Vision & Mission":
        return (
          <div className="vision-mission-section">
            <h2>Vision & Mission</h2>
            <h3>VISION</h3>
            <p>
              To become one of the best institutions at the National and
              International level by incorporating innovative teaching-learning
              methods to enable the students to secure a high-value career,
              motivate to pursue higher education, and research to serve
              society.
            </p>
            <h3>MISSION</h3>
            <p>
              To bring out knowledgeable engineers and professionals in their
              field of specialization by having qualified and trained faculty
              members and staff besides necessary infrastructure and to create a
              highly conducive teaching and learning environment.
            </p>
            <p>
              To work in close association with stakeholders by way of institute
              interaction, to take up need-based enhanced industry research and
              industry-specific programs.
            </p>
            <p>
              To organize co-curricular and extra-curricular activities for
              character and personality development to produce highly competent
              and motivated engineers and professionals to serve and lead
              society.
            </p>
          </div>
        );
      case "Distinguished Alumni":
        return (
          <div>
            <h2>Distinguished Alumni</h2>
            <p>
              Our distinguished alumni include leaders in various industries,
              innovators, entrepreneurs, and philanthropists who have made a
              lasting impact on society and their respective fields.
            </p>
          </div>
        );
      case "Alumni Association":
        return (
          <div className="alumni-association-section">
            <h2 className="alumni-title">
              Alumni Association of Karpagam College of Engineering
            </h2>
            <img
              src={aboutimg}
              alt="KCE Building"
              className="about-img"
            />
            <p className="alumni-description">
              The Alumni Association of Karpagam College of Engineering (KCE)
              works to organize social, educational, and networking events. The
              association aims to promote the connection between current
              students, faculty, and alumni. It also helps former students who
              have lost touch with the institution by providing a platform for
              interaction. The association supports KCE's vision by facilitating
              fundraising activities for research and teaching excellence.
            </p>
            <h3 className="alumni-members-title">Association Members</h3>
            <p className="alumni-members-description">
              The association is proud to have a vast network of alumni who have
              made significant contributions in their respective fields. From
              engineers to entrepreneurs, KCE's alumni are spread across the
              globe, bringing pride to the institution.
            </p>
          </div>
        );
      case "Placement Success":
        return (
          <div className="placement-success-section">
            <h2 className="placement-title">
              Placement Success at Karpagam College of Engineering
            </h2>
            <p className="placement-description">
              Karpagam College of Engineering (KCE) has an impressive track
              record of placing students in some of the top companies globally.
              The college ensures that every student is prepared for the job
              market through career guidance, placement training, and
              partnerships with leading companies. Our placement cell has
              consistently helped students secure positions in renowned
              organizations across various sectors.
            </p>
            <h3 className="company-list-title">
              Top Companies Recruiting from KCE
            </h3>
            <div className="company-list">
              <div className="company">
                <img
                  src="path_to_company_logo_1"
                  alt="Company 1"
                  className="company-logo"
                />
                <p className="company-name">Company 1</p>
              </div>
              <div className="company">
                <img
                  src="path_to_company_logo_2"
                  alt="Company 2"
                  className="company-logo"
                />
                <p className="company-name">Company 2</p>
              </div>
              <div className="company">
                <img
                  src="path_to_company_logo_3"
                  alt="Company 3"
                  className="company-logo"
                />
                <p className="company-name">Company 3</p>
              </div>
              <div className="company">
                <img
                  src="path_to_company_logo_4"
                  alt="Company 4"
                  className="company-logo"
                />
                <p className="company-name">Company 4</p>
              </div>
            </div>
            <p className="placement-stats">
              Each year, KCE achieves over 95% placement rates, with students
              receiving offers from leading companies in industries such as IT,
              Engineering, Consulting, Manufacturing, and more. KCE's commitment
              to excellence in education is reflected in the success of its
              graduates.
            </p>
          </div>
        );
      default:
        return <div>Select a section from the sidebar</div>;
    }
  };

  return (
    <div className="about-fill" >
      <Header />
      <div className="header">
        <h1>About Us</h1>
        <p className="subtitle">All the News and Updates from KCE ALUMNI</p>
      </div>
      <div className="about-us-container">
        <div className="main-content">{renderContent()}</div>
        <div className="sidebar">
          <h3>About Us</h3>
          <ul>
            <li onClick={() => setActiveSection("About Alumni")}>
              About Alumni
            </li>
            <li onClick={() => setActiveSection("Vision & Mission")}>
              Vision & Mission
            </li>
            <li onClick={() => setActiveSection("Distinguished Alumni")}>
              Distinguished Alumni
            </li>
            <li onClick={() => setActiveSection("Alumni Association")}>
              Alumni Association
            </li>
            <li onClick={() => setActiveSection("Placement Success")}>
              Placement Success
            </li>
          </ul>
        </div>
      </div>
      <Footer />
      <NavBar />
    </div>
  );
};

export default AboutUs;
