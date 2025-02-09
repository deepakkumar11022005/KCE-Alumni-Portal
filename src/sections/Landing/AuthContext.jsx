const API_BASE_URL = '/api';

// Environment check for development
// const isDevelopment = process.env.NODE_ENV === 'development';
const isDevelopment = true;
// Alumni Authentication Functions
export const alumniLogin = async (credentials) => {
  if (isDevelopment) {
    // Return mock response
    return {
      success: true,
      data: {
        token: "AlumniDateToken",
        userId: "67186adb1ba8576e422bcd37",
        username: "Deepakkumar S",
        role: 'alumni',
        batch: '2024',
        email: "data.email@gmail.com",
        profileImage: "data.profileImage",
      },
    };
  }

  try {
    const response = await fetch(`${API_BASE_URL}/alumni/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Login failed');
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error.message || 'An error occurred' };
  }
};

export const alumniLogout = async (token) => {
  if (isDevelopment) {
    return { success: true };
  }

  try {
    const response = await fetch(`${API_BASE_URL}/alumni/logout`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Logout failed');
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message || 'An error occurred' };
  }
};

export const verifyAlumniToken = async (token) => {
  if (isDevelopment) {
    return {
      success: true,
      data: { isValid: true, userId: "67186adb1ba8576e422bcd37" },
    };
  }

  try {
    const response = await fetch(`${API_BASE_URL}/alumni/verify-token`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Token verification failed');
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error.message || 'Token verification failed' };
  }
};

// Admin Authentication Functions
export const adminLogin = async (credentials) => {
  if (isDevelopment) {
    return {
      success: true,
      data: {
        token: "AdminAuthToken123",
        userId: "admin_67186adb1ba8576e422bcd37",
        username: "Deepakkumar S",
        role: 'admin',
        email: "admin@kce.ac.in",
        permissions: ['manage_alumni', 'manage_events', 'manage_notifications', 'manage_settings'],
      },
    };
  }

  try {
    const response = await fetch(`${API_BASE_URL}/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Admin login failed');
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error.message || 'An error occurred' };
  }
};

export const adminLogout = async (token) => {
  if (isDevelopment) {
    return { success: true };
  }

  try {
    const response = await fetch(`${API_BASE_URL}/admin/logout`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Admin logout failed');
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message || 'An error occurred' };
  }
};
