import "./App.css";
import { EventDetails, Footer, Header, NavBar } from "./components";
import Event from "./sections/Alumni/Event";
import Home from "./sections/Alumni/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NewsRoom from "./sections/Alumni/NewsRoom";
import AboutUs from "./sections/Alumni/AboutUs";
import Gallery from "./sections/Alumni/Gallery";
import ContactUs from "./sections/Alumni/ContactUs";
import NotFound from './sections/Alumni/NotFound';

import AdminHome from './sections/Admin/AdminHome'
import ManageAlumni from './sections/Admin/ManageAlumni'
import AdminNotification from './sections/Admin/AdminNotification'
import AdminEvent from './sections/Admin/AdminEvent'
import AdminProfile from './sections/Admin/AdminProfile'
import Alumni from "./sections/Alumni/Alumni";
function App() {
  return (
    <Router>
      <Routes>
        {/* Routes for /alumni/... */}
        <Route path="/alumni">
          <Route index element={<Home />} />
          <Route path="events" element={<Event />} />
          <Route path="event/:id" element={<EventDetails />} />
          <Route path="newsroom" element={<NewsRoom />} />
          <Route path="about-us" element={<AboutUs />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="contact-us" element={<ContactUs />} />
          <Route path="alumni" element={<Alumni />} />
          {/* <Route path="manage-alumni" element={<Filter />} />
        
        // <Route path="event/:id" element={<EventDetails />} 
        <Route path="profile/:id" element={<AlumniProfile/>} />
        <Route path="profile" element={<Profile />} />
      
        <Route path="*" element={<NotFound />} /> */}
        </Route>

        {/* Routes for /admin/... */}
        <Route path="/admin">
          <Route index element={<AdminHome />} />
          <Route path="manage-alumni" element={<ManageAlumni />} />
          <Route path="notification" element={<AdminNotification />} />
          <Route path="event" element={<AdminEvent />} />
          <Route path="profile" element={<AdminProfile />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
