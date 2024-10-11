// src/components/Home.js
import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { FaChevronRight, FaSearchLocation } from "react-icons/fa"; 

import dog1 from "../assets/images/dog1.jpg";
import dog2 from "../assets/images/dog2.jpg";
import dog3 from "../assets/images/dog3.jpg";
import event1 from "../assets/images/event1.jpg";
import event2 from "../assets/images/event2.jpeg";
import event3 from "../assets/images/event3.jpg";
import "../pages/signin/signIn.css";
function Home() {
  return (
    <>
      <Container className="mt-3 ms-0">
        <Row>
          <Col className="d-flex justify-content-between align-items-center">
            <h2>My Pets</h2>
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
      <Container className="mt-3 ms-0 mb-4">
        <Row>
          <Col className="d-flex justify-content-start align-items-center ">
            <Card className="me-3" style={{ width: "18rem", height: "18rem" }}>
              <Card.Img
                variant="top"
                src={dog1}
                style={{ height: "12rem", objectFit: "cover" }}
              />
              <Card.Body>
                <Card.Title>Bobby</Card.Title>
                <Card.Text>German Shepard</Card.Text>
              </Card.Body>
            </Card>
            <Card className="me-3" style={{ width: "18rem", height: "18rem" }}>
              <Card.Img
                variant="top"
                src={dog2}
                style={{ height: "12rem", objectFit: "cover" }}
              />
              <Card.Body>
                <Card.Title>Bobby</Card.Title>
                <Card.Text>German Shepard</Card.Text>
              </Card.Body>
            </Card>
            <Card className="me-3" style={{ width: "18rem", height: "18rem" }}>
              <Card.Img
                variant="top"
                src={dog3}
                style={{ height: "12rem", objectFit: "cover" }}
              />
              <Card.Body>
                <Card.Title>Bobby</Card.Title>
                <Card.Text>German Shepard</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
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
      <Container className="mt-3 ms-0 mb-4">
        <Row>
          <Col className="d-flex justify-content-start align-items-center ">
          <Card className="me-3" style={{ width: "18rem", height: "22rem" }}>
              <Card.Img
                variant="top"
                src={event1}
                style={{ height: "12rem", objectFit: "cover" }}
              />
              <Card.Body>
                <Card.Text className="card-txt-date"><b>Wed, Apr 28 • 5:30 PM</b></Card.Text>
                <Card.Title><b>International Pet Day</b></Card.Title>
                <Card.Text className="card-txt-location mb-3"><FaSearchLocation className="ms-1" /><span className="ms-1"><b>312 Merchant Avenue, Waterloo </b></span></Card.Text>

                <div className="d-flex justify-content-between align-items-center">
                    <Button className="btn-color">Book Now</Button>
                    <span className="yellow-txt me-3"><b>FREE</b></span>
                </div>
              </Card.Body>
            </Card>
            <Card className="me-3" style={{ width: "18rem", height: "22rem" }}>
              <Card.Img
                variant="top"
                src={event2}
                style={{ height: "12rem", objectFit: "cover" }}
              />
              <Card.Body>
                <Card.Text className="card-txt-date"><b>Wed, Apr 28 • 5:30 PM</b></Card.Text>
                <Card.Title><b>International Pet Day</b></Card.Title>
                <Card.Text className="card-txt-location mb-3"><FaSearchLocation className="ms-1" /><span className="ms-1"><b>312 Merchant Avenue, Waterloo </b></span></Card.Text>

                <div className="d-flex justify-content-between align-items-center">
                    <Button className="btn-color">Book Now</Button>
                    <span className="yellow-txt me-3"><b>FREE</b></span>
                </div>
              </Card.Body>
            </Card>
            <Card className="me-3" style={{ width: "18rem", height: "22rem" }}>
              <Card.Img
                variant="top"
                src={event3}
                style={{ height: "12rem", objectFit: "cover" }}
              />
              <Card.Body>
                <Card.Text className="card-txt-date"><b>Wed, Apr 28 • 5:30 PM</b></Card.Text>
                <Card.Title><b>International Pet Day</b></Card.Title>
                <Card.Text className="card-txt-location mb-3"><FaSearchLocation className="ms-1" /><span className="ms-1"><b>312 Merchant Avenue, Waterloo </b></span></Card.Text>

                <div className="d-flex justify-content-between align-items-center">
                    <Button className="btn-color">Book Now</Button>
                    <span className="yellow-txt me-3"><b>FREE</b></span>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Container className="mt-3 ms-0">
        <Row>
          <Col className="d-flex justify-content-between align-items-center">
            <h2>Feautured Items</h2>
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
      <Container className="mt-3 ms-0 mb-4">
        <Row>
          <Col className="d-flex justify-content-start align-items-center ">
          <Card className="me-3" style={{ width: "18rem", height: "22rem" }}>
              <Card.Img
                variant="top"
                src={event2}
                style={{ height: "12rem", objectFit: "cover" }}
              />
              <Card.Body>
              
                <Card.Title><b>Blue Buffalo Dog Food</b></Card.Title>
                <Card.Text className="card-txt-price mb-3"><b>$29.99</b></Card.Text>

                <div className="d-flex justify-content-start align-items-center">
                    <Button className="btn-color">Add To Cart</Button>
                    <span className="txt-muted ms-3">500lbs</span>
                </div>
              </Card.Body>
            </Card>
            <Card className="me-3" style={{ width: "18rem", height: "22rem" }}>
              <Card.Img
                variant="top"
                src={event2}
                style={{ height: "12rem", objectFit: "cover" }}
              />
              <Card.Body>
              
                <Card.Title><b>Blue Buffalo Dog Food</b></Card.Title>
                <Card.Text className="card-txt-price mb-3"><b>$29.99</b></Card.Text>

                <div className="d-flex justify-content-start align-items-center">
                    <Button className="btn-color">Add To Cart</Button>
                    <span className="txt-muted ms-3">500lbs</span>
                </div>
              </Card.Body>
            </Card>
            <Card className="me-3" style={{ width: "18rem", height: "22rem" }}>
              <Card.Img
                variant="top"
                src={event2}
                style={{ height: "12rem", objectFit: "cover" }}
              />
              <Card.Body>
              
                <Card.Title><b>Blue Buffalo Dog Food</b></Card.Title>
                <Card.Text className="card-txt-price mb-3"><b>$29.99</b></Card.Text>

                <div className="d-flex justify-content-start align-items-center">
                    <Button className="btn-color">Add To Cart</Button>
                    <span className="txt-muted ms-3">500lbs</span>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      {/* <Row>
  <Container className='mt-3 ms-0'>
        <h2>My Pets</h2>
    </Container>
  </Row> */}
    </>
  );
}

export default Home;
