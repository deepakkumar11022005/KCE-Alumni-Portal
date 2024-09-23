import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
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
    <>
      {/* <TotalEvents/>
      <Event/> */}
      {/* <Home/>
      <Filter/> */}
      <Profile/>
      {/* <AdminHome/>
      <ManageAlumni/> 
      <AdminNotification/> 
      <AdminEvent/> 
      <AdminProfile/> */}

    </>
  );
}

export default App;
