import React, { useState, useEffect } from 'react';
import { CustomNavbar, EventBackground, UpcomingEvents } from '../../components';

const TotalEvents = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

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
      // console.log('Data fetched successfully:', result);
      setData(result.data);
    } catch (error) {
      alert('An error occurred while fetching data. Please try again later.');
      console.error('Error fetching data:', error);
      setError(error.message);
    }
  };

  useEffect(() => {
    const url = `https://alumni-apis.vercel.app/events?page=1&limit=20&sort=batch&order=desc`;
    fetchData(url);
  }, []); // Removed [id] since it doesn't exist in this context

  const eventBannerUrl =
    'https://ca-times.brightspotcdn.com/dims4/default/1b70a40/2147483647/strip/true/crop/1024x500+0+0/resize/1200x586!/quality/75/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2Fdb%2F41%2F492145d642d9a3e01a57421cee11%2Fconciertos-1589446877-1024x500.jpg';

  return (
    <div className="">
      <CustomNavbar />
      <EventBackground imageUrl={eventBannerUrl}>
        <h1>Welcome to the Event</h1>
        <p>Join us for an unforgettable experience!</p>
      </EventBackground>
      {error ? (
        <p>Error: {error}</p>
      ) : (
        <UpcomingEvents events={data} />
      )}
    </div>
  );
};

export default TotalEvents;
