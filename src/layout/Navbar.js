// src/layout/Navbar.js
import React, { useEffect } from 'react';
import { Navbar, Nav, Container, Button, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/images/logo.png';
import { useAuth } from '../context/AuthContext';

function AppNavbar() {
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(String(user.email));
    navigate('/signin');
  };

  useEffect(()=> {
    console.log(user)
  })
  
  return (
    <Navbar bg="light" expand="lg" className="py-3">
    <Container>
      {/* Logo */}
      <Navbar.Brand as={Link} to="/">
        <img src={logo} width={90} alt="Logo" />
      </Navbar.Brand>

      {/* Hamburger menu for mobile */}
      <Navbar.Toggle aria-controls="basic-navbar-nav" />

      {/* Links */}
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/home">Home</Nav.Link>
          <Nav.Link as={Link} to="/events">Events</Nav.Link>
          <Nav.Link as={Link} to="/health">My Health</Nav.Link>
          <Nav.Link as={Link} to="/shop">Shop</Nav.Link>
        </Nav>

        {/* Authentication Links on the right as Dropdown */}
        <Nav className="ms-auto">
          {isAuthenticated ? (
            <NavDropdown
              title={`Welcome, ${user.first_name}`}
              id="user-dropdown"
              align="end"
            >
              <NavDropdown.Item as={Link} to="/profile">Profile</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleLogout} className="text-danger">
                Sign Out
              </NavDropdown.Item>
            </NavDropdown>
          ) : (
            <NavDropdown title="Guest" id="account-dropdown" align="end">
              <NavDropdown.Item as={Link} to="/signin">Sign In</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/signup" className="text-danger">
                Register
              </NavDropdown.Item>
            </NavDropdown>
          )}
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  );
}

export default AppNavbar;
