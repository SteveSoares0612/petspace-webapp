import React, { useEffect, useState, useContext } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { FaChevronRight, FaSearchLocation } from "react-icons/fa"; 
import { useAuth } from "../context/AuthContext";

import dog1 from "../assets/images/dog1.jpg";
import dog2 from "../assets/images/dog2.jpg";
import dog3 from "../assets/images/dog3.jpg";
import "../pages/signin/signIn.css";

function Home() {
  const { petList } = useAuth();
  const [pets, setPets] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {

    console.log(petList)
    if (petList && petList.pets_owned) {
      setPets(petList.pets_owned.slice(0, 3));
    }
  }, [petList]);

  useEffect(() => {
    
    const eventData = [
      {
        title: 'International Pet Day',
        date: 'Wed, Apr 28',
        time: '5:30 PM',
        address: '36 Guild Street London, UK',
        price: 'FREE',
        imageUrl: 'https://img.pikbest.com/origin/06/18/92/40cpIkbEsTeXT.jpg',
      },
      {
        title: 'Pet Care Workshop',
        date: 'Thu, May 13',
        time: '10:00 AM',
        address: '45 Pet Street London, UK',
        price: 'FREE',
        imageUrl: 'https://pbs.twimg.com/media/GMcC7dwXkAI00VK.jpg',
      },
      {
        title: 'Adoption Event',
        date: 'Fri, May 14',
        time: '2:00 PM',
        address: '28 Groom Avenue London, UK',
        price: 'FREE',
        imageUrl: 'https://kidlinks-assets.s3.amazonaws.com/uploads/Hugapalooza-2024-Flyer-SQUARE-1.png',
      },
    ];
    setEvents(eventData);
  }, []);

  return (
    <>
      <Container className="mt-3 ms-0">
        <Row>
          <Col className="d-flex justify-content-between align-items-center">
            <h2>My Pets</h2>
            <a
              href="/managepets" 
              className="d-flex align-items-center link-dark link-underline-opacity-0"
            >
              <span>see all</span>
              <FaChevronRight className="ms-1" />
            </a>
          </Col>
        </Row>
      </Container>
      <Container className="mt-3 ms-0 mb-4">
        <Row>
          {pets.map((pet) => (
            <Col key={pet.id} className="d-flex justify-content-start align-items-center">
              <Card className="me-3" style={{ width: "18rem", height: "18rem" }}>
                <Card.Img
                  variant="top"
                  src= "https://images.pexels.com/photos/1490908/pexels-photo-1490908.jpeg?cs=srgb&dl=pexels-svetozar-milashevich-99573-1490908.jpg&fm=jpg" 
                  style={{ height: "12rem", objectFit: "cover" }}
                />
                <Card.Body>
                  <Card.Title>{pet.name}</Card.Title>
                  <Card.Text>{pet.breed}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      <Container className="mt-3 ms-0">
        <Row>
          <Col className="d-flex justify-content-between align-items-center">
            <h2>Events</h2>
            <a
              href="/events" // Link to the "See All" page
              className="d-flex align-items-center link-dark link-underline-opacity-0"
            >
              <span>see all</span>
              <FaChevronRight className="ms-1" />
            </a>
          </Col>
        </Row>
      </Container>
      <Container className="mt-3 ms-0 mb-4">
        <Row>
          {events.slice(0, 3).map((event, index) => (
            <Col key={index} className="d-flex justify-content-start align-items-center ">
              <Card className="me-3" style={{ width: "18rem", height: "22rem" }}>
                <Card.Img
                  variant="top"
                  src={event.imageUrl}
                  style={{ height: "12rem", objectFit: "cover" }}
                />
                <Card.Body>
                  <Card.Text className="card-txt-date"><b>{event.date} • {event.time}</b></Card.Text>
                  <Card.Title><b>{event.title}</b></Card.Title>
                  <Card.Text className="card-txt-location mb-3">
                    <FaSearchLocation className="ms-1" />
                    <span className="ms-1"><b>{event.address}</b></span>
                  </Card.Text>
                  <div className="d-flex justify-content-between align-items-center">
                    <Button className="btn-color">Book Now</Button>
                    <span className="yellow-txt me-3"><b>{event.price}</b></span>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      {/* Additional sections for Featured Items can follow the same pattern */}
    </>
  );
}

export default Home;
