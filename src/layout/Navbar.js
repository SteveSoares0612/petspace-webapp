// src/layout/Navbar.js
import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/images/logo.png';
import { useAuth } from '../context/AuthContext';

function AppNavbar() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout("test2@gmail.com");
    navigate('/signin');
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        {/* Logo */}
        <Navbar.Brand href="/">
          <img src={logo} width={100} alt="Logo" />
        </Navbar.Brand>

        {/* Hamburger menu for mobile */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        {/* Links */}
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto"> {/* Align main links to the left */}
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/settings">Settings</Nav.Link>
            <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
            <Nav.Link as={Link} to="/health">My Health</Nav.Link>
          </Nav>

          {/* Authentication Links on the right */}
          <Nav className="ml-auto">
            {isAuthenticated ? (
              <Nav.Link onClick={handleLogout}>Sign Out</Nav.Link>
            ) : (
              <>
                <Nav.Link as={Link} to="/signin">Sign In</Nav.Link>
                <Nav.Link as={Link} to="/signup">Sign Up</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
