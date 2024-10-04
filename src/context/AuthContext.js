// src/context/AuthContext.js
import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';

// Create AuthContext
const AuthContext = createContext();

// Create a custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

// AuthProvider component to provide auth state and functions
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState(null); // Store any error during authentication
  const [user, setUser] = useState(null); // To store user details after login
  
  const BASE_URL = "http://localhost:8000";

  // Function to get the XSRF token
  const getCsrfToken = async () => {
    try {
      let response = await axios.get(BASE_URL + '/sanctum/csrf-cookie', {
        withCredentials: true, // Required for cookies to be sent
      });
      if (response.status === 204) {
        // The CSRF token has been successfully fetched
        console.log('CSRF token fetched successfully');
      } else {
        throw new Error('Failed to fetch CSRF token');
      }
    } catch (error) {
      console.error('Error fetching CSRF token:', error);
    }
  };

  // const login = () => setIsAuthenticated(true); // Update state to authenticated
  const login = async (email, password) => {
    try {
      // Step 1: Fetch the CSRF token.
      await getCsrfToken();

      // Extract the XSRF token from cookies
      const token = document.cookie
        .split('; ')
        .find((row) => row.startsWith('XSRF-TOKEN='))
        ?.split('=')[1];

      console.log("TOKEN: " + token);

      if (!token) {
        throw new Error('CSRF token not found in cookies');
      }

      // Step 2: Send the login request using Axios
      const response = await axios.post(
        BASE_URL + '/api/login',
        { email, password }, // Send credentials in request body
        {
          headers: {
            'Content-Type': 'application/json',
            'X-XSRF-TOKEN': decodeURIComponent(token), // Set the XSRF token in the headers
          },
          withCredentials: true, // Include cookies for authentication
        }
      );

      if (response.status !== 200) {
        console.error("Invalid email or password");
        throw new Error('Invalid email or password');
      }

      const data = response.data;
      setUser(data.user); // Store user details from response
      setIsAuthenticated(true); // Set authentication state to true
      setAuthError(null); // Clear any existing error
      console.info(data);
    } catch (error) {
      setAuthError(error.message); // Set error message if login fails
      setIsAuthenticated(false);
    }
  };

  const logout = async (email) => {
    try {
      // Extract the XSRF token from cookies
      const token = document.cookie
        .split('; ')
        .find((row) => row.startsWith('XSRF-TOKEN='))
        ?.split('=')[1];

      console.log("TOKEN: " + token);

      if (!token) {
        throw new Error('CSRF token not found in cookies');
      }

      // Step 2: Send the login request using Axios
      const response = await axios.post(
        BASE_URL + '/api/logout',
        { email }, // Send credentials in request body
        {
          headers: {
            'Content-Type': 'application/json',
            'X-XSRF-TOKEN': decodeURIComponent(token), // Set the XSRF token in the headers
          },
          withCredentials: true, // Include cookies for authentication
        }
      );

      if (response.status !== 200) {
        console.error("Invalid email or password");
        throw new Error('Invalid email or password');
      }

      const data = response.data;
      setIsAuthenticated(false); // Set authentication state to true
      setAuthError(null); 
      console.info(data);
    } catch (error) {
      setAuthError(error.message); // Set error message if login fails
      setIsAuthenticated(false);
    }
  };
  
  useEffect(() => {
    const token = document.cookie.split('; ').find((row) => row.startsWith('XSRF-TOKEN='))
      ?.split('=')[1];

    if (token) {
      setIsAuthenticated(true); // User is considered authenticated
    }
  });

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, authError, user }}>
      {children}
    </AuthContext.Provider>
  );
};
