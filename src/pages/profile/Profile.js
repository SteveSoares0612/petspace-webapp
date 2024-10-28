// src/components/Profile.js
import React from 'react';
import { Container, Row, Col, Button, Form, Image } from 'react-bootstrap';

import './profile.css'

function Profile() {
  return (
    <Container className="p-4">
      {/* Profile Info Section */}
      <Row>
        <Col md={2}  className="text-center me-5">
          <Image src="https://img.freepik.com/free-photo/close-up-young-person-barbeque_23-2149271990.jpg" roundedCircle width={210}height={190}/>
          
        </Col>
       
        <Col md={8} className='text-start'>
        <h2>Kelsie Lexington</h2>
          <p>Female<br />kelsie.lexie@gmail.com<br />887 Northlake Place, Waterloo, ON, CA<br />12 Pet Events Attended</p>
          <Button className="me-2 custom">4 Pets</Button>
          <Button variant="danger" className="me-2">Add More+</Button>
          <Button variant="secondary">Manage Pets</Button>
        </Col>
        <Row>
          <Col md={12}>
          <h3 className='mt-5'>Edit Profile</h3>
          <Form className='mt-3'>
            <Row>
              <Col md={6}>
                <h6 className='text-muted fw-bold'>Personal Information</h6>
                <Row md={12}>
                  <Col md={6}>
                    <Form.Group >
                      <Form.Label className='mt-2'>First Name</Form.Label>
                      <Form.Control type="text" placeholder="First Name" value="Kelsie" />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className='mt-2'>Surname</Form.Label>
                      <Form.Control type="text" placeholder="Surname" value="Lexington" />
                    </Form.Group>
                  </Col>
                </Row>
              </Col>
              <Col md={6}>
                <h6 className='text-muted fw-bold'>Contact Information</h6>
                <Form.Group>
                  <Form.Label className='mt-2'>Email</Form.Label>
                  <Form.Control type="email" placeholder="Email" value="kelsie.lexie@gmail.com" disabled />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group>
                  <Form.Label className='mt-2'>Gender</Form.Label>
                  <Form.Control type="text" placeholder="Gender" value="Female" disabled />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label className='mt-2'>Phone Number</Form.Label>
                  <Form.Control type="email" placeholder="text" value="+1 (437) 678 5265" disabled />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group>
                  <Form.Label className='mt-2'>Date of Birth</Form.Label>
                  <Form.Control type="text" placeholder="Date of birth" value="12-02-2001" disabled />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label className='mt-2'>Country</Form.Label>
                  <Form.Control type="text" placeholder="text" value="Canada" disabled />
                </Form.Group>
              </Col>
              
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group>
                  <Form.Label className='mt-2'>Pets Owned</Form.Label>
                  <Form.Control type="text" placeholder="Pets Owned" value="3" />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label className='mt-2'>Province</Form.Label>
                  <Form.Select type="text" placeholder="Pets Owned" value="ON" />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label className='mt-2'>Address</Form.Label>
                  <Form.Control type="text" placeholder="address" value="887 Northlake Place, Waterloo" />
                </Form.Group>
              </Col>
            </Row>
            <Button variant="outline-danger" className="me-2 mt-3">Reset Password</Button>
            <Button variant="danger" className='mt-3'>Save</Button>
          </Form>
          </Col>
        </Row>
        
      </Row>
    </Container>
  );
}

export default Profile;
