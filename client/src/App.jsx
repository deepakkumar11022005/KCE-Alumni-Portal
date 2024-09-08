import { useState } from 'react'
import {AluminiSlider, CustomNavbar,Dashboard,Footer,Swiper} from './components/index'
 

import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';


function App(){
  return (
    <>
      <CustomNavbar />
      <Swiper/>
      <Dashboard/>
      <AluminiSlider/>
      <Footer/>
    </>
  )
}

export default App
