// src/components/Settings.js
import React from 'react';
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { FaChevronRight, FaSearchLocation } from "react-icons/fa"; 


function Events() {
  return <>
  <Container className="mt-3 ms-0">
        <Row>
          <Col className="d-flex justify-content-between align-items-center">
            <h2>Events</h2>
            <a
              href=""
              className="d-flex align-items-center link-dark link-underline-opacity-0"
            >
              <span className="">see all</span>
              <FaChevronRight className="ms-1" />
            </a>
          </Col>
        </Row>
      </Container>
  </>
}

export default Events;
