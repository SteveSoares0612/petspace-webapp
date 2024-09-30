// src/pages/SignOut.js
import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import useAuth instead of AuthContext


const SignUp = () => {
    const navigate = useNavigate();
  

  const handleSignUp = () => {
    // Handle sign-out logic here (e.g., clearing user data, etc.)
    // Redirect to sign-in page or home page after signing out
    navigate('/'); // Redirect to sign-in page
  };

  return (
    <Container>
      <h2>Sign Up</h2>
      <Button variant="primary" onClick={handleSignUp}>
       Sign Up
      </Button>
    </Container>
  );
};

export default SignUp;
