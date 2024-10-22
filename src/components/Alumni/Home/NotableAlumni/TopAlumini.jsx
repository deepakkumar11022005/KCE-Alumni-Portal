// src/components/AlumniSlider.js
import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';
 import default_Alumni from '../../../../assets/images/Alumni-img.png'
import AlumniTestimonialCard from './ServiceCard'; // Import the correct component
import './TopAlumini.css'; // Updated to match the component name

const AlumniSlider = () => {
  const alumniData=[
    {
      "imgURL": default_Alumni ,
      "name": "Alice Johnson",
      "batch": "2010",
      "company": "Tech Innovations",
      "salary": "$90,000",
      "isActive": true
    },
    {
      "imgURL":default_Alumni ,
      "name": "Bob Smith",
      "batch": "2012",
      "company": "Creative Solutions",
      "salary": "$85,000",
      "isActive": false
    },
    {
      "imgURL": default_Alumni ,
      "name": "Charlie Brown",
      "batch": "2015",
      "company": "Future Tech",
      "salary": "$100,000",
      "isActive": true
    },
    {
      "imgURL": default_Alumni ,
      "name": "Diana Prince",
      "batch": "2013",
      "company": "Innovate LLC",
      "salary": "$92,000",
      "isActive": false
    },
    {
      "imgURL":  default_Alumni,
      "name": "Edward Green",
      "batch": "2014",
      "company": "Growth Enterprises",
      "salary": "$105,000",
      "isActive": true
    },
    {
      "imgURL":  default_Alumni,
      "name": "Fiona Adams",
      "batch": "2016",
      "company": "Tech Pioneers",
      "salary": "$88,000",
      "isActive": true
    },
    {
      "imgURL": default_Alumni,
      "name": "George Lee",
      "batch": "2017",
      "company": "Visionary Systems",
      "salary": "$93,000",
      "isActive": false
    },
    {
      "imgURL": default_Alumni,
      "name": "Hannah Wilson",
      "batch": "2018",
      "company": "Digital Solutions",
      "salary": "$95,000",
      "isActive": true
    },
    {
      "imgURL": default_Alumni,
      "name": "Ian Turner",
      "batch": "2011",
      "company": "Advanced Technologies",
      "salary": "$102,000",
      "isActive": false
    },
    {
      "imgURL": default_Alumni,
      "name": "Julia White",
      "batch": "2019",
      "company": "Next Gen Innovations",
      "salary": "$97,000",
      "isActive": true
    }
  ];
  const [activeIndex, setActiveIndex] = useState(null);
  const bgColors = ["bg-blue-300", "bg-green-300", "bg-pink-300", "bg-yellow-300", "bg-purple-300"];
  const ourText = "Notable";
  const servicesText = "Alumnis";

  const handleInView = (index) => {
    setActiveIndex(index);
  };

  return (
    <section className="max-container overflow-hidden py-10 text-center" id="our-alumnis">
      <h2 className="text-4xl font-palanquin font-bold mb-5 text-center bounce-animation">
        {ourText.split("").map((letter, index) => (
          <span key={`our-${index}`} className="our" style={{ animationDelay: `${index * 0.1}s` }}>
            {letter}
          </span>
        ))}
        &nbsp;
        {servicesText.split("").map((letter, index) => (
          <span key={`alumnis-${index}`} className="alumnis" style={{ animationDelay: `${(index + ourText.length) * 0.1}s` }}>
            {letter}
          </span>
        ))}
      </h2>

      <div className="marquee">
        <div className="marquee-content flex items-center gap-9">
          {alumniData.map((alumni, index) => {
            const [ref, inView] = useInView({
              threshold: 0.5,
              triggerOnce: false,
              onChange: () => handleInView(index),
            });

            return (
              <div ref={ref} key={alumni.name + index}>
                <AlumniTestimonialCard
                  imgURL={alumni.imgURL}
                  name={alumni.name}
                  batch={alumni.batch}
                  company={alumni.company}
                  
                  domain={alumni.salary}
                  isActive={inView}
                />
              </div>
            );
          })}

          {/* Duplicate alumni cards for continuous marquee effect */}
          {alumniData.map((alumni, index) => {
            const [ref, inView] = useInView({
              threshold: 0.5,
              triggerOnce: false,
              onChange: () => handleInView(index),
            });

            return (
              <div ref={ref} key={alumni.name + "-duplicate-" + index}>
                <AlumniTestimonialCard
                  imgURL={alumni.imgURL}
                  name={alumni.name}
                  batch={alumni.batch}
                  company={alumni.company}
                  domain={alumni.domain}
                  isActive={inView}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AlumniSlider;
