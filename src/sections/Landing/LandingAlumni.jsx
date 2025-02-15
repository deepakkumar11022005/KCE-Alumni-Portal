import React, { useState, useEffect, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  GraduationCap,
  Users,
  Calendar,
  ChevronDown,
  Eye,
  EyeOff,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../App";
import "./LandingAlumni.css";
import alumniLogo from "../../assets/images/kce-logo.gif";

const LandingAlumni = ({handleAlumniLogin}) => {
  const navigate = useNavigate();
  

  const [showLogin, setShowLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    batch: "",
  });
  const [error, setError] = useState("");

  // Generate years array from 2000 to current year
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 1999 },
    (_, i) => currentYear - i
  );

  useEffect(() => {
    if (showLogin) {
      const formElement = document.querySelector(".alumniLanding-loginForm");
      formElement?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [showLogin]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setError("");
  };

  const onSubmitLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      console.log(formData);
      
      const result = await handleAlumniLogin(formData);

      if (result.success) {
        navigate("/alumni");
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="alumniLanding-container">
      {/* Previous code remains the same until the form */}

      <div className="alumniLanding-shapes">
        {[...Array(5)].map((_, index) => (
          <motion.div
            key={index}
            className="alumniLanding-shape"
            initial={{ opacity: 0 }}
            animate={{
              opacity: 0.2,
              scale: [1.5, 1.5, 1],
              x: [0, 50, 0],
              y: [0, 30, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              delay: index * 0.8,
            }}
          />
        ))}
      </div>

      <div className="alumniLanding-content">
        <motion.nav
          className="alumniLanding-nav"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.div
            className="alumniLanding-logo"
            whileHover={{ scale: 1.05 }}
          >
            <img src={alumniLogo} alt="Kce Alumni Association" />
          </motion.div>
          <motion.button
            className="alumniLanding-loginBtn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowLogin(!showLogin)}
          >
            {showLogin ? "Back" : "Login"}
          </motion.button>
        </motion.nav>

        <div className="alumniLanding-main">
          <motion.div
            className="alumniLanding-leftContent"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.5 }}
          >
            <motion.h1
              className="alumniLanding-title"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5 }}
            >
              Karpagam
              <motion.span
                className="alumniLanding-titleHighlight"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
              >
                Alumni Association
              </motion.span>
            </motion.h1>

            <motion.p
              className="alumniLanding-subtitle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
            >
              Connecting generations of excellence through shared memories and
              future opportunities.
            </motion.p>

            <motion.div
              className="alumniLanding-buttonGroup"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 1 }}
            >
              <motion.button
                className="alumniLanding-primaryBtn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowLogin(true)}
              >
                Join Network
              </motion.button>
              <motion.button
                className="alumniLanding-secondaryBtn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Learn More
              </motion.button>
            </motion.div>
          </motion.div>

          <AnimatePresence mode="wait">
            {!showLogin ? (
              <motion.div
                className="alumniLanding-statsGrid"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.5 }}
              >
                {[
                  { icon: GraduationCap, label: "Alumni", value: "10,000+" },
                  { icon: Users, label: "Members", value: "5,000+" },
                  { icon: Calendar, label: "Events", value: "100+" },
                  { icon: ChevronDown, label: "Downloads", value: "1,000+" },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    className="alumniLanding-statCard"
                    whileHover={{ y: -5 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 + 1 }}
                  >
                    <stat.icon className="alumniLanding-statIcon" />
                    <div className="alumniLanding-statValue">{stat.value}</div>
                    <div className="alumniLanding-statLabel">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                className="alumniLanding-loginForm"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.5 }}
              >
                <div className="loginForm-header">
                  <img
                    src={alumniLogo}
                    alt="Kce Alumni Logo"
                    className="loginForm-logo"
                  />
                  <h2 className="loginForm-title">Welcome Back</h2>
                  <p className="loginForm-subtitle">
                    Log in to connect with your network
                  </p>
                </div>

                <form onSubmit={onSubmitLogin}>
                  {error && <div className="error-message">{error}</div>}
                  <div className="form-group">
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      className="login-input"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group password-group">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Password"
                      className="login-input"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>

                  <div className="form-group-dropdown">
                    <select
                      name="batch"
                      className="dropdown dropdown-heading"
                      value={formData.year}
                      onChange={handleInputChange}
                      required
                    >
                      <option value=""  > Graduation Year</option>
                      {years.map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>

                    <button
                      type="submit"
                      className="login-submit"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <span className="loading-spinner"></span>
                      ) : (
                        "Login"
                      )}
                    </button>
                  </div>

                  <div className="login-links">
                    <a href="#" className="forgot-link">
                      Forgot Password?
                    </a>
                    <a href="#" className="register-link">
                      Register
                    </a>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <motion.div
          className="alumniLanding-scrollIndicator"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </div>
    </div>
  );
};

export default LandingAlumni;
