const API_URL = import.meta.env.VITE_API_URL;
console.log("API_URL being used:", API_URL);

// Signup
export const signup = async (userData) => {
  try {
    const res = await fetch(`${API_URL}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    if (!res.ok) throw new Error(`Signup failed: ${res.status}`);

    return await res.json();
  } catch (err) {
    return { message: err.message };
  }
};

// Login
export const login = async (credentials) => {
  try {
    const res = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    if (!res.ok) throw new Error(`Login failed: ${res.status}`);

    return await res.json();
  } catch (err) {
    return { message: err.message };
  }
};

// NEW: Get current logged-in user
export const getCurrentUser = async (token) => {
  try {
    const res = await fetch(`${API_URL}/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return await res.json();
  } catch (err) {
    return { message: err.message };
  }
};
