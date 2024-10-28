// src/components/Profile.js
import React from 'react';
import { Container, Row, Col, Button, Form, Image } from 'react-bootstrap';

import logo from '../assets/images/logo.png';

function Profile() {
  return (
    <Container className="p-4">
      {/* Navigation Bar */}
      <Row className="align-items-center mb-3">
        <Col>
          <img src={logo} alt="PetSpace Logo" width={100}/>
        </Col>
        <Col>
          <nav className="d-flex justify-content-around">
            <a href="/">Dashboard</a>
            <a href="/home">Home</a>
            <a href="/events">Events</a>
            <a href="/health">Health</a>
            <a href="/shop">Shop</a>
            <a href="/calendar">Calendar</a>
            <a href="/settings">Settings</a>
          </nav>
        </Col>
        <Col className="d-flex justify-content-end">
          <Image src="path/to/profile-pic.png" roundedCircle width={40} />
          <span className="ml-2">Poppy<br />Dog, 4 years</span>
        </Col>
      </Row>

      {/* Profile Info Section */}
      <Row>
        <Col md={3} className="text-center">
          <Image src="path/to/user-image.png" roundedCircle width={100} />
          <h3>Kelsie Lexington</h3>
          <p>Female<br />kelsie.lexie@gmail.com<br />887 Northlake Place, Waterloo, ON, CA<br />12 Pet Events Attended</p>
          <Button variant="danger" className="mr-2">Add More+</Button>
          <Button variant="secondary">Manage Pets</Button>
        </Col>
        <Col md={9}>
          <h4>Edit Profile</h4>
          <Form>
            <Row>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>First Name</Form.Label>
                  <Form.Control type="text" placeholder="First Name" value="Kelsie" />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Surname</Form.Label>
                  <Form.Control type="text" placeholder="Surname" value="Lexington" />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Gender</Form.Label>
                  <Form.Control type="text" placeholder="Gender" value="Female" disabled />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Date of Birth</Form.Label>
                  <Form.Control type="text" placeholder="Date of birth" value="12-02-2001" disabled />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Pets Owned</Form.Label>
                  <Form.Control type="text" placeholder="Pets Owned" value="3" />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" placeholder="Email" value="kelsie.lexie@gmail.com" disabled />
                </Form.Group>
              </Col>
            </Row>
            <Button variant="outline-danger" className="mr-2">Reset Password</Button>
            <Button variant="danger">Save</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Profile;
