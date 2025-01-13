import React, { useEffect, useState } from "react";
import "./Alumni.css";
import { Footer, Header, NavBar } from "../../components";
import { FaLinkedin, FaFacebook, FaInstagram } from "react-icons/fa";

const Alumni = () => {
  const [alumniData, setAlumniData] = useState([]);
  const [expandedCard, setExpandedCard] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    year: "",
    name: "",
    company: "",
    profession: "",
    location: "",
  });

  // Fetch data using Fetch API
  const fetchAlumniData = async (page = 1, filterParams = {}) => {
    const queryParams = new URLSearchParams({
      page,
      limit: 12,
      sort: "batch",
      order: "desc",
      ...filterParams,
    }).toString();

    try {
      const response = await fetch(`https://alumni-apis.vercel.app/students?${queryParams}`);
      if (!response.ok) throw new Error("Failed to fetch alumni data");

      const data = await response.json();
      setAlumniData(data.data);  // 'data.data' is the array of alumni data
      setTotalPages(data.pagination.totalPages);  // 'data.pagination.totalPages' for total page count
    } catch (error) {
      console.error("Error fetching alumni data:", error);
    }
  };

  useEffect(() => {
    fetchAlumniData(currentPage, filters);
  }, [currentPage, filters]);

  // Handle filter input change
  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  // Handle pagination
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // Toggle expanded card
  const toggleCard = (index) => {
    setExpandedCard(index === expandedCard ? null : index);
  };

  return (
    <div className="a-alumni-page">
      <Header />
      <div className="a-banner">
        <img
          src="https://www.aluminati.net/wp-content/uploads/2022/12/How-do-you-form-an-Alumni-Association-.jpg"
          alt="Alumni Victory Banner"
          className="a-banner-image"
        />
        <div className="a-banner-text">
          <h1>Alumni Victory</h1>
          <p>Celebrating the Success of KCE Alumni!</p>
        </div>
      </div>

      <div className="a-alumni-content">
        <h2>Meet Our Alumni</h2>

        {/* Filter Section */}
        <div className="a-filters">
          <input
            type="text"
            name="name"
            placeholder="Search by Name"
            value={filters.name}
            onChange={handleFilterChange}
          />
          <input
            type="text"
            name="year"
            placeholder="Search by Year"
            value={filters.year}
            onChange={handleFilterChange}
          />
          <input
            type="text"
            name="company"
            placeholder="Search by Company"
            value={filters.company}
            onChange={handleFilterChange}
          />
          <input
            type="text"
            name="profession"
            placeholder="Search by Profession"
            value={filters.profession}
            onChange={handleFilterChange}
          />
          <input
            type="text"
            name="location"
            placeholder="Search by Location"
            value={filters.location}
            onChange={handleFilterChange}
          />
        </div>

        <div className="a-alumni-cards">
          {alumniData.map((alumni, index) => (
            <div
              key={index}
              className={`a-alumni-card ${expandedCard === index ? "a-expanded-card" : ""}`}
              onClick={() => toggleCard(index)}
            >
              {expandedCard === index ? (
                <div className="a-expanded-content">
                  <button className="a-close-btn" onClick={() => toggleCard(null)}>
                    &times;
                  </button>
                  <img
                    src={alumni.profile_image || "https://via.placeholder.com/250x250"}
                    alt={`${alumni.student_name} profile`}
                    className="a-expanded-profile-image"
                  />
                  <h3 className="a-alumni-name">{alumni.student_name}</h3>
                  <p>
                    <strong>Roll No:</strong> {alumni.roll_no}
                  </p>
                  <p>
                    <strong>Batch:</strong> {alumni.batch}
                  </p>
                  <p>
                    <strong>Degree:</strong> {alumni.degree} {alumni.branch}
                  </p>
                  <p>
                    <strong>Department:</strong> {alumni.department}
                  </p>
                  <h4>Work Experience:</h4>
                  <ul>
                    {alumni.work_experience.map((job, idx) => (
                      <li key={idx}>
                        <strong>{job.designation}</strong> at{" "}
                        <a href={job.company_url} target="_blank" rel="noreferrer">
                          {job.company_name}
                        </a> ({job.from_year} - {job.to_year})
                      </li>
                    ))}
                  </ul>
                  <div className="a-social-links">
                    {alumni.social_media.linkedin && (
                      <a href={alumni.social_media.linkedin} target="_blank" rel="noreferrer">
                        <FaLinkedin />
                      </a>
                    )}
                    {alumni.social_media.facebook && (
                      <a href={alumni.social_media.facebook} target="_blank" rel="noreferrer">
                        <FaFacebook />
                      </a>
                    )}
                    {alumni.social_media.instagram && (
                      <a href={alumni.social_media.instagram} target="_blank" rel="noreferrer">
                        <FaInstagram />
                      </a>
                    )}
                  </div>
                </div>
              ) : (
                <div className="a-alumni-card-content">
                  <img
                    src={alumni.profile_image || "https://via.placeholder.com/250x250"}
                    alt={`${alumni.student_name} profile`}
                    className="a-alumni-profile-image"
                  />
                  <div className="a-alumni-info">
                    <h3 className="a-alumni-name">{alumni.student_name}</h3>
                    <p className="a-degree-batch">
                      {alumni.degree} ({alumni.batch})
                    </p>
                    <p className="a-location">{alumni.department || "N/A"}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="a-pagination">
          <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      </div>
      <NavBar />
      <Footer />
    </div>
  );
};

export default Alumni;
