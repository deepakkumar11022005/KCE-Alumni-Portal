import { useState } from 'react'

 

import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import Filter from './sections/Filter';
import Home from './sections/Home';


function App(){
  return (
    <>
      <Home/>
      <Filter/>
    </>
  )
}

export default App
