import React from 'react'
import {  AlumniSlider, CustomNavbar,Dashboard,Footer,Swiper } from '../../components'
 
const  Home = () => {
  return (
    <div>  
     <CustomNavbar />
      <Swiper/>
      <Dashboard/>
       <AlumniSlider/>
      <Footer/>
    </div>
  )
}

export default  Home