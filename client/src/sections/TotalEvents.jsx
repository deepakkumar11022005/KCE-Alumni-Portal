import React from 'react'
import { CustomNavbar, EventBackground, UpcomingEvents } from '../components'

const TotalEvents = () => {
    const eventBannerUrl =
    "https://coimbatorejunction.in/wp-content/uploads/2024/09/HIPHOP-TAMIZHAS-RETURN-OF-THE-DRAGON-MACHI-HOME-EDITION-LIVE-IN-COIMBATORE.jpg";
  return (
  <div className="">
       <CustomNavbar/>
       <EventBackground imageUrl={eventBannerUrl}>
        <h1>Welcome to the Event</h1>
        <p>Join us for an unforgettable experience!</p>
      </EventBackground>
      {/* <UpcomingEvents/> */}
  </div>
  )
}

export default TotalEvents