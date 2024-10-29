import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './Events.css';

const Events = () => {
  const [events, setEvents] = useState([]);

  // Simulating JSON Data Fetch
  useEffect(() => {
    const eventData = [
      {
        title: 'International Pet Day',
        date: 'Wed, Apr 28',
        time: '5:30 PM',
        address: '36 Guild Street London, UK',
        price: 'FREE',
        imageUrl: 'https://img.pikbest.com/origin/06/18/92/40cpIkbEsTeXT.jpg!w700wp',  // Image URL for the event
      },
      {
        title: 'Pet Care Workshop',
        date: 'Thu, May 13',
        time: '10:00 AM',
        address: '45 Pet Street London, UK',
        price: 'FREE',
        imageUrl: 'https://pbs.twimg.com/media/GMcC7dwXkAI00VK.jpg',  // Image URL for the event
      },
      {
        title: 'Adoption Event',
        date: 'Fri, May 14',
        time: '2:00 PM',
        address: '28 Groom Avenue London, UK',
        price: 'FREE',
        imageUrl: 'https://kidlinks-assets.s3.amazonaws.com/uploads/Hugapalooza-2024-Flyer-SQUARE-1.png',  // Image URL for the event
      },
      {
        title: 'Pet Care Workshop',
        date: 'Thu, May 13',
        time: '10:00 AM',
        address: '45 Pet Street London, UK',
        price: 'FREE',
        imageUrl: 'https://pbs.twimg.com/media/GMcC7dwXkAI00VK.jpg',  // Image URL for the event
      },
      {
        title: 'Pet Care Workshop',
        date: 'Thu, May 13',
        time: '10:00 AM',
        address: '45 Pet Street London, UK',
        price: 'FREE',
        imageUrl: 'https://pbs.twimg.com/media/GMcC7dwXkAI00VK.jpg',  // Image URL for the event
      },
      {
        title: 'Adoption Event',
        date: 'Fri, May 14',
        time: '2:00 PM',
        address: '28 Groom Avenue London, UK',
        price: 'FREE',
        imageUrl: 'https://sonomacounty.ca.gov/Main%20County%20Site/Administrative%20Support%20%26%20Fiscal%20Services/IOLERO/Images/Screenshot%202024-09-06%20114349.png',  // Image URL for the event
      },
      {
        title: 'Pet Care Workshop',
        date: 'Thu, May 13',
        time: '10:00 AM',
        address: '45 Pet Street London, UK',
        price: 'FREE',
        imageUrl: 'https://pbs.twimg.com/media/GMcC7dwXkAI00VK.jpg',  // Image URL for the event
      },
      {
        title: 'Pet Care Workshop',
        date: 'Thu, May 13',
        time: '10:00 AM',
        address: '45 Pet Street London, UK',
        price: 'FREE',
        imageUrl: 'https://pbs.twimg.com/media/GMcC7dwXkAI00VK.jpg',  // Image URL for the event
      },
      {
        title: 'Adoption Event',
        date: 'Fri, May 14',
        time: '2:00 PM',
        address: '28 Groom Avenue London, UK',
        price: 'FREE',
        imageUrl: 'https://sonomacounty.ca.gov/Main%20County%20Site/Administrative%20Support%20%26%20Fiscal%20Services/IOLERO/Images/Screenshot%202024-09-06%20114349.png',  // Image URL for the event
      }
    ];
    setEvents(eventData);
  }, []);

  return (
    <Container className="mt-4">
      <h5>Events &gt; Browse</h5>
      <Row>
        {events.map((event, index) => (
          <Col key={index} md={3} className="mb-4">  {/* Change md={4} to md={3} */}
            <Card className="event-card">
              <Card.Img className='event-image'
                variant="top"
                src={event.imageUrl}  // Use the event's image URL here
                alt={event.title}
              />
              <Card.Body>
                <p className="text-muted small mb-1">
                  {event.date} - {event.time}
                </p>
                <Card.Title>{event.title}</Card.Title>
                <p className="text-muted small">
                  <i className="bi bi-geo-alt"></i> {event.address}
                </p>
                <div className="d-flex justify-content-between align-items-center">
                  <Button variant="primary" size="sm">
                    Attend
                  </Button>
                  <span className="text-success">{event.price}</span>
                  <Button variant="outline-secondary" size="sm">
                    <i className="bi bi-bookmark"></i>
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Events;
