import React, { useEffect, useState, useRef } from 'react';
import { FaUserGraduate, FaBriefcase, FaChalkboardTeacher, FaBusinessTime } from 'react-icons/fa';
import './WelcomeBanner.css';

const WelcomeBanner = () => {
  const [alumniCount, setAlumniCount] = useState(0);
  const [entrepreneurCount, setEntrepreneurCount] = useState(0);
  const [employerCount, setEmployerCount] = useState(0);
  const [businessCount, setBusinessCount] = useState(0);
  const observerRef = useRef(null);

  const endValues = {
    alumni: 4056,
    entrepreneur: 123,
    employer: 2052,
    business: 300
  };

  const animateCounters = (duration = 3000) => {
    const startTime = performance.now();
    const easeOutCubic = t => 1 - Math.pow(1 - t, 3);

    const step = (currentTime) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      const easedProgress = easeOutCubic(progress);

      const newAlumniCount = Math.floor(easedProgress * endValues.alumni);
      const newEntrepreneurCount = Math.floor(easedProgress * endValues.entrepreneur);
      const newEmployerCount = Math.floor(easedProgress * endValues.employer);
      const newBusinessCount = Math.floor(easedProgress * endValues.business);

      console.log({ newAlumniCount, newEntrepreneurCount, newEmployerCount, newBusinessCount }); // Debugging log

      setAlumniCount(newAlumniCount);
      setEntrepreneurCount(newEntrepreneurCount);
      setEmployerCount(newEmployerCount);
      setBusinessCount(newBusinessCount);

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  };

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          console.log('WelcomeBanner is visible'); // Debugging log
          animateCounters();
          observer.disconnect();
        }
      });
    }, options);

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const stats = [
    { icon: <FaUserGraduate />, label: "Total Alumni", value: alumniCount },
    { icon: <FaBusinessTime />, label: "Entrepreneurs", value: entrepreneurCount },
    { icon: <FaBriefcase />, label: "Employers", value: employerCount },
    { icon: <FaChalkboardTeacher />, label: "Businesses", value: businessCount }
  ];

  return (
    <div className="welcome-banner" ref={observerRef}>
      <div className="banner-overlay"></div>
      
      <div className="banner-content">
        <div className="welcome-text">
          <h2 className="banner-title">Welcome to the KCE Network</h2>
          <p>
            Connect with fellow alumni, share achievements, and access resources
            for career development and lifelong growth.
          </p>
          <button className="discover-button">Discover More</button>
        </div>

        <div className="stats-grid">
          {stats.map((item, index) => (
            <div 
              key={index} 
              className="stat-card"
              style={{ animationDelay: `${0.1 * index}s` }}
            >
              <div className="stat-icon">{item.icon}</div>
              <div 
                className="stat-value"
                style={{ animationDelay: `${0.3 + 0.1 * index}s` }}
              >
                {item.value.toLocaleString()}
              </div>
              <div className="stat-label">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WelcomeBanner;
