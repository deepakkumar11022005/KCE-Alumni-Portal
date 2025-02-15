 

// Environment check for development
// const isDevelopment = process.env.NODE_ENV === 'development';
 
// Alumni Authentication Functions
export const alumniLogin = async (credentials) => {
 
console.log(JSON.stringify(credentials)+"auth");

  try {
    // const response = await fetch(`${import.meta.env.VITE_BASE_URL}/login`, {
      const response = await fetch(`${"https://alumni-apis.vercel.app"}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body:{credentials},
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
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/alumni/logout`, {
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
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/alumni/verify-token`, {
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
export const adminLogin = async (credentials) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/admin-login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });
    
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Admin login failed');
    
    return { success: true, data};
  } catch (error) {
    return { success: false, error: error.message || 'An error occurred' };
  }
};

export const adminLogout = async (token) => {
  if (isDevelopment) {
    return { success: true };
  }

  try {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/admin/logout`, {
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
