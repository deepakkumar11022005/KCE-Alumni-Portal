import React, { useEffect, useState } from "react";
import "./EventDetails.css";
import { useParams } from "react-router-dom";
import EventBackground from "./EventBackground";
import CustomNavbar from "../Common/NavBar";
import kceLogo from "../../assets/images/kce.gif";
import specialGuestImg from "../../assets/images/principal.jpeg";

const EventDetails = () => {
  const { id } = useParams();

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('');

  const fetchData = async (url) => {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const result = await response.json();
      console.log("Data fetched successfully:", result);
      setData(result.data);  
    } catch (error) {
      alert("An error occurred while fetching data. Please try again later.");
      console.error("Error fetching data:", error);
      setError(error.message);
    }
  };
  
  useEffect(() => {
    const url = `https://alumni-apis.vercel.app/event/${id}`; // Use dynamic id
    fetchData(url);
  }, [id]);

  useEffect(() => {
    if (data) {
      const currentDate = new Date();
      const eventDate = new Date(data.event_date);
      setStatus(currentDate > eventDate ? 'Finished' : 'Upcoming');
    }
  }, [data]);

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!data) {
    return <p>Loading...</p>;
  }

  // Get sponsors data from the API response
  const sponsors = data.event_sponsers && data.event_sponsers.length > 0 ? data.event_sponsers : [];

  return (
    <>
      <CustomNavbar />
      <EventBackground imageUrl="https://ca-times.brightspotcdn.com/dims4/default/1b70a40/2147483647/strip/true/crop/1024x500+0+0/resize/1200x586!/quality/75/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2Fdb%2F41%2F492145d642d9a3e01a57421cee11%2Fconciertos-1589446877-1024x500.jpg">
        <h1>Welcome to the Event</h1>
        <p>Join us for an unforgettable experience!</p>
      </EventBackground>
      <div className="event-detail">
        <div className="left-section">
          <div className="experience-barr">
            <h2>{data.event_name || "Event Name Not Available"}</h2>
          </div>

          <div className="event-bar">
            <h4>Event Details</h4>
            <p>{data.event_details || "Details are not available"}</p>
          </div>

          <div className="event-bar">
            <h4>Event Venue</h4>
            <p>{data.event_venue || "Venue information is not available"}</p>
            <p>Date: {data.event_date ? new Date(data.event_date).toLocaleDateString() : "Date not available"}</p>
            <p>Time: {data.event_time || "Time not available"}</p>
            <p className="status">{status}</p>
          </div>

          {sponsors.length > 0 && (
            <div className="event-bar">
              <h4>Event Sponsors</h4>
              <div className="sponsors-bar">
                <div className="sponsors-slider">
                  {sponsors.map((sponsor) => (
                    <div key={sponsor._id} className="sponsor-item">
                      <img src={  kceLogo} alt={sponsor.sponser_name || "No Sponsor"} />
                      <p>{sponsor.sponser_name || "Unnamed Sponsor"}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="right-section">
          <div className="chief-guest-bar">
            <h3>Special Guests</h3>
            {data.special_guests && data.special_guests.length > 0 ? (
              data.special_guests.map((guest) => (
                <div key={guest._id}>
                  <div>
                    <img src={specialGuestImg} alt={guest.guest_name} id="special-Guest-img" />
                  </div>
                  <p><strong>Name:</strong> {guest.guest_name}</p>
                  <p><strong>Position:</strong> {guest.guest_position}</p>
                  <p><strong>Event Flow Description:</strong> {guest.event_flow_description}</p>
                  <hr />
                </div>
              ))
            ) : (
              <p>No Special Guests Available</p>
            )}
          </div>

          <div className="event-bar">
            <h4>Event Summary</h4>
            <p>{data.event_summary || "Summary not available"}</p>
            <h5>Chief Guests</h5>
            <ul>
              {data.event_guests && data.event_guests.length > 0 ? (
                data.event_guests.map((guest) => (
                  <li key={guest._id} className="Chief-Guest-list">
                    <strong>{guest.guest_name}</strong> - <strong>{guest.guest_position}</strong>
                    <br />
                    {guest.event_flow_description} <br />
                  </li>
                ))
              ) : (
                <li>No Chief Guests Available</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventDetails;
