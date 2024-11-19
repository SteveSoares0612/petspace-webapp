import React, { useEffect, useState, useContext } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaChevronRight, FaSearchLocation } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

import peteventImage1 from "../assets/images/petevent1.jpeg";
import peteventImage2 from "../assets/images/petevent2.jpeg";
import peteventImage3 from "../assets/images/petevent3.jpeg";
import peteventImage4 from "../assets/images/petevent4.jpeg";
import "../pages/signin/signIn.css";
import previewImage from "../assets/images/previewImage.jpg";
import Events from "./Events/Events";

function Home() {
  const { petList } = useAuth();
  const [pets, setPets] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    console.log(petList);
    if (petList && petList.pets_owned) {
      setPets(petList.pets_owned.slice(0, 3));
    }
  }, [petList]);

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
      <Container className="mt-3 ms-0 mb-4 d-flex justify-content-start">
        <Row>
          {pets.map((pet) => (
            <Col key={pet.id} className="">
              <Card
                className="me-3"
                style={{ width: "18rem", height: "18rem" }}
              >
                {/* Card Image Wrapper with position relative */}
                <div className="position-relative">
                  <Card.Img
                    variant="top"
                    src={pet.pet_image || previewImage}
                    style={{ height: "12rem", objectFit: "cover" }}
                  />

                  {/* View Pet Button */}
                  <Button
                    variant="primary"
                    className="position-absolute start-50 translate-middle-x mb-0 text-align-center"
                    style={{ zIndex: 1, bottom: "-18px" }}
                  >
                    <Link to={`/viewpets/${pet.id}`} className="view-btn" style={{color:"white"}}>
                      View
                    </Link>
                  </Button>
                </div>

                {/* Card Body */}
                <Card.Body>
                  <Card.Title>{pet.name}</Card.Title>
                  <Card.Text>{pet.breed}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      <Events />
      {/* Additional sections for Featured Items can follow the same pattern */}
    </>
  );
}

export default Home;
