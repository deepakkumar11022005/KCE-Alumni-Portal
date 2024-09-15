import React, { useState } from 'react';
import './Carousel.css';
// import { EventPreview } from "../Event/EventPreview"
 

const Carousel = ({ events }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % events.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + events.length) % events.length);
  };

  return (
    <div className="carousel">
      <button onClick={prevSlide} className="carousel-button prev">❮</button>
      
      {/* <EventPreview event={events[currentIndex]} /> */}
      <button onClick={nextSlide} className="carousel-button next">❯</button>
    </div>
  );
};

export default Carousel;
