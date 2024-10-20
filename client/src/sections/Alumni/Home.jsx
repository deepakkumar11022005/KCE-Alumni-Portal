import React from 'react'
import {  AlumniSlider, AlumniSuccessStories, CustomNavbar,Dashboard,Footer,Swiper } from '../../components'
 
const  Home = () => {
  return (
    <div>  
     <CustomNavbar />
      <Swiper/>
      <Dashboard/>
      <AlumniSuccessStories/>
       <AlumniSlider/>
      <Footer/>
    </div>
  )
}

export default  Home