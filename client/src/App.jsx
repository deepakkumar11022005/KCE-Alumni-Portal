import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Filter from "./sections/Alumni/Filter";
import Home from "./sections/Alumni/Home";
import Event from "./sections/Alumni/Event";
import TotalEvents from "./sections/Alumni/TotalEvents";
import Profile from "./sections/Alumni/Profile";

import AdminHome from "./sections/Admin/AdminHome";
import ManageAlumni from "./sections/Admin/ManageAlumni";
import AdminNotification from "./sections/Admin/AdminNotification";
import AdminEvent from "./sections/Admin/AdminEvent";
import AdminProfile from "./sections/Admin/AdminProfile";

function App() {
  return (
    <Router>
      <Routes>
        {/* Routes for /alumni/... */}
        <Route path="/alumni">
          <Route index element={<Home />} />
          <Route path="manage-alumni" element={<Filter />} />
          <Route path="event" element={<TotalEvents />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        {/* Routes for /admin/... */}
        <Route path="/admin">
          <Route index element={<AdminHome />} /><Route path="/admin/home" element={<AdminHome />} />
          <Route path="manage-alumni" element={<ManageAlumni />} />
          <Route path="notification" element={<AdminNotification />} />
          <Route path="event" element={<AdminEvent />} />
          <Route path="profile" element={<AdminProfile />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
