import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Events.css";

import peteventImage1 from "../../assets/images/petevent1.jpeg";
import peteventImage2 from "../../assets/images/petevent2.jpeg";
import peteventImage3 from "../../assets/images/petevent3.jpeg";
import peteventImage4 from "../../assets/images/petevent4.jpeg";

const Events = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const eventData = [
      {
        title: "3RD ANNUAL PAW-LIDAY FESTIVAL PRESENTED BY PET VALU",
        date: "Sat, Nov 30",
        time: "10:00 AM - 5:00 PM",
        address: "44 Gaukel Street Kitchener, ON, N2G 4P3 Canada",
        price: "FREE",
        imageUrl: peteventImage4,
      },
      {
        title: "4TH ANNUAL HOWLOWEEN POOCH PARTY",
        date: "Sat, Oct 26",
        time: "12:00 PM - 5:00 PM",
        address: "44 Gaukel Street Kitchener, ON, N2G 4P3 Canada",
        price: "FREE",
        imageUrl: peteventImage3,
      },
      {
        title: "DOGTOBERFEST (Day 1)",
        date: "Sat, Oct 12",
        time: "11:00 AM - 6:00 PM",
        address: "44 Gaukel Street Kitchener, ON, N2G 4P3 Canada",
        price: "FREE",
        imageUrl: peteventImage2,
      },
      {
        title: "ORANGE SHIRT DAY PACK WALK",
        date: "Wed, Sep 11",
        time: "6:30 PM - 8:00 PM",
        address: "801 Trillium Drive Kitchener, ON, N2R 1K4 Canada",
        price: "FREE",
        imageUrl: peteventImage1,
      },
    ];

    setEvents(eventData);
  }, []);

  return (
    <>
      <Container className="mt-3 ms-0">
        <Row>
          <Col className="d-flex justify-content-between align-items-center">
            <h2>Events</h2>
          </Col>
        </Row>
      </Container>
      <Container className="mt-4">
        <Row>
          {events.map((event, index) => (
            <Col key={index} md={3} className="d-flex align-items-stretch mb-4">
              <Card className="w-100">
                <Card.Img
                  className="event-image"
                  variant="top"
                  src={event.imageUrl}
                  alt={event.title}
                />
                <Card.Body className="d-flex flex-column">
                  <p className="text-muted small mb-1">
                    {event.date} - {event.time}
                  </p>
                  <Card.Title>{event.title}</Card.Title>
                  <p className="text-muted small">
                    <i className="bi bi-geo-alt"></i> {event.address}
                  </p>
                  <div className="mt-auto d-flex justify-content-between align-items-center">
                    <Button variant="primary" size="sm">
                      Remind me
                    </Button>
                    <span className="text-success">{event.price}</span>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default Events;
