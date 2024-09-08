import React, { useState, useEffect } from "react";
import slides from "../../assets/JSON/slider.json";
import "bootstrap/dist/css/bootstrap.min.css";
import { ChevronLeft, ChevronRight } from "lucide-react";
import './swiper.css'
const Swiper = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handlePrev = () => {
    setActiveIndex(
      (prevIndex) => (prevIndex - 1 + slides.length) % slides.length
    );
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  return (
    <div id="carouselExampleIndicators" className="carousel slide">
      <div className="carousel-inner">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`carousel-item ${index === activeIndex ? "active" : ""}`}
          >
            <div className="carousel-content">
              <div className="carousel-caption-left">
                {/* <div className="floating-shape shape-1"></div>
                <div className="floating-shape shape-2"></div>
                <div className="floating-shape shape-3"></div> */}
                <div className="caption-content">
                  <h2>{slide.title}</h2>
                  <p>{slide.subtitle}</p>
                  <button className="learn-more-btn">
                    Learn More
                    <span className="arrow">→</span>
                  </button>
                </div>
              </div>
              <div className="carousel-image">
                <img src={slide.image} alt={slide.title} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        className="carousel-control-prev"
        type="button"
        onClick={handlePrev}
      >
        <ChevronLeft size={40} color="#fff" />
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        onClick={handleNext}
      >
        <ChevronRight size={40} color="#fff" />
        <span className="visually-hidden">Next</span>
      </button>

      <div className="carousel-indicators">
        {slides.map((_, index) => (
          <button
            key={index}
            type="button"
            className={index === activeIndex ? "active" : ""}
            aria-current={index === activeIndex ? "true" : "false"}
            aria-label={`Slide ${index + 1}`}
            onClick={() => setActiveIndex(index)}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Swiper;