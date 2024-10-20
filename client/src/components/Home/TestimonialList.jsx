import React from 'react';
import Slider from 'react-slick';
import './TestimonialList.css'; // Separate CSS for the testimonial slider

const TestimonialList = ({ testimonials }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2, // Show 2 slides at a time on large screens
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000, // Set autoplay interval to 2 seconds
    arrows: false, // Can be enabled if you want next/prev buttons
    responsive: [
      {
        breakpoint: 900, // Below 900px width
        settings: {
          slidesToShow: 1, // Show 1 slide below 900px
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div className="testimonial-slider">
      <Slider {...settings}>
        {testimonials.map((testimonial, index) => (
          <div key={index} className="testimonial-container">
            <div className="testimonial-image">
              <img src={testimonial.image} alt={`${testimonial.name} photo`} />
            </div>
            <div className="testimonial-content">
              <p className="testimonial-quote">{testimonial.quote}</p>
              <p className="testimonial-name">{testimonial.name}</p>
              <p className="testimonial-designation">{testimonial.designation}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default TestimonialList;
