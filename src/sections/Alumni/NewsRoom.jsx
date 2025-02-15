import React, { useState, useEffect } from "react";
import { ChevronDown, Calendar, X } from "lucide-react";
import "./NewsRoom.css";
import { Footer, Header, Loading, NavBar, PageBanner } from "../../components";
import newBanner from '../../assets/images/newpaper.png'
const generateArchiveData = (startYear, newsData) => {
  if (!Array.isArray(newsData)) {
    return {};
  }

  const archiveData = {};
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  for (let year = currentYear; year >= startYear; year--) {
    archiveData[year] = {};
    const months = year === currentYear ? currentMonth : 11;

    for (let month = months; month >= 0; month--) {
      const monthName = new Date(year, month).toLocaleString("default", {
        month: "long",
      });
      const count = newsData.filter((news) => {
        try {
          const newsDate = new Date(news.date.split("/").reverse().join("-"));
          return (
            newsDate.getFullYear() === year && newsDate.getMonth() === month
          );
        } catch (error) {
          console.error("Error parsing date:", error);
          return false;
        }
      }).length;

      if (count > 0) {
        archiveData[year][monthName] = count;
      }
    }

    if (Object.keys(archiveData[year]).length === 0) {
      delete archiveData[year];
    }
  }

  return archiveData;
};

const limitText = (text, wordLimit = 100) => {
  const words = text?.split(" ") || [];
  return words.length > wordLimit
    ? words.slice(0, wordLimit).join(" ") + "..."
    : text;
};

const formatDate = (dateString) => {
  try {
    const [day, month, year] = dateString.split("/");
    const date = new Date(year, month - 1, day);

    const suffix = (day) => {
      const dayNum = parseInt(day);
      if (dayNum > 3 && dayNum < 21) return "th";
      switch (dayNum % 10) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    };

    return `${parseInt(day)}${suffix(day)} ${date.toLocaleString("default", {
      month: "short",
    })}, ${year}`;
  } catch (error) {
    console.error("Error formatting date:", error);
    return dateString;
  }
};

const parseDate = (dateString) => {
  try {
    const [day, month, year] = dateString.split("/");
    return new Date(year, month - 1, day);
  } catch (error) {
    console.error("Error parsing date:", error);
    return new Date();
  }
};

const isValidBase64Image = (str) => {
  if (!str?.startsWith("data:image")) return false;
  try {
    const base64Data = str.split(",")[1];
    return btoa(atob(base64Data)) === base64Data;
  } catch (e) {
    return false;
  }
};

const ImageDisplay = ({ imageData, title, className }) => {
  const [imgError, setImgError] = useState(false);

  if (!imageData) return null;

  if (isValidBase64Image(imageData)) {
    return (
      <img
        src={imageData}
        alt={title}
        className={className}
        onError={() => setImgError(true)}
        style={{ display: imgError ? "none" : "block" }}
      />
    );
  }

  return (
    <img
      src={imageData}
      alt={title}
      className={className}
      onError={() => setImgError(true)}
      style={{ display: imgError ? "none" : "block" }}
    />
  );
};

const NewsRoom = ({ alumniAuthData, handleAlumniLogout }) => {
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [archiveData, setArchiveData] = useState({});
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredNewsData, setFilteredNewsData] = useState([]);
  const [retryCount, setRetryCount] = useState(0);
  const MAX_RETRIES = 3;
  const RETRY_DELAY = 3000; // 3 seconds

  const clearFilters = () => {
    setSelectedYear(null);
    setSelectedMonth(null);
  };

  // Enhanced fetch news with retry logic
  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch("https://alumni-apis.vercel.app/news");
        if (!response.ok) {
          throw new Error(`Failed to fetch news: ${response.statusText}`);
        }
        
        const data = await response.json();
        if (!data || !data.data) {
          throw new Error("Invalid data format received");
        }

        const newsArray = Array.isArray(data.data) ? data.data : [];
        setNewsData(newsArray);
        setFilteredNewsData(newsArray);
        setRetryCount(0); // Reset retry count on success
      } catch (err) {
        console.error("Error fetching news:", err);
        setError(err.message);
        
        // Implement retry logic
        if (retryCount < MAX_RETRIES) {
          setTimeout(() => {
            setRetryCount(prev => prev + 1);
          }, RETRY_DELAY);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [retryCount]);

  useEffect(() => {
    if (Array.isArray(newsData) && newsData.length > 0) {
      setArchiveData(generateArchiveData(2022, newsData));
    }
  }, [newsData]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const filterNews = () => {
      if (!Array.isArray(newsData)) {
        setFilteredNewsData([]);
        return;
      }

      if (!selectedYear && !selectedMonth) {
        setFilteredNewsData(newsData);
        return;
      }

      const filtered = newsData.filter((news) => {
        try {
          const newsDate = parseDate(news.date);
          const newsYear = newsDate.getFullYear().toString();
          const newsMonth = newsDate.toLocaleString("default", {
            month: "long",
          });

          if (selectedYear && selectedMonth) {
            return newsYear === selectedYear && newsMonth === selectedMonth;
          } else if (selectedYear) {
            return newsYear === selectedYear;
          } else if (selectedMonth) {
            return newsMonth === selectedMonth;
          }
          return true;
        } catch (error) {
          console.error("Error filtering news:", error);
          return false;
        }
      });

      setFilteredNewsData(filtered);
    };

    filterNews();
  }, [selectedYear, selectedMonth, newsData]);

  if (loading) {
    return (
      <div className="newsrooms">
        <Header alumniAuthData={alumniAuthData} handleAlumniLogout={handleAlumniLogout} />
        <div className="container">
          <Loading />
        </div>
        <Footer />
        <NavBar />
      </div>
    );
  }

  if (error) {
    return (
      <div className="newsrooms">
        <Header alumniAuthData={alumniAuthData} handleAlumniLogout={handleAlumniLogout} />
        <div className="container">
          <div className="error">
            <h2>Error Loading News</h2>
            <p>{error}</p>
            {retryCount < MAX_RETRIES && (
              <button 
                onClick={() => setRetryCount(prev => prev + 1)}
                className="clear-button"
              >
                Try Again
              </button>
            )}
          </div>
        </div>
        <Footer />
        <NavBar />
      </div>
    );
  }

  return (
    <div className="newsrooms">
      <Header alumniAuthData={alumniAuthData} handleAlumniLogout={handleAlumniLogout}/>
      <div className="container">
        <PageBanner imageUrl={newBanner} title={"Newsroom"} subtitle={"  All the News and Updates from KCE ALUMNI"} />
        
        <div className="newsroom-layout">
          <div className="main-content">
            {isMobile && (
              <div className="mobile-filter">
                <button
                  className="filter-button"
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                >
                  <Calendar className="icon" />
                  <span>Filter by Date</span>
                  <ChevronDown
                    className={`icon ${isFilterOpen ? "rotate" : ""}`}
                  />
                </button>

                {isFilterOpen && (
                  <div className="filter-dropdown">
                    <div className="archive-header">
                      <h2>Archive</h2>
                      {(selectedYear || selectedMonth) && (
                        <button className="clear-button" onClick={clearFilters}>
                          <X size={16} className="x-mark" />
                          Clear
                        </button>
                      )}
                    </div>
                    <ArchiveFilter
                      archiveData={archiveData}
                      selectedYear={selectedYear}
                      selectedMonth={selectedMonth}
                      setSelectedYear={setSelectedYear}
                      setSelectedMonth={setSelectedMonth}
                      setIsFilterOpen={setIsFilterOpen}
                    />
                  </div>
                )}
              </div>
            )}

            <div className="news-list">
              {filteredNewsData.length > 0 ? (
                filteredNewsData.map((news) => (
                  <article key={news._id} className="news-item">
                    {isValidBase64Image(news.image_id) && !isMobile && (
                      <div className="news-image">
                        <ImageDisplay
                          imageData={news.image_id}
                          title={news.title}
                          className="news-img"
                        />
                      </div>
                    )}
                    <div className="news-content">
                      <h2>{news.title}</h2>
                      <div className="news-meta">
                        <span className="date">{formatDate(news.date)}</span>
                        <span className="category">{news.tag}</span>
                      </div>
                      <p>{limitText(news.description)}</p>
                    </div>
                  </article>
                ))
              ) : (
                <div className="no-news">
                  No news found for the selected filters.
                </div>
              )}
            </div>
          </div>

          {!isMobile && (
            <aside className="sidebarr">
              <div className="archive-widget">
                <div className="archive-header">
                  <h2>Archive</h2>
                  {(selectedYear || selectedMonth) && (
                    <button className="clear-button" onClick={clearFilters}>
                      <X size={16} />
                      Clear
                    </button>
                  )}
                </div>
                <ArchiveFilter
                  archiveData={archiveData}
                  selectedYear={selectedYear}
                  selectedMonth={selectedMonth}
                  setSelectedYear={setSelectedYear}
                  setSelectedMonth={setSelectedMonth}
                />
              </div>
            </aside>
          )}
        </div>
      </div>
      <Footer/>
      <NavBar/>
    </div>
  );
};

const ArchiveFilter = ({
  archiveData,
  selectedYear,
  selectedMonth,
  setSelectedYear,
  setSelectedMonth,
  setIsFilterOpen,
}) => {
  return (
    <div className="archive-filter">
      {Object.entries(archiveData).map(([year, months]) => (
        <div key={`year-${year}`} className="year-section">
          <button
            className={`year-button ${selectedYear === year ? "active" : ""}`}
            onClick={() => {
              setSelectedYear(selectedYear === year ? null : year);
              setSelectedMonth(null);
            }}
          >
            <span>{year}</span>
            <ChevronDown
              className={`icon ${selectedYear === year ? "rotate" : ""}`}
            />
          </button>

          {selectedYear === year && Object.keys(months).length > 0 && (
            <div className="month-list">
              {Object.entries(months).map(([month, count]) => (
                <button
                  key={`month-${year}-${month}`}
                  className={`month-button ${
                    selectedMonth === month ? "active" : ""
                  }`}
                  onClick={() => {
                    setSelectedMonth(selectedMonth === month ? null : month);
                    if (setIsFilterOpen) setIsFilterOpen(false);
                  }}
                >
                  {month} ({count})
                </button>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default NewsRoom;