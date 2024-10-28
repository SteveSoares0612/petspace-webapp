// src/pages/SignIn.js
import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Carousel } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import image1 from "../../assets/images/CarouselImage1.png"; // Import your images
import image2 from "../../assets/images/CarouselImage2.png";
import image3 from "../../assets/images/CarouselImage3.png";
import "./signIn.css";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Loading state for button
  const navigate = useNavigate();
  const { login, authError, isAuthenticated } = useAuth(); // Get the login function from useAuth

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Show loading state

    try {
      const success = await login(email, password); // Call the login function

      // Use the success value to determine navigation
      if (success) {
        console.log("Login successful, navigating to home");
        navigate("/"); // Redirect to home page
      } else {
        console.log("Login failed, not navigating");
      }
    } catch (error) {
      console.error("Login failed: ", error);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <Container className="vh-100 bg-dark">
      <Row className="h-100">
        {/* Left Side - Image Carousel */}
        <Col
          md={6}
          className="d-none d-md-flex align-items-center justify-content-center bg-left"
        >
          <Carousel fade="" variant="dark">
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={image1} // Replace with your image source
                alt="First slide"
              />
              <Carousel.Caption className="mt-5 text-dark text-center">
                <b>Track. Connect. Share.</b>
                <p>
                  Easily discover, book, and sign up for pet services or fun
                  events with just a few clicks.
                </p>
              </Carousel.Caption>
              {/* <p className="mt-0 txt-color text-center">
                Track. Connect. Share.
              </p> */}
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={image2} // Replace with your image source
                alt="Second slide"
              />
              <Carousel.Caption className="mt-5 text-dark text-center">
                <b>Manage All Your Pet’s Healthcare in One Place</b>
                <p>
                  Track your pet's health, schedule vet appointments, and store
                  all medical records in one convenient location.
                </p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={image3} // Replace with your image source
                alt="Third slide"
              />

              <Carousel.Caption className="mt-5 text-dark text-center">
                <b>Explore and Book Pet Services & Events Instantly</b>
                <p>
                  Easily discover, book, and sign up for pet services or fun
                  events with just a few clicks.
                </p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </Col>

        {/* Right Side - Sign In Form */}
        <Col
          md={6}
          className="d-flex align-items-center justify-content-center bg-right"
        >
          <div className="w-100 ms-3">
            <h2 className="text-start">Hey! Welcome Back!</h2>
            <p className="text-start mt-3">
              Please Enter Username and password to sign in!
            </p>
            {authError && (
              <p className="text-start mt-3 text-danger">
                <b>{authError}</b>
              </p>
            )}
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formBasicEmail" className="mt-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  className="txtfield-border"
                  size="lg"
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword" className="mt-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  className="txtfield-border"
                  size="lg"
                  type="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>
              {/* <div className="d-grid gap-2">
                <Button
                  size="lg"
                  className="w-100 mt-5 btn-color"
                  onClick={handleSubmit}
                >
                  {loading ? "Signing in..." : "Sign In"}
                </Button>
              </div> */}
              <div className="d-grid">
                <Button
                  size="lg"
                  className="w-100 mt-5 btn-color"
                  type="submit"
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  {loading ? "Signing in..." : "Sign In"}
                </Button>
              </div>
              <div className="text-center mt-2">
                <small>
                  Don't have an account?{" "}
                  <a href="/signup" className="link-color">
                    Register
                  </a>
                </small>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default SignIn;
