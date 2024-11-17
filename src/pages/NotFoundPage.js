import React from "react";
import { Button, Container } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <Container className="d-flex min-vh-100 flex-column justify-content-center align-items-center">
      <div className="text-center">
        <h1>404 - Page Not Found</h1>
        <p>The page you are looking for does not exist.</p>
        <Button onClick={() => navigate("/")}>Go Back to Home</Button>
      </div>
    </Container>
  );
}

export default NotFound;
