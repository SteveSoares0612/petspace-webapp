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
  
  const BASE_URL = "http://localhost:8000"

  
  // Function to get the XSRF token
  const getCsrfToken = async () => {
    try {
      let response = await fetch(BASE_URL + '/sanctum/csrf-cookie', {
        method: 'GET',
        credentials: 'include', // Required for cookies to be sent
      });
      if (response.ok) {
        // add message here
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
      /*
        // Step 1: Fetch the CSRF token.
        Charm: XSRF token validates whether the website where the requested is coming from is legit.
        Example: petspace.com - valid, notpetspace.com - not valid.
        What we're trying to do here is setup the session first before it is authenticated when the user logs in.
      // 
      */ 
      await getCsrfToken();

      // Charm: I think there is no need to set the cookie in a state as the cookie is saved in the application storage. 
      // Moved it here because the state is not updated on time, causing the xsrf token to be not set properly. 
      const token = document.cookie
      .split('; ')
      .find((row) => row.startsWith('XSRF-TOKEN='))
      ?.split('=')[1]; // Extract the XSRF token from cookies
       console.log("TOKEN: " + token)

      if (!token) {
        throw new Error('CSRF token not found in cookies');
      }

      // Step 2: Send the login request
      const response = await fetch(BASE_URL +'/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-XSRF-TOKEN': decodeURIComponent(token), // Set the XSRF token in the headers
        },
        credentials: 'include', // basically what this does is include the two cookies needed for authentication. cookie will be associated with the user once login is successful
        body: JSON.stringify({ email, password }), // Send credentials in request body
      });

      if (!response.ok) {
        console.error("Invalid email or password");
        throw new Error('Invalid email or password');
       
      }

      const data = await response.json();
      setUser(data.user); // Store user details from response
      setIsAuthenticated(true); // authentication state to true
      setAuthError(null); // Clear any existing error
      console.info(response.json())
    } catch (error) {
      
      // this is to get a new csr token
      // setCsrfToken(null);
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
