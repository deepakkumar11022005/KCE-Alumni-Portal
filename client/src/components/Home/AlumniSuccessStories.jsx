import React from 'react';
import TestimonialList from './TestimonialList';
import _defaultLogo from '../../assets/images/me.jpg';
import './AlumniSuccessStories.css';

const AlumniSuccessStories = () => {
  const testimonials = [
    {
      image: _defaultLogo,
      quote: 'My College days are unforgettable and in fact those days are the most happiest & fruitful days in my life.',
      name: 'P. Senthil Kumar',
      designation: 'Junior Engineer – CPWD'
    },
    {
      image: _defaultLogo,
      quote: 'I look forward to coming back and giving back to the college that gave me so much. Thank you for everything.',
      name: 'Arun',
      designation: 'EEE - 2013'
    },
    {
      image: _defaultLogo,
      quote: 'The skills and knowledge I gained here helped me succeed in my professional journey. I owe my success to the excellent education and support I received.',
      name: 'John Doe',
      designation: 'Software Engineer – ABC Corp'
    },
    {
      image: _defaultLogo,
      quote: 'The experiences and friendships made at this institution have been truly life-changing. I will always cherish my time here.',
      name: 'Jane Smith',
      designation: 'Project Manager – XYZ Solutions'
    },
    // Add more testimonials as needed
  ];

  return (
    <div className="alumni-success-stories">
      <h2>Alumni Success Stories</h2>
      <TestimonialList testimonials={testimonials} />
    </div>
  );
};

export default AlumniSuccessStories;
