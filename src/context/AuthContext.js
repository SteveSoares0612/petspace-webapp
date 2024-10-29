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
  const [user, setUser] = useState(""); // To store user details after login
  
  const BASE_URL = "http://localhost:8000";

  // Function to get the XSRF token
  const getCsrfToken = async () => {
    try {
      let response = await axios.get(BASE_URL + '/sanctum/csrf-cookie', {
        withCredentials: true, // Required for cookies to be sent
      });
      if (response.status === 204) {
        console.log('CSRF token fetched successfully');
      } else {
        throw new Error('Failed to fetch CSRF token');
      }
    } catch (error) {
      console.error('Error fetching CSRF token:', error);
    }
  };
  
  const login = async (email, password) => {
    try {
      // Fetch the CSRF token
      await getCsrfToken();
  
      const token = document.cookie
        .split('; ')
        .find((row) => row.startsWith('XSRF-TOKEN='))
        ?.split('=')[1];
  
      if (!token) {
        throw new Error('CSRF token not found in cookies');
      }
  
      // Send the login request using Axios
      const response = await axios.post(
        BASE_URL + '/api/login',
        { email, password },
        {
          headers: {
            'Content-Type': 'application/json',
            'X-XSRF-TOKEN': decodeURIComponent(token),
          },
          withCredentials: true,
        }
      );
  
      if (response.status === 200) {
        const data = response.data.data; // Access the 'data' object in the response
        const userData = {
          id: data.id,
          first_name: data.first_name,
          last_name: data.last_name,
          email: data.email,
          email_verified_at: data.email_verified_at,
          role: data.role,
          dob: data.dob,
          gender: data.gender,
          is_form_filled: data.is_form_filled,
          created_at: data.created_at,
          updated_at: data.updated_at,
        };
  
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
        setIsAuthenticated(true);
        setAuthError(null); // Clear any existing error
        return true; // Return true for successful login
      } else {
        throw new Error('Login failed: Invalid response status');
      }
    } catch (error) {
      if (error.response) {
        setAuthError(error.response.data.message || "Login failed");
      } else {
        setAuthError("An unexpected error occurred: " + error.message);
      }
      setIsAuthenticated(false); // Set authentication state to false
      return false; // Return false for failed login
    }
  };  

  const signUp = async (first_name, last_name, email, password) => {
    const cookies = document.cookie.split("; ");
      for (let cookie of cookies) {
        const cookieName = cookie.split("=")[0];
        document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;`;
      }
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
        BASE_URL + '/api/register',
        { first_name, last_name, email, password }, // Send credentials in request body
        {
          headers: {
            'Content-Type': 'application/json',
            'X-XSRF-TOKEN': decodeURIComponent(token), // Set the XSRF token in the headers
          },
          withCredentials: true, // Include cookies for authentication
        }
      );

      if (response.status === 200) {
        const data = response.data;
        localStorage.setItem('user', JSON.stringify(data.user));
        setUser(data.user);
        setIsAuthenticated(true);
        setAuthError(null); // Clear any existing error
        return true; // Return true for successful login
      } else {
        throw new Error('Login failed: Invalid response status');
      }
    } catch (error) {
    
      if (error.response) {
        setAuthError(error.response.data.message || "Login failed");
      } else {
        setAuthError("An unexpected error occurred: " + error.message);
      }
      setIsAuthenticated(false); // Set authentication state to false
      return false; // Return false for failed login
    }
  };

  const logout = async (email) => {
    localStorage.clear()
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

      const cookies = document.cookie.split("; ");
      for (let cookie of cookies) {
        const cookieName = cookie.split("=")[0];
        document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;`;
      }
  
      setIsAuthenticated(false); // Set authentication state to false
      setAuthError(null); 
    } catch (error) {
      setIsAuthenticated(false);
    }
  };

  const updateUser = async (updatedUserData) => {
    try {
      const token = document.cookie
        .split('; ')
        .find((row) => row.startsWith('XSRF-TOKEN='))
        ?.split('=')[1];

      console.log("TOKEN: " + token);
      const response = await axios.put(
        `${BASE_URL}/web/account/update/${user.id}`,
        updatedUserData,
        {
          headers: {
            'Content-Type': 'application/json',
            'X-XSRF-TOKEN': decodeURIComponent(token),
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        const updatedUser = response.data.data;
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser); // Update the user data in context
      } else {
        throw new Error('Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error; // Throw error so it can be caught by the calling function
    }
  };
  
  useEffect(() => {
    setAuthError(null)
    const storedUser = localStorage.getItem('user');

    if (storedUser) {
      setIsAuthenticated(true); // User is considered authenticated
      if (storedUser) {
        setUser(JSON.parse(storedUser)); // Set user data from localStorage
      }
    }
  },[]);

  return (
    
    <AuthContext.Provider value={{ isAuthenticated, login, signUp, logout, updateUser, authError, user }}>
      {children}
    </AuthContext.Provider>
  );
};
