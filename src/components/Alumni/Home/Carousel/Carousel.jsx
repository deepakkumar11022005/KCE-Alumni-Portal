import React, { useEffect } from 'react';
import './Carousel.css';
import items from '../../../../assets/JSON/slider.json'
const Carousel = () => {
  useEffect(() => {
    const slider = document.querySelector('.slider');

    const slideNext = () => {
      const items = document.querySelectorAll('.item');
      slider.append(items[0]);
    };

    const intervalId = setInterval(slideNext, 5000);  

    // Click event handler for manual navigation
    const handleClick = (e) => {
      const items = document.querySelectorAll('.item');
      if (e.target.matches('.next')) {
        slider.append(items[0]);
      } else if (e.target.matches('.prev')) {
        slider.prepend(items[items.length - 1]);
      }
    };

    document.addEventListener('click', handleClick, false);


    return () => {
      clearInterval(intervalId);
      document.removeEventListener('click', handleClick, false);
    };
  }, []);

   
  return (
    <main className="carousel-main">
      <ul className="slider">
        {items.map((item, index) => (
          <li
            key={index}
            className="item"
            style={{
              backgroundImage: `url(${item.image})`
            }}
          >
            <div className="content">
              <h2 className="title">{item.title}</h2>
              <p className="description">{item.description}</p>
              <button className="alumni-read-more">Read More</button>
            </div>
          </li>
        ))}
      </ul>
      <div className="carousel-nav">
        <button className="btn prev">{"<"}</button>
        <button className="btn next">{">"}</button>
      </div>
    </main>
  );
};

export default Carousel;
