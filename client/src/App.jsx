import { useState } from 'react'
import {AluminiSlider, CustomNavbar,Dashboard,Footer,Swiper} from './components/index'
 

import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import Filter from './sections/Filter';


function App(){
  return (
    <>
      {/* <CustomNavbar /> */}
      {/* <Swiper/> */}
      {/* <Dashboard/> */}
      {/* <AluminiSlider/> */}
      {/* <Footer/> */}
      <Filter/>
    </>
  )
}

export default App
