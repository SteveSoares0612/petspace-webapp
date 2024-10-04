// src/pages/SignIn.js
import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Carousel } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; 
import image1 from '../../assets/images/CarouselImage1.png'; // Import your images
import image2 from '../../assets/images/CarouselImage2.png';
import image3 from '../../assets/images/CarouselImage3.png';
import './signIn.css'; 


const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // Loading state for button
  const navigate = useNavigate();
  const { login } = useAuth(); // Get the login function from useAuth

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(email, password); // Call the login function with email and password
      navigate('/'); // Redirect to the home page on successful login
    } catch (error) {
      console.error("THIS IS FROM SIGN IN: "+error); // Log any error (handled by AuthContext)
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="vh-100 bg-dark">
      <Row className="h-100">
        {/* Left Side - Image Carousel */}
        <Col md={6} className="d-none d-md-flex align-items-center justify-content-center bg-left">
          <Carousel fade="true">
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={image1} // Replace with your image source
                alt="First slide"
              />
               <p className='mt-0 txt-color text-center'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut 
                  labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco 
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit 
                  esse cillum dolore eu fugiat nulla pariatur. 
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={image2} // Replace with your image source
                alt="Second slide"
              />
              <p className='mt-0 txt-color text-center'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut 
                  labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco 
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit 
                  esse cillum dolore eu fugiat nulla pariatur. 
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={image3} // Replace with your image source
                alt="Third slide"
              />
              <p className='mt-0 txt-color text-center'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut 
                  labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco 
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit 
                  esse cillum dolore eu fugiat nulla pariatur. 
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </Carousel.Item>
          </Carousel>
         
        </Col>

        {/* Right Side - Sign In Form */}
        <Col md={6} className="d-flex align-items-center justify-content-center bg-right">
          <div className="w-100 ms-3">
            <h2 className="text-start">Hey! Welcome Back!</h2>
            <p className="text-start mt-3">Please Enter Username and password to sign in! username@example.com | password</p>

            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formBasicEmail" className='mt-3'>
                <Form.Label>Email address</Form.Label>
                <Form.Control className='txtfield-border'
                  size="lg"
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword" className='mt-3'>
                <Form.Label>Password</Form.Label>
                <Form.Control className='txtfield-border'
                  size="lg"
                  type="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>
              <div className="d-grid gap-2">
              <Button size="lg" className="w-100 mt-5 btn-color" onClick={handleSubmit}>
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};


export default SignIn;
