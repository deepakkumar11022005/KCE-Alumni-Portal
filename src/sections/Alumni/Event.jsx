import React, { useState, useEffect } from 'react';
import {   EventBackground, Footer, Header, Loading, NavBar, UpcomingEvents } from '../../components';

const Event = ({alumniAuthData,handleAlumniLogout}) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  const fetchData = async (url) => {
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      setData(result.data);
    } catch (error) {
      setError('Failed to load events. Please try again later.');
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false); // Stop loading once the fetch is complete
    }
  };

  useEffect(() => {
    const url = `https://alumni-apis.vercel.app/events?page=1&limit=20&sort=batch&order=desc`;
    fetchData(url);
  }, []);

  const eventBannerUrl =
    'https://ca-times.brightspotcdn.com/dims4/default/1b70a40/2147483647/strip/true/crop/1024x500+0+0/resize/1200x586!/quality/75/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2Fdb%2F41%2F492145d642d9a3e01a57421cee11%2Fconciertos-1589446877-1024x500.jpg';

  return (
    <div className="">
      <Header alumniAuthData={alumniAuthData} handleAlumniLogout={handleAlumniLogout}/>
      <EventBackground imageUrl={eventBannerUrl}>
       
      </EventBackground>
      {loading ? (
         <Loading/>
      ) : error ? (
        <p >Error: {error}</p>  
      ) : (
        <UpcomingEvents events={data} />
      )}
      <Footer/>
      <NavBar/>
    </div>
  );
};

export default Event;
