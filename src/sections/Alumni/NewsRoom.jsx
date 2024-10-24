import React, { useState, useEffect } from "react";
import { ChevronDown, Calendar, X } from "lucide-react";
import "./NewsRoom.css";
import { Footer, Header, NavBar } from "../../components";

const generateArchiveData = (startYear, newsData) => {
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
      // Count news for this month
      const count = newsData.filter((news) => {
        const newsDate = new Date(news.date.split("/").reverse().join("-")); // Convert DD/MM/YYYY to YYYY-MM-DD
        return newsDate.getFullYear() === year && newsDate.getMonth() === month;
      }).length;

      archiveData[year][monthName] = count;
    }
  }

  return archiveData;
};

const limitText = (text, wordLimit = 100) => {
  const words = text.split(" ");
  return words.length > wordLimit
    ? words.slice(0, wordLimit).join(" ") + "..."
    : text;
};

const formatDate = (dateString) => {
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
};

const parseDate = (dateString) => {
  const [day, month, year] = dateString.split("/");
  return new Date(year, month - 1, day);
};

const NewsRoom = () => {
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [archiveData, setArchiveData] = useState({});
  const [newsData] = useState([
    {
      id: 1,
      title: "INDUSTRY ALUMNI - KCE ADVISORY BOARD",
      date: "24/04/2024",
      content:
        "Dear Alumni,It gives immense loremijsdifsid gkusbfh viyisdfj buv yuas bfkj hgdfgyueijr ngjhbu bgejh  gkjhbkfnd gskjhbdsfiubg odsgfhbiudfgouebiugb oubgkubr gt buhtbyboisbd yub urybg ouweroigb uierbg uowerbgweirubg oub pleasure to continue our everlasting ties with you. As our Alumni, you have always been our source of inspiration...",
      category: "Campus News",
      hasImage: false,
    },
    {
      id: 2,
      title: "KCE INSTITUTE DAY CELEBRATION 2024",
      date: "08/04/2024",
      content:
        "KCE INSTITUTE DAY 2024 Date: 06-04-2024 Details for Click Here Youtube Link Click Here",
      category: "Campus News",
      hasImage: true,
      image:
        "https://justifiedgrid.com/wp-content/gallery/life/flowers/155330318.jpg",
    },
    {
      id: 3,
      title: "TECH TALKS 2024 - FUTURE OF AI",
      date: "15/03/2024",
      content:
        "Join us for an engaging session on the future of AI and its potential impact across industries...",
      category: "Technology",
      hasImage: true,
      image:
        "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg",
    },
    {
      id: 4,
      title: "STUDENT ACHIEVEMENTS - WINNING HACKATHON",
      date: "30/03/2024",
      content:
        "A team of talented CIT students recently won the prestigious National Hackathon 2024...",
      category: "Student Achievements",
      hasImage: false,
    },
    {
      id: 5,
      title: "WORKSHOP: FULL-STACK DEVELOPMENT 101",
      date: "12/02/2024",
      content:
        "This hands-on workshop will cover the fundamentals of full-stack web development...",
      category: "Workshops",
      hasImage: true,
      image:
        "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg",
    },
    {
      id: 6,
      title: "KCE ANNUAL SPORTS DAY 2024",
      date: "20/02/2023",
      content:
        "KCE celebrated its annual Sports Day with enthusiasm and energy...",
      category: "Sports",
      hasImage: false,
    },
    {
      id: 7,
      title: "ALUMNI MEET 2024",
      date: "05/01/2024",
      content:
        "KCE hosted its Alumni Meet 2024, where alumni from various batches gathered...",
      category: "Alumni Events",
      hasImage: true,
      image: "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg",
    },
    {
      id: 8,
      title: "FRESHERS' ORIENTATION PROGRAM 2024",
      date: "25/01/2023",
      content:
        "The Freshers' Orientation Program welcomed new students to the CIT campus...",
      category: "Campus Events",
      hasImage: true,
      image:
        "https://i0.wp.com/picjumbo.com/wp-content/uploads/violet-colorful-sunset-sky-on-the-beach-free-photo.jpeg",
    },
    {
      id: 9,
      title: "FACULTY DEVELOPMENT PROGRAM - CYBERSECURITY",
      date: "18/01/2024",
      content:
        "CIT hosted a faculty development program focused on cybersecurity...",
      category: "Workshops",
      hasImage: false,
    },
  ]);

  const [filteredNewsData, setFilteredNewsData] = useState(newsData);

  const clearFilters = () => {
    setSelectedYear(null);
    setSelectedMonth(null);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    setArchiveData(generateArchiveData(2022, newsData));

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [newsData]);

  useEffect(() => {
    const filterNews = () => {
      if (!selectedYear && !selectedMonth) {
        setFilteredNewsData(newsData);
        return;
      }

      const filtered = newsData.filter((news) => {
        const newsDate = parseDate(news.date);
        const newsYear = newsDate.getFullYear().toString();
        const newsMonth = newsDate.toLocaleString("default", { month: "long" });

        if (selectedYear && selectedMonth) {
          return newsYear === selectedYear && newsMonth === selectedMonth;
        } else if (selectedYear) {
          return newsYear === selectedYear;
        } else if (selectedMonth) {
          return newsMonth === selectedMonth;
        }
        return true;
      });

      setFilteredNewsData(filtered);
    };

    filterNews();
  }, [selectedYear, selectedMonth, newsData]);

  return (
    <>
      <Header />
      <div className="news-room">
        <div className="news-header">
          <h1>Newsroom</h1>
          <p className="news-subtitle">All the News and Updates from KCE ALUMNI</p>
        </div>
        <div className="news-container">
          <div className="news-layout">
            {/* Main Content */}
            <div className="news-main-content">
              {/* Mobile Filter */}
              {isMobile && (
                <div className="news-mobile-filter">
                  <button
                    className="news-filter-button"
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                  >
                    <Calendar className="news-icon" />
                    <span>Filter by Date</span>
                    <ChevronDown
                      className={`news-icon ${isFilterOpen ? "news-rotate" : ""}`}
                    />
                  </button>

                  {isFilterOpen && (
                    <div className="news-filter-dropdown">
                      <div className="news-archive-header">
                        <h2>Archive</h2>
                        {(selectedYear || selectedMonth) && (
                          <button
                            className="news-clear-button"
                            onClick={clearFilters}
                          >
                            <X size={16} className="news-x-mark" />
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

              {/* News Items */}
              <div className="news-list">
                {filteredNewsData.map((news) => (
                  <article key={news.id} className="news-item">
                    {news.hasImage && !isMobile && (
                      <div className="news-image-container">
                        <img src={news.image} alt={news.title} />
                      </div>
                    )}
                    <div className="news-content-wrapper">
                      <h2>{news.title}</h2>
                      <div className="news-meta-info">
                        <span className="news-date">
                          {formatDate(news.date)}
                        </span>
                        <span className="news-category">{news.tag}</span>
                      </div>
                      <p>{limitText(news.description)}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* Desktop Sidebar */}
            {!isMobile && (
              <aside className="news-sidebar">
                <div className="news-archive-widget">
                  <div className="news-archive-header">
                    <h2>Archive</h2>
                    {(selectedYear || selectedMonth) && (
                      <button className="news-clear-button" onClick={clearFilters}>
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
      </div>
      <Footer />
      <NavBar />
    </>
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
    <div className="news-archive-filter">
      {Object.entries(archiveData).map(([year, months]) => (
        <div key={`year-${year}`} className="news-year-section">
          <button
            className={`news-year-button ${
              selectedYear === year ? "news-active" : ""
            }`}
            onClick={() => {
              setSelectedYear(selectedYear === year ? null : year);
              setSelectedMonth(null);
            }}
          >
            <span>{year}</span>
            <ChevronDown
              className={`news-icon ${selectedYear === year ? "news-rotate" : ""}`}
            />
          </button>

          {selectedYear === year && (
            <div className="news-month-list">
              {Object.entries(months).map(([month, count]) => (
                <button
                  key={`month-${year}-${month}`}
                  className={`news-month-button ${
                    selectedMonth === month ? "news-active" : ""
                  }`}
                  onClick={() => {
                    setSelectedMonth(selectedMonth === month ? null : month);
                    if (setIsFilterOpen) {
                      setIsFilterOpen(false);
                    }
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