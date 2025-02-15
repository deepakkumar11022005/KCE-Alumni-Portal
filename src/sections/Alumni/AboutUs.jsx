import React, { useState, useEffect } from "react";
import "./AboutUs.css";
import { Footer, Header, NavBar, PageBanner } from "../../components";
import aboutData from "../../assets/JSON/AlumniAboutUs.json";
import aboutimg from "../../assets/images/about.png";
import aboutBanner from '../../assets/images/About.jpeg'
// import aboutBanner from '../../assets/images/newpaper.png'
const AboutUs = ({alumniAuthData}) => {
  const [activeSection, setActiveSection] = useState("About Alumni");
  const [sectionData, setSectionData] = useState({});

  useEffect(() => {
    const currentSection = aboutData.sections.find(
      (section) => section.title === activeSection
    );
    setSectionData(currentSection);
  }, [activeSection]);

  return (
    <div className="about-fill">
      <Header alumniAuthData={alumniAuthData} />
      <PageBanner imageUrl={aboutBanner} title={"About Us"} subtitle={"Connecting alumni, sharing memories, building future"} />
      
      <div className="about-us-container">
        <div className="main-content">
          {sectionData && (
            <>
              <h2>{sectionData.header}</h2>
              {sectionData.image && <img src={aboutimg} alt="About Section" />}
              {Array.isArray(sectionData.content)
                ? sectionData.content.map((item, index) =>
                    typeof item === "string" ? (
                      <p key={index}>{item}</p>
                    ) : (
                      <div key={index}>
                        <h3>{item.subHeader}</h3>
                        {Array.isArray(item.text)
                          ? item.text.map((text, idx) => <p key={idx}>{text}</p>)
                          : <p>{item.text}</p>}
                      </div>
                    )
                  )
                : null}
            </>
          )}
        </div>
        <div className="sidebar">
          <h3>About Us</h3>
          <ul>
            {aboutData.sections.map((section) => (
              <li
                key={section.title}
                onClick={() => setActiveSection(section.title)}
              >
                {section.title}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Footer />
      <NavBar />
    </div>
  );
};

export default AboutUs;
