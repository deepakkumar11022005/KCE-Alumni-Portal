import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import Filter from "./sections/Alumni/Filter";
import Home from "./sections/Alumni/Home";
import TotalEvents from "./sections/Alumni/TotalEvents";
import Profile from "./sections/Alumni/Profile";
import NotFound from "./sections/NotFound"; 

import AdminHome from "./sections/Admin/AdminHome";
import ManageAlumni from "./sections/Admin/ManageAlumni";
import AdminNotification from "./sections/Admin/AdminNotification";
import AdminEvent from "./sections/Admin/AdminEvent";
import AdminProfile from "./sections/Admin/AdminProfile";
import { AlumniProfile, EventDetails } from "./components";

function App() {
  return (
    <Router>
      <Routes>
        {/* Routes for /alumni/... */}
        <Route path="/alumni">
          <Route index element={<Home />} />
          <Route path="manage-alumni" element={<Filter />} />
          <Route path="event" element={<TotalEvents />} />
          <Route path="event/:id" element={<EventDetails />} />
          <Route path="profile/:id" element={<AlumniProfile/>} />
          <Route path="profile" element={<Profile />} />
        
          <Route path="*" element={<NotFound />} />
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
