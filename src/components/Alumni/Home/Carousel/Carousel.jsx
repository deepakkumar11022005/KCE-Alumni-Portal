import React, { useEffect } from 'react';
import './Carousel.css';
import Carousel1 from '../../../../assets/images/carousel1.png';
import Carousel2 from '../../../../assets/images/carousel2.png';
import Carousel3 from '../../../../assets/images/carousel3.png';

const Carousel = () => {
  useEffect(() => {
    const slider = document.querySelector('.slider');

    // Function to slide the next item
    const slideNext = () => {
      const items = document.querySelectorAll('.item');
      slider.append(items[0]);
    };

    // Set up interval for automatic sliding
    const intervalId = setInterval(slideNext, 3000); // Change slide every 3 seconds

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

    // Cleanup the interval and event listener on component unmount
    return () => {
      clearInterval(intervalId);
      document.removeEventListener('click', handleClick, false);
    };
  }, []);

  const items = [
    {
      title: "Alumni Homecoming 2024",
      description: "Join us for a memorable reunion! Connect with fellow alumni, celebrate milestones, and revisit your college days with engaging activities and gala events.",
      image: Carousel1
    },
    {
      title: "Alumni Success Stories",
      description: "Discover inspiring stories from our distinguished alumni. Learn how they’ve shaped their careers and communities, and find motivation for your own journey.",
      image: Carousel2
    },
    {
      title: "Mentorship Opportunities",
      description: "Give back to the community by becoming a mentor or find guidance from experienced professionals. Our alumni mentorship program fosters growth and leadership.",
      image: Carousel3
    },
    {
      title: "Networking Events",
      description: "Expand your professional network through our exclusive alumni events. Meet industry leaders and make valuable connections that last a lifetime.",
      image: Carousel1
    },
    {
      title: "Alumni Resources & Benefits",
      description: "Access career services, discounts, and special offers available to alumni. Your connection to the college extends beyond graduation.",
      image: Carousel2
    },
    {
      title: "Global Alumni Chapters",
      description: "Join one of our many alumni chapters worldwide! Stay connected with your peers and attend local events no matter where you are.",
      image: Carousel3
    }
  ];

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
              <button className="read-more">Read More</button>
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
