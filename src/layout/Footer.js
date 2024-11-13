// src/layout/Footer.js
import React from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../assets/images/sideLogoRed.png'; 
import store from "../assets/images/appandgoogle.png";

function Footer() {
  return (
    <footer className="bg-light text-dark py-4">
      <Container>
        <Row className="align-items-start">
          {/* Links Section */}
          <Col md={4} className="d-flex flex-column">
            <h5 className="mb-3 ms-3">Quick Links</h5>
            <Nav className="flex-column">
              <Nav.Link as={Link} to="/home">Home</Nav.Link>
              <Nav.Link as={Link} to="/events">Events</Nav.Link>
              <Nav.Link as={Link} to="/health">My Health</Nav.Link>
             
            </Nav>
          </Col>

        
         {/* Contact Information Section */}
          <Col md={4} className="text-center d-flex flex-column align-items-center">
            <img src={logo} alt="PetSpace Logo" width={250} className="mb-4 mt-5" /> 
            <Row className="justify-content-center">
              <Col className="text-center">
                <img src={store} className="img-fluid" style={{ maxWidth: '70%' }} alt="Google Play Store" />
              </Col>
            
            </Row>
          </Col>


          {/* Follow Us Section */}
          <Col md={4} className="d-flex flex-column align-items-end text-end">
            <h5 className="mb-3 me-3">Follow Us</h5>
            <Nav className="flex-column">
              <Nav.Link href="https://facebook.com" target="_blank">Facebook</Nav.Link>
              <Nav.Link href="https://twitter.com" target="_blank">Twitter</Nav.Link>
              <Nav.Link href="https://instagram.com" target="_blank">Instagram</Nav.Link>
            </Nav>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col className="text-center greyed">
            <p>&copy; {new Date().getFullYear()} PetSpace. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
