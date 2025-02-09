import React, { useState, useEffect, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Users, Settings, ChevronDown, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../App";
import "./LandingAlumni.css"; // Reusing the same CSS
import alumniLogo from "../../assets/images/kce-logo.gif";

const LandingAdmin = () => {
  const navigate = useNavigate();
  const { handleAdminLogin } = useContext(AuthContext);
  
  const [showLogin, setShowLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (showLogin) {
      const formElement = document.querySelector(".alumniLanding-loginForm");
      formElement?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [showLogin]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    setError('');
  };

  const onSubmitLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const result = await handleAdminLogin(formData);
      
      if (result.success) {
        navigate('/admin');
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('An error occurred. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="alumniLanding-container">
      {/* Animated background shapes */}
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
        {/* Header Navigation */}
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
            <img src={alumniLogo} alt="KCE Admin Portal" />
          </motion.div>
          <motion.button
            className="alumniLanding-loginBtn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowLogin(!showLogin)}
          >
            {showLogin ? "Back" : "Admin Login"}
          </motion.button>
        </motion.nav>

        {/* Main Content Section */}
        <div className="alumniLanding-main">
          {/* Left Content */}
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
                Admin Portal
              </motion.span>
            </motion.h1>

            <motion.p
              className="alumniLanding-subtitle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
            >
              Managing and maintaining the alumni network with secure administrative access.
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
                Access Portal
              </motion.button>
              <motion.button
                className="alumniLanding-secondaryBtn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Admin Guide
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right Content - Stats Grid/Login Form */}
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
                  { icon: Shield, label: "Security", value: "Advanced" },
                  { icon: Users, label: "Admins", value: "20+" },
                  { icon: Settings, label: "Controls", value: "Full" },
                  { icon: ChevronDown, label: "Reports", value: "500+" },
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
                    alt="KCE Admin Logo"
                    className="loginForm-logo"
                  />
                  <h2 className="loginForm-title">Admin Access</h2>
                  <p className="loginForm-subtitle">
                    Secure login to the administrative dashboard
                  </p>
                </div>

                <form onSubmit={onSubmitLogin}>
                  {error && (
                    <div className="error-message">
                      {error}
                    </div>
                  )}
                  <div className="form-group">
                    <input
                      type="email"
                      name="email"
                      placeholder="Admin Email"
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
                      placeholder="Admin Password"
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

                  <div className="login-links">
                    <a href="#" className="forgot-link">
                      Reset Password
                    </a>
                  </div>

                  <button
                    type="submit"
                    className="login-submit"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="loading-spinner"></span>
                    ) : (
                      "Access Portal"
                    )}
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="alumniLanding-scrollIndicator"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </div>
    </div>
  );
};

export default LandingAdmin;