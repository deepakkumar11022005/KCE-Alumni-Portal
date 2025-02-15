import React, { useState, createContext, useContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";

// Create Auth Context
export const AuthContext = createContext(null);

// Import Auth Functions
import {
  alumniLogin,
  alumniLogout,
  adminLogin,
  adminLogout,
} from "./sections/Landing/AuthContext";

// Import Components
import { EventDetails } from "./components";
import Event from "./sections/Alumni/Event";
import Home from "./sections/Alumni/Home";
import NewsRoom from "./sections/Alumni/NewsRoom";
import AboutUs from "./sections/Alumni/AboutUs";
import Gallery from "./sections/Alumni/Gallery";
import ContactUs from "./sections/Alumni/ContactUs";
import NotFound from "./sections/Alumni/NotFound";
import AdminHome from "./sections/Admin/AdminHome";
import ManageAlumni from "./sections/Admin/ManageAlumni";
import AdminNotification from "./sections/Admin/AdminNotification";
import AdminEvent from "./sections/Admin/AdminEvent";
import AdminProfile from "./sections/Admin/AdminProfile";
import Alumni from "./sections/Alumni/Alumni";
import LandingAlumni from "./sections/Landing/LandingAlumni";
import LandingAdmin from "./sections/Landing/LandingAdmin";
import AlumniProfile from "./sections/Alumni/Profile";


// Protected Route for Alumni
const ProtectedAlumniRoute = ({ children }) => {
  const { alumniAuthData } = useContext(AuthContext);
  return alumniAuthData ? children : <Navigate to="/alumni/login" replace />;
};

// Protected Route for Admin
const ProtectedAdminRoute = ({ children }) => {
  const { adminAuthData } = useContext(AuthContext);
  return adminAuthData ? children : <Navigate to="/admin/login" replace />;
};

function App() {
  const API_BASE_URL = 'https://alumni-apis.onrender.com';



  const [alumniAuthData, setAlumniAuthData] = useState(() => {
    const stored = localStorage.getItem("alumniAuth");
    return stored ? JSON.parse(stored) : null;
  });
  
  const [adminAuthData, setAdminAuthData] = useState(() => {
    const stored = localStorage.getItem("adminAuth");
    return stored ? JSON.parse(stored) : null;
  });

  // Sync auth data to localStorage
  useEffect(() => {
    if (alumniAuthData) {
      localStorage.setItem("alumniAuth", JSON.stringify(alumniAuthData));
    } else {
      localStorage.removeItem("alumniAuth");
    }
  }, [alumniAuthData]);

  useEffect(() => {
    if (adminAuthData) {
      localStorage.setItem("adminAuth", JSON.stringify(adminAuthData));
    } else {
      localStorage.removeItem("adminAuth");
    }
  }, [adminAuthData]);

  // Handlers for Login and Logout
  const handleAlumniLogin = async (credentials) => {
   
    
    const result = await alumniLogin(credentials);
    if (result.success) {
      const newAuthData = { ...result.data, role: "alumni" };
      setAlumniAuthData(newAuthData);
      // console.log(newAuthData);
      
      return { success: true };
    }
    return { success: false, error: result.error };
  };

  const handleAlumniLogout = async () => {
    if (alumniAuthData?.token) await alumniLogout(alumniAuthData.token);
    setAlumniAuthData(null);
  };

  const handleAdminLogin = async (credentials) => {
    const result = await adminLogin(credentials);
    if (result.success) {
      const newAuthData = { ...result.data, role: "admin" };
      setAdminAuthData(newAuthData);
      return { success: true };
    }
    return { success: false, error: result.error };
  };

  const handleAdminLogout = async () => {
    if (adminAuthData?.token) await adminLogout(adminAuthData.token);
    setAdminAuthData(null);
  };

  const authContextValue = {
    alumniAuthData,
    adminAuthData,
    handleAlumniLogin,
    handleAlumniLogout,
    handleAdminLogin,
    handleAdminLogout,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      <Router>
        <Routes>
          {/* Root Redirect */}
          <Route path="/" element={<Navigate to="/alumni/login" replace />} />

          {/* Alumni Routes */}
          <Route path="/alumni">
            <Route
              path="login"
              element={
                alumniAuthData ? (
                  <Navigate to="/alumni" replace />
                ) : (
                  <LandingAlumni handleAlumniLogin={handleAlumniLogin}/>
                )
              }
            />
            <Route
              path="alumni"
              element={
                <ProtectedAlumniRoute>
                  <Alumni />
                </ProtectedAlumniRoute>
              }
            />
            <Route index element={<Home  alumniAuthData={alumniAuthData} handleAlumniLogout={handleAlumniLogout}/>} />
            <Route path="events" element={<Event API_BASE_URL={API_BASE_URL} alumniAuthData={alumniAuthData} handleAlumniLogout={handleAlumniLogout}/>} />
            <Route path="profile/:id" element={<AlumniProfile alumniAuthData={alumniAuthData} handleAlumniLogout={handleAlumniLogout}/>} />
            <Route path="event/:id" element={<EventDetails API_BASE_URL={API_BASE_URL} alumniAuthData={alumniAuthData} handleAlumniLogout={handleAlumniLogout}/>} />
            <Route path="newsroom" element={<NewsRoom API_BASE_URL={API_BASE_URL} alumniAuthData={alumniAuthData}/>} handleAlumniLogout={handleAlumniLogout}/>
            <Route path="about-us" element={<AboutUs API_BASE_URL={API_BASE_URL} alumniAuthData={alumniAuthData}/>} handleAlumniLogout={handleAlumniLogout}/>
            <Route path="gallery" element={<Gallery API_BASE_URL={API_BASE_URL} alumniAuthData={alumniAuthData}/>} handleAlumniLogout={handleAlumniLogout}/>
            <Route path="contact-us" element={<ContactUs API_BASE_URL={API_BASE_URL} alumniAuthData={alumniAuthData} handleAlumniLogout={handleAlumniLogout}/>} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin">
            <Route
              path="login"
              element={
                adminAuthData ? (
                  <Navigate to="/admin" replace />
                ) : (
                  <LandingAdmin />
                )
              }
            />
            <Route
              index
              element={
                <ProtectedAdminRoute>
                  <AdminHome API_BASE_URL={API_BASE_URL}  adminAuthData={adminAuthData}  handleAdminLogout={handleAdminLogout}/>
                </ProtectedAdminRoute>
              }
            />
            <Route
              path="manage-alumni"
              element={
                <ProtectedAdminRoute>
                  <ManageAlumni API_BASE_URL={API_BASE_URL} adminAuthData={adminAuthData} handleAdminLogout={handleAdminLogout}/>
                </ProtectedAdminRoute>
              }
            />
            <Route
              path="notification"
              element={
                <ProtectedAdminRoute>
                  <AdminNotification API_BASE_URL={API_BASE_URL} adminAuthData={adminAuthData} handleAdminLogout={handleAdminLogout}/>
                </ProtectedAdminRoute>
              }
            />
            <Route
              path="event"
              element={
                <ProtectedAdminRoute>
                  <AdminEvent API_BASE_URL={API_BASE_URL} adminAuthData={adminAuthData} handleAdminLogout={handleAdminLogout}/>
                </ProtectedAdminRoute>
              }
            />
            <Route
              path="profile"
              element={
                <ProtectedAdminRoute>
                  <AdminProfile API_BASE_URL={API_BASE_URL} adminAuthData={adminAuthData} handleAdminLogout={handleAdminLogout}/>
                </ProtectedAdminRoute>
              }
            />
          </Route>

          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
