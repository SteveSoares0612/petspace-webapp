/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import "./landing.css";
import Footer from "../../layout/Footer"

import section1image1 from "../../assets/images/section1img1.png";
import section2image from "../../assets/images/section2img.png";
import section3image from "../../assets/images/section3img.png";
import section4image from "../../assets/images/section4img.png";
import sideLogo from "../../assets/images/sideLogo.png";
import appstore from "../../assets/images/appstore.png";

import checkList1 from "../../assets/images/CheckCircle.png";
import checkList2 from "../../assets/images/CheckCircle2.png";


const LandingPage = () => {
  return (
    <Container fluid className="p-5">
      {/* First Section */}
      <section className="mb-5">
        <Row className="align-items-center text-center text-md-left">
          <Col md={4} className="mb-4 mb-md-0">
            <img
              src={section1image1}
              alt="First Image"
              className="img-fluid"
            />
          </Col>
          <Col md={1}></Col>
          <Col md={7} className="text-start">
            <h1 className='h1-size'>Simplifying Pet Care, In One App.</h1>
            <p style={{fontSize: '1.5rem'}}>Track. Connect. Share.</p>
            <Button variant="danger" className="mr-2">Open in Browser</Button>
            <img src={appstore}  className="img-fluid"></img>
          </Col>
          
        </Row>
      </section>

      {/* Second Section */}
      <section className="text-start text-md-left mb-5 mt-3">
        <Row className="align-items-center">
          <Col md={6}>
            <h2 className='fw-bold'>Manage All Your Pet’s Healthcare in One Place</h2>
            <p>Track your pet’s health, schedule vet appointments, and store all medical records in one convenient location.</p>
            <hr class="hr" />
            <ul className='list-unstyled'>
              <li><img className='me-2' src={checkList1}></img>Track vaccinations and medications.</li>
              <li><img className='me-2' src={checkList1}></img>Access online veterinary care.</li>
              <li><img className='me-2' src={checkList1}></img>Access & share pet health history.</li>
            </ul>
          </Col>
          <Col md={2}></Col>
          <Col md={4} className="mb-4 mb-md-0">
            <img
              src={section2image}
              alt="Third Image"
              className="img-fluid"
            />
          </Col>
        </Row>
      </section>
      
       {/* Third Section */}
       <section className="text-start text-md-left mt-3">
        <Row className="align-items-center">
        <Col md={4} className="mb-4 mb-md-0">
            <img
              src={section3image}
              alt="Third Image"
              className="img-fluid"
            />
          </Col>
          <Col md={2}></Col>
          <Col md={6}>
            <h2 className='fw-bold'>Explore and Book Pet Services & Events Instantly</h2>
            <p>Easily discover, book, and sign up for pet services or fun events with just a few clicks.</p>
            <ul className='list-unstyled'>
              <li><img className='me-2' src={checkList2}></img>Find nearby pet services</li>
              <li><img className='me-2' src={checkList2}></img>Discover & Sign up for fun pet events near you</li>
            </ul>
          </Col>
        </Row>
      </section>

      {/* Fourth Section */}
      <section className="text-start text-md-left mb-5 mt-3">
        <Row className="align-items-center">
          <Col md={6}>
            <h2 className='fw-bold'>Stay Organized with Reminders & AI Insights</h2>
            <p>Receive automated reminders and let AI track your pet’s history for smarter care management.</p>
            <hr class="hr" />
            <ul className='list-unstyled'>
              <li><img className='me-2' src={checkList1}></img>Set up medication reminders</li>
              <li><img className='me-2' src={checkList1}></img>Organize daily task lists and track activities</li>
            </ul>
          </Col>
          <Col md={2}></Col>
          <Col md={4} className="mb-4 mb-md-0">
            <img
              src={section4image}
              alt="Third Image"
              className="img-fluid"
            />
          </Col>
        </Row>
      </section>

      {/* Fifth Section */}
      <section className="text-end text-md-left mb-5 mt-3 backg-danger rounded">
        <Row className="align-items-center px-5">
            <Col md={6} className="mb-4 mb-md-0">
                <img
                src={sideLogo}
                alt="Third Image"
                className="img-fluid"
                />  
            </Col>
            <Col md={6}>
                <h2 className='fw-bold h1-size text-light'>Download Now to get started</h2>
                <p className='text-light'>Receive automated reminders and let AI track your pet’s history for smarter care management.</p>
                
            </Col>    
        </Row>
      </section>
      <Footer></Footer>
    </Container>
    
  );
};

export default LandingPage;
