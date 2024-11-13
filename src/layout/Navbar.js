// src/layout/Navbar.js
import React, { useEffect } from "react";
import { Navbar, Nav, Container, Button, NavDropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.png";
import { useAuth } from "../context/AuthContext";
import { FaSignOutAlt, FaSignInAlt, FaUserPlus } from "react-icons/fa";

import ProfileIcon from "../assets/images/myprofileicon.png";
import ImagePreview from "../assets/images/previewImage.jpg";
import editPetsIcon from "../assets/images/editpets.png";
import FamilyIcon from "../assets/images/famiylIcon.png";
import LogoutIcon from "../assets/images/logout.png";
import RegisterIcon from "../assets/images/register.png";
import LoginIcon from "../assets/images/login.png";

function AppNavbar() {
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(String(user.email));
    navigate("/signin");
  };

  useEffect(() => {
    console.log(user.address);
  });

  return (
    <Navbar bg="light" expand="lg" className="py-3">
      <Container>
        {/* Logo */}
        <Navbar.Brand as={Link} to="/">
          <img src={logo} width={120} alt="Logo" />
        </Navbar.Brand>

        {/* Hamburger menu for mobile */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/home">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/events">
              Events
            </Nav.Link>
            <Nav.Link as={Link} to="/health">
              Health
            </Nav.Link>
            
          </Nav>

          {/* Authentication Links on the right as Dropdown */}
          <Nav className="ms-auto">
            {isAuthenticated ? (
              <NavDropdown
                title={<>
                  <img
                    src={user.profile_image ? user.profile_image : ImagePreview}
                    alt="Profile"
                    className="me-2 rounded-circle"
                    width={24}
                    height={24}
                  />
                  {`Welcome, ${user.first_name}`}
                </>}
                id="user-dropdown"
                align="end"
              >
                <NavDropdown.Item as={Link} to="/profile">
                  <img
                    src={ProfileIcon}
                    alt="My Profile"
                    className="me-2"
                    width={16}
                    height={16}
                  />{" "}
                  Update Profile
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={Link} to="/family">
                  <img
                    src={FamilyIcon}
                    alt="My Family"
                    className="me-2"
                    width={16}
                    height={16}
                  />{" "}
                  My Family
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={Link} to="/managepets">
                  <img
                    src={editPetsIcon}
                    alt="Manage Pets"
                    className="me-2"
                    width={16}
                    height={16}
                  />{" "}
                  Manage Pets
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item
                  onClick={handleLogout}
                  className="text-danger"
                >
                  <img
                    src={LogoutIcon}
                    alt="Signout"
                    className="me-2"
                    width={16}
                    height={16}
                  />{" "}
                  Sign Out
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <NavDropdown title="Guest" id="account-dropdown" align="end">
                <NavDropdown.Item as={Link} to="/signin">
                  <img
                    src={LoginIcon}
                    alt="My Profile"
                    className="me-2"
                    width={16}
                    height={16}
                  />{" "}
                  Sign In
                </NavDropdown.Item>
                <NavDropdown.Item
                  as={Link}
                  to="/signup"
                 
                >
                  <img
                    src={RegisterIcon}
                    alt="My Profile"
                    className="me-2"
                    width={16}
                    height={16}
                  />{" "}
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
