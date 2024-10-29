// src/layout/Navbar.js
import React, { useEffect } from 'react';
import { Navbar, Nav, Container, Button, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/images/logo.png';
import { useAuth } from '../context/AuthContext';
import {FaSignOutAlt, FaSignInAlt, FaUserPlus } from 'react-icons/fa';
import ProfileIcon from '../assets/images/myprofileicon.png'; 
import editPetsIcon from '../assets/images/editpets.png'; 
import FamilyIcon from '../assets/images/famiylIcon.png'; 
import LogoutIcon from '../assets/images/logout.png'; 

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
        <img src={logo} width={120} alt="Logo" />
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
              <NavDropdown.Item as={Link} to="/profile">
                <img src={ProfileIcon} alt="My Profile" className="me-2" width={16} height={16} /> Update Profile
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/family">
                <img src={FamilyIcon} alt="My Family" className="me-2" width={16} height={16} /> My Family
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/managepets">
                <img src={editPetsIcon} alt="Manage Pets" className="me-2" width={16} height={16} /> Manage Pets
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleLogout} className="text-danger">
                <img src={LogoutIcon} alt="Signout" className="me-2" width={16} height={16} /> Sign Out
              </NavDropdown.Item>
            </NavDropdown>
          ) : (
            <NavDropdown title="Guest" id="account-dropdown" align="end">
              <NavDropdown.Item as={Link} to="/signin">
                <FaSignInAlt className="me-2" /> Sign In
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/signup" className="text-danger">
                <FaUserPlus className="me-2" /> Register
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
