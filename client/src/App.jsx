import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import Filter from './sections/Filter';
import Home from './sections/Home';
import Event from './sections/Event';
import TotalEvents from './sections/TotalEvents';


function App(){
  return (
    <>
      
      <TotalEvents/>
      <Event/>
      <Home/>
      <Filter/>

    </>
  )
}

export default App
