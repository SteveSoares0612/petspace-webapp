// src/layout/Sidebar.js
import React from 'react';
import { Container } from 'react-bootstrap';

function Footer() {
  return (
    <footer className="py-4 bg-light">
    <Container>
      <div>
        <img
          src="http://10.144.109.208:8080/5.png"
          alt="PetSpace Logo"
          width="50"
        />
        <p>Track. Connect. Share</p>
        <p>petspace@gmail.com</p>
      </div>
    </Container>
  </footer>
  );
}

export default Footer;
