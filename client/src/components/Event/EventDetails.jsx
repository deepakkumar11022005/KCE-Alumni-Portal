import React from "react";
import "./EventDetails.css";
import { useParams } from "react-router-dom";
import EventBackground from "./EventBackground";
import CustomNavbar from "../Common/NavBar";
import kceLogo from "../../assets/images/kce.gif"
import specialGuestImg from "../../assets/images/principal.jpeg"
const EventDetails = () => {
  const { id } = useParams();
  console.log("nakjnqkjn");
  
  // Assuming specialGuest is defined here for demonstration purposes
  const specialGuest = {
    img: specialGuestImg,
    name: "John Doe",
    position: "Keynote Speaker",
    description: "An inspiring leader in the tech industry.",
  };

  const event = {
    image: "https://ca-times.brightspotcdn.com/dims4/default/1b70a40/2147483647/strip/true/crop/1024x500+0+0/resize/1200x586!/quality/75/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2Fdb%2F41%2F492145d642d9a3e01a57421cee11%2Fconciertos-1589446877-1024x500.jpg",
    eventName: 'Dhurva 2024',
    eventDate: '2024-09-15',
    status: "Upcoming",
    eventTime: "10:00 AM",
    specialGuest: specialGuest,
    eventVenue: "Grand Hall, City Conference Center",
    eventDescription: 'This is a description of the first event. This is a description of the first event.',
  };

  const sponsors = [
    {
      img: kceLogo, // Placeholder for the image URL
      name: "KIC",
    },
    {
      img: kceLogo, // Provide valid image URLs
      name: "Karpagam Institutions",
    },
    {
      img: kceLogo,
      name: "Red Chilli",
    },
    {
      img: kceLogo,
      name: "Cloud Travel",
    },
  ];
  
  const duplicateSponsors = [...sponsors, ...sponsors];

  return (

    <>
    <CustomNavbar/>
    <EventBackground imageUrl={event.image}>
        <h1>Welcome to the Event</h1>
        <p>Join us for an unforgettable experience!</p>
      </EventBackground>
    <div className="event-detail">
      
     
      <div className="left-section">
        <div className="experience-barr">
          <h2>{event.eventName}</h2>
        </div>

        <div className="event-bar">
          <h4>Event Details</h4>
          <p>{event.eventDescription}</p>
        </div>

        <div className="event-bar">
          <h4>Event Venue</h4>
          <p>{event.eventVenue}</p>
          <p>Date: {event.eventDate}</p>
          <p>Time: {event.eventTime}</p>
          <p className="status">{event.status}</p>
        </div>

        <div className="event-bar">
          <h4>Event Sponsors</h4>
          <div className="sponsors-bar">
            <div className="sponsors-slider">
              {duplicateSponsors.map((sponsor, index) => (
                <div key={index} className="sponsor-item">
                  <img src={sponsor.img} alt={sponsor.name} />
                  <p>{sponsor.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="right-section">
        <div className="chief-guest-bar">
          <h3>Special Guest</h3>
          <div>
            <img src={specialGuest.img} alt={specialGuest.name} id="special-Guest-img"/>
          </div>
          <p>
            <strong>Name:</strong> {specialGuest.name}
          </p>
          <p>
            <strong>Position:</strong> {specialGuest.position}
          </p>
          <p>
            <strong>Event Flow Description:</strong> {specialGuest.description}
          </p>
        </div>
        <div className="event-bar">
          <h4>Event Summary</h4>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Exercitationem alias eius et nemo voluptatibus ipsam repellendus, in
            laborum animi? Unde quidem nulla laudantium alias magni omnis ea
            aut, totam delectus.
          </p>
          <h5>Agenda</h5>
          <p>{"agenda"}</p>
          <h5>Chief Guest</h5>
          <p>
            <strong>Name:</strong> {specialGuest.name}
          </p>
          <p>
            <strong>Position:</strong> {specialGuest.position}
          </p>
          <p>
            <strong>Event Flow:</strong> {specialGuest.description}
          </p>
        </div>
      </div>
    </div>
    </>
  );
};

export default EventDetails;
