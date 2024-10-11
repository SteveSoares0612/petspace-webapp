import React, { useState } from "react";
import {
  Container,
  Button,
  Row,
  Col,
  Carousel,
  Form,
  Alert,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Assuming you have a useAuth hook for signing up

import image1 from "../assets/images/CarouselImage1.png";
import image2 from "../assets/images/CarouselImage2.png";
import image3 from "../assets/images/CarouselImage3.png";
import "./signin/signIn.css";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Loading state for button
  const navigate = useNavigate();
  const { signUp, authError } = useAuth(); // Assume signUp comes from useAuth

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");

    const specialCharacterRegex =
      /^(?=.*[!@#$%^&*(),.?{}|<>])(?=.*[^":])[\s\S]{8,}$/;

    if (authError) {
      setError(authError);
    }

    // Basic validation
    if (!email) {
      setError("Email is required.");
      return;
    }
    if (!password || !confirmPassword) {
      setError("Please fill in both password fields.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }
    if (!specialCharacterRegex.test(password)) {
      setError(
        "Password must contain at least one special character. (eg: #,@,$,!)"
      );
      return;
    }

    // Call the sign-up API function (placeholder)
    try {
      const success = await signUp(name, email, password); // Call the login function

      // Use the success value to determine navigation
      if (success) {
        console.log("Registration successful, navigating to home");
        navigate("/"); // Redirect to home page
      } else {
        console.log("Registration failed, not navigating");
      }
    } catch (error) {
      console.error("Registration failed: ", error);
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
          <Carousel fade="true">
            <Carousel.Item>
              <img className="d-block w-100" src={image1} alt="First slide" />
            </Carousel.Item>
            <Carousel.Item>
              <img className="d-block w-100" src={image2} alt="Second slide" />
            </Carousel.Item>
            <Carousel.Item>
              <img className="d-block w-100" src={image3} alt="Third slide" />
            </Carousel.Item>
          </Carousel>
        </Col>

        {/* Right Side - Sign Up Form */}
        <Col
          md={6}
          className="d-flex align-items-center justify-content-center bg-right"
        >
          <div className="w-100 ms-3">
            <h2 className="text-start">Hey there! Welcome!</h2>
            <p className="text-start mt-3">Create your account to register with PetSpace!.</p>

            {/* Display error if any */}
            {error && (
              <p className="text-start mt-3 text-danger">
                <b>{error}</b>
              </p>
            )}
            <Form onSubmit={handleSignUp}>
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

              <Form.Group controlId="formBasicName" className="mt-3">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  className="txtfield-border"
                  size="lg"
                  type="text"
                  placeholder="Enter Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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

              <Form.Group controlId="formBasicConfirmPassword" className="mt-3">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  className="txtfield-border"
                  size="lg"
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </Form.Group>
              <div className="d-grid">
                <Button
                  size="lg"
                  className="w-100 mt-5 btn-color"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Signing up..." : "Register"}
                </Button>
              </div>
              <div className="text-center mt-2">
                <small>
                  Already have an account?{" "}
                  <a href="/signin" className="link-color">
                    Sign In
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

export default SignUp;
