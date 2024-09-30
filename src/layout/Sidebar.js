// src/layout/Sidebar.js
import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <Nav className="flex-column bg-light" style={{ height: '100vh', padding: '1rem' }}>
      <Nav.Link as={Link} to="/">Home</Nav.Link>
      <Nav.Link as={Link} to="/settings">Settings</Nav.Link>
      <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
      <Nav.Link as={Link} to="/health">My Health</Nav.Link>

    </Nav>
  );
}

export default Sidebar;
