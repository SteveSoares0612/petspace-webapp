// src/context/AuthContext.js
import React, { createContext, useContext, useState } from 'react';

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
  const [csrfToken, setCsrfToken] = useState(null); // Store the CSRF token
  
  const BASE_URL = "http://localhost:8000/"

  
  // Function to get the XSRF token
  const getCsrfToken = async () => {
    try {
      let response = await fetch(BASE_URL + 'sanctum/csrf-cookie', {
        method: 'GET',
        credentials: 'include', // Required for cookies to be sent
      });
      if (response.ok) {
        const token = document.cookie
          .split('; ')
          .find((row) => row.startsWith('XSRF-TOKEN='))
          ?.split('=')[1]; // Extract the XSRF token from cookies
        setCsrfToken(token); // Save the token in state
        console.log("TOKEN: " + token)
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
      // Step 1: Fetch the CSRF token
      if (!csrfToken) {
        await getCsrfToken();
      }

      // Step 2: Send the login request
      const response = await fetch(BASE_URL +'api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-XSRF-TOKEN': csrfToken
        },
        body: JSON.stringify({ email, password }), // Send credentials in request body
      });

      if (!response.ok) {
        console.error("Invalid email or password");
        throw new Error('Invalid email or password');
       
      }

      const data = await response.json();
      setUser(data.user); // Store user details from response
      setIsAuthenticated(true); // Set authentication state to true
      setAuthError(null); // Clear any existing error
      console.info(response.json())
    } catch (error) {
      setAuthError(error.message); // Set error message if login fails
      setIsAuthenticated(false);
    }
  };
  // const logout = () => {
  //   setIsAuthenticated(false);
  //   setUser(null);
  //   setAuthError(null);
  // };
  const logout = () => setIsAuthenticated(false); // Update state to not authenticated

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, authError, user  }}>
      {children}
    </AuthContext.Provider>
  );
};
