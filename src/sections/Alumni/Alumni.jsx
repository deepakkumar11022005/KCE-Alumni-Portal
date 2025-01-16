import React, { useEffect, useState } from "react";
import "./Alumni.css";
import { Footer, Header, Loading, NavBar } from "../../components";
import { FaLinkedin, FaFacebook, FaInstagram } from "react-icons/fa";

const Alumni = () => {
  const [alumniData, setAlumniData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [expandedCard, setExpandedCard] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedBatch, setSelectedBatch] = useState("");
  const [batches, setBatches] = useState([]);
  const [genericFilter, setGenericFilter] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(""); // Error state

  // Fetch available batches
  const fetchBatches = async () => {
    try {
      setLoading(true); // Start loading
      setError(""); // Clear previous errors
      const response = await fetch("https://alumni-apis.vercel.app/batches");
      if (!response.ok) throw new Error("Failed to fetch batches");
      const data = await response.json();
      setBatches(data.data);
    } catch (error) {
      console.error("Error fetching batches:", error);
      setError("Unable to fetch batch data. Please try again later.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const fetchBatchAlumni = async (batch) => {
    try {
      setLoading(true); // Start loading
      setError(""); // Clear previous errors
      const response = await fetch(
        `https://alumni-apis.vercel.app/batch-students?page=1&limit=1&sort=roll_no&order=asc`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            batch: batch,
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to fetch batch alumni data");
      const data = await response.json();
      setAlumniData(data.data);
      setFilteredData(data.data);
      setTotalPages(data.pagination.totalPages || 1);
    } catch (error) {
      console.error("Error fetching batch alumni:", error);
      setError("Unable to fetch alumni data for the selected batch. Please try again.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    fetchBatches();
  }, []);

  // Handle batch change
  const handleBatchChange = (e) => {
    setSelectedBatch(e.target.value);
  };

  // Handle "Get" button click
  const handleGetBatchData = () => {
    if (selectedBatch) {
      fetchBatchAlumni(selectedBatch);
    } else {
      setError("Please select a batch before fetching data.");
    }
  };

  // Handle generic filter change
  const handleGenericFilterChange = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setGenericFilter(searchValue);

    const filtered = alumniData.filter((alumni) =>
      Object.values(alumni).some((value) =>
        value.toString().toLowerCase().includes(searchValue)
      )
    );
    setFilteredData(filtered);
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

        {/* Display Loading or Error */}
        {loading && <p className="a-loading"><Loading/></p>}
        {error && <p className="a-error">{error}</p>}

        {/* Filter Section */}
        <div className="a-filters">
          <div className="a-filter-select">
            <select value={selectedBatch} onChange={handleBatchChange}>
              <option value="">Select Batch</option>
              {batches.map((batch) => (
                <option key={batch} value={batch}>
                  {batch.slice(-4)} {/* Display last 4 digits */}
                </option>
              ))}
            </select>
            <button onClick={handleGetBatchData} className="a-filter-btn">
              Get
            </button>
          </div>

          <div className="a-search-bar">
            <input
              type="text"
              placeholder="Search alumni by name, department, etc."
              value={genericFilter}
              onChange={handleGenericFilterChange}
            />
          </div>
        </div>

        {/* Alumni Cards */}
        <div className="a-alumni-cards">
          {filteredData.map((alumni, index) => (
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
                    <strong>Batch:</strong> {alumni.batch.slice(-4)}
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
                        </a>{" "}
                        ({job.from_year} - {job.to_year})
                      </li>
                    ))}
                  </ul>
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
                      {alumni.degree} ({alumni.batch.slice(-4)})
                    </p>
                    <p className="a-location">{alumni.department || "N/A"}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <NavBar />
      <Footer />
    </div>
  );
};

export default Alumni;
