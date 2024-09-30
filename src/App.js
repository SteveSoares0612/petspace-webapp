import React from 'react';
import { Container, Row, Col, Navbar, Nav, Button, Form } from 'react-bootstrap';


function App() {
  return (
    <>
      {/* Navbar */}
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">Dashboard</Navbar.Brand>
        <Nav className="ml-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#profile">Profile</Nav.Link>
        </Nav>
      </Navbar>

      {/* Main Container */}
      <Container fluid>
        <Row>
          {/* Sidebar */}
          <Col md={2} className="bg-light">
            <Nav className="flex-column">
              <Nav.Link href="#dashboard">Dashboard</Nav.Link>
              <Nav.Link href="#settings">Settings</Nav.Link>
            </Nav>
          </Col>

          {/* Main Content */}
          <Col md={10}>
            <h1>Dashboard Content</h1>
            <DashboardForm></DashboardForm>
          </Col>
        </Row>
      </Container>
    </>
  );
}

function DashboardForm() {
  return (
    <Form>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default App;