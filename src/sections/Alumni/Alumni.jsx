import React, { useEffect, useState } from "react";
import { Footer, Header, Loading, NavBar } from "../../components";
import { FaLinkedin, FaFacebook, FaInstagram } from "react-icons/fa";
import "./Alumni.css";

const Alumni = () => {
  const [alumniData, setAlumniData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedBatch, setSelectedBatch] = useState("");
  const [batches, setBatches] = useState([]);
  const [searchTags, setSearchTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const recordsPerPage = 12;

  const fetchBatches = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://alumni-apis.onrender.com/batches");
      const data = await response.json();

      if (data.success) {
        setBatches(data.data);
        const currentYear = new Date().getFullYear();
        const prevYearBatch = `batch_${currentYear - 1}`;
        const defaultBatch = data.data.includes(prevYearBatch)
          ? prevYearBatch
          : data.data[data.data.length - 2];
        setSelectedBatch(defaultBatch);
        fetchBatchAlumni(defaultBatch);
      } else {
        throw new Error(data.message || "Failed to fetch batches");
      }
    } catch (error) {
      setError("Unable to fetch batch data. Please try again later.");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchBatchAlumni = async (batch) => {
    try {
      setLoading(true);
      setAlumniData([]);
      setFilteredData([]);

      const url = `https://alumni-apis.onrender.com/batch-students?page=1&limit=${100000}&sort=roll_no&order=asc`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          batch: batch.slice(-4),
        }),
      });

      const data = await response.json();
      if (data.success) {
        setError(null);
        setAlumniData(data.data);
        setFilteredData(data.data);
        setTotalPages(Math.ceil(data.data.length / recordsPerPage));
        setCurrentPage(1);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      setError("Unable to fetch alumni data. Please try again.");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBatches();
  }, []);

  const handleSearch = (e) => {
    if (e.key === "Enter" && e.target.value.trim() !== "") {
      const newTag = e.target.value.trim().toLowerCase();
      if (!searchTags.includes(newTag)) {
        const updatedTags = [...searchTags, newTag];
        setSearchTags(updatedTags);
        filterAlumni(updatedTags);
      }
      e.target.value = "";
    }
  };

  const clearTags = () => {
    setSearchTags([]);
    setFilteredData(alumniData);
    setCurrentPage(1);
  };

  const filterAlumni = (tags) => {
    if (tags.length === 0) {
      setFilteredData(alumniData);
      return;
    }

    const filtered = alumniData.filter((alumni) =>
      tags.every((tag) => {
        const searchableFields = [
          alumni.student_name,
          alumni.roll_no,
          alumni.batch,
          alumni.department,
          alumni.degree,
        ].map((field) => (field || "").toLowerCase());

        return searchableFields.some((field) => field.includes(tag));
      })
    );

    setFilteredData(filtered);
    setCurrentPage(1);
  };

  const getPaginationGroup = () => {
    let start = Math.max(currentPage - 2, 1);
    let end = Math.min(start + 4, totalPages);

    if (end === totalPages) {
      start = Math.max(end - 4, 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  return (
    <div className="a-alumni-page">
      <Header />
      <div className="a-banner">
        <img
          src="https://www.aluminati.net/wp-content/uploads/2022/12/How-do-you-form-an-Alumni-Association-.jpg"
          alt="Alumni Banner"
          className="a-banner-image"
        />
        <div className="a-banner-text">
          <h1>Alumni Network</h1>
          <p>Connecting Generations of Excellence</p>
        </div>
      </div>

      <div className="a-alumni-content">
        <div className="a-filters">
          <div className="a-filter-select">
            <select
              value={selectedBatch}
              onChange={(e) => setSelectedBatch(e.target.value)}
              className="a-select"
            >
              <option value="">Select Batch</option>
              {batches.map((batch) => (
                <option key={batch} value={batch}>
                  {batch.replace("batch_", "")}
                </option>
              ))}
            </select>
            <button
              onClick={() => fetchBatchAlumni(selectedBatch)}
              className="a-get-btn"
              disabled={!selectedBatch}
            >
              Get
            </button>
            <span className="a-record-count">
              {filteredData.length} record{filteredData.length !== 1 ? "s" : ""}{" "}
              found
            </span>
          </div>

          <div className="a-search-container">
            <input
              type="text"
              placeholder="Search alumni..."
              onKeyDown={handleSearch}
              className="a-search-input"
            />
            <div className="a-tags">
              {searchTags.map((tag, index) => (
                <span key={index} className="a-tag">
                  {tag}
                  <button
                    onClick={() => {
                      const updatedTags = searchTags.filter((t) => t !== tag);
                      setSearchTags(updatedTags);
                      filterAlumni(updatedTags);
                    }}
                    className="a-tag-remove"
                  >
                    ×
                  </button>
                </span>
              ))}
              {searchTags.length > 0 && (
                <button onClick={clearTags} className="a-clear-btn">
                  Clear All
                </button>
              )}
            </div>
          </div>
        </div>

        {loading && (
          <div className="a-loading">
            <Loading />
          </div>
        )}
        {error && <div className="a-error">{error}</div>}

        <div className="a-alumni-grid">
          {filteredData
            .slice(
              (currentPage - 1) * recordsPerPage,
              currentPage * recordsPerPage
            )
            .map((alumni, index) => (
              <div key={index} className="a-card">
                <img
                  src="https://www.shutterstock.com/image-vector/school-graduation-hat-cartoon-diploma-600nw-2355557719.jpg"
                  alt={alumni.student_name}
                  className="a-card-image"
                />
                <div className="a-card-content">
                  <h3>{alumni.student_name}</h3>
                  <p className="a-roll">{alumni.roll_no}</p>
                  <p className="a-batch">
                    Batch of {alumni.batch.replace("batch_", "")}
                  </p>
                  <p className="a-dept">{alumni.department}</p>
                  <div className="a-social">
                    <a
                      href={alumni.linkedin|| "https://www.linkedin.com"  }
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Connect with kceians"
                    >
                      <FaLinkedin className="a-icon" /> 
                    </a>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {totalPages > 1 && (
          <div className="a-pagination">
            <button
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
              className="a-page-btn"
            >
              First
            </button>
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="a-page-btn"
            >
              Prev
            </button>

            {getPaginationGroup().map((number) => (
              <button
                key={number}
                onClick={() => setCurrentPage(number)}
                className={`a-page-btn ${
                  currentPage === number ? "a-active" : ""
                }`}
              >
                {number}
              </button>
            ))}

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="a-page-btn"
            >
              Next
            </button>
            <button
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
              className="a-page-btn"
            >
              Last
            </button>
          </div>
        )}
      </div>
      <Footer />
      <NavBar />
    </div>
  );
};

export default Alumni;
