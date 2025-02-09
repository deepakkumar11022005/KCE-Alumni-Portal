import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';
import './AlumniLoginPage.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Determine login type based on URL
    const isAdminLogin = location.pathname.includes('/admin/login');
    const isAlumniLogin = location.pathname.includes('/alumni/login');

    const loginSuccess = login(email, password, isAdminLogin ? 'admin' : 'alumni');

    if (loginSuccess) {
      const redirectPath = isAdminLogin ? '/admin' : '/alumni';
      navigate(redirectPath);
    } else {
      setError('Invalid credentials or unauthorized access');
    }
  };

  const loginType = location.pathname.includes('/admin/login') ? 'Admin' : 'Alumni';

  return (
    <div className="login-page">
      <div className="login-container">
        <h1 className="login-header">KCE {loginType} Login</h1>
        <p className="login-subtitle">Connecting You to the Future</p>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="login-form-group">
            <label htmlFor="email" className="login-label">Email</label>
            <input
              type="email"
              id="email"
              className="login-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="login-form-group">
            <label htmlFor="password" className="login-label">Password</label>
            <input
              type="password"
              id="password"
              className="login-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          {error && <p className="login-error">{error}</p>}
          <button type="submit" className="login-btn">Login</button>
        </form>
        <div className="login-links">
          <a href="/signup" className="login-link">Sign Up</a>
          <a href="/forgot-password" className="login-link">Forgot Password?</a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;