import React, { useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import './ManagePets.css'; 
import shareIcon from '../../assets/images/shareIcon.png'; 


const ManagePets = () => {
  // Inline JSON data for pets
  const initialPets = [
    {
      "name": "Soli",
      "type": "Dog",
      "age": 4,
      "breed": "American Bulldog",
      "image": "https://i.natgeofe.com/n/5f35194b-af37-4f45-a14d-60925b280986/NationalGeographic_2731043_square.jpg"
    },
    {
      "name": "Poppy",
      "type": "Dog",
      "age": 4,
      "breed": "American Bulldog",
      "image": "https://i.natgeofe.com/n/5f35194b-af37-4f45-a14d-60925b280986/NationalGeographic_2731043_square.jpg"
    },
    {
      "name": "Emmy",
      "type": "Dog",
      "age": 4,
      "breed": "American Bulldog",
      "image": "https://cdn.outsideonline.com/wp-content/uploads/2023/03/Funny_Dog_S.jpg"
    },
    {
      "name": "Soli",
      "type": "Dog",
      "age": 4,
      "breed": "American Bulldog",
      "image": "https://i.natgeofe.com/n/5f35194b-af37-4f45-a14d-60925b280986/NationalGeographic_2731043_square.jpg"
    },
    {
      "name": "Soli",
      "type": "Dog",
      "age": 4,
      "breed": "American Bulldog",
      "image": "https://i.natgeofe.com/n/5f35194b-af37-4f45-a14d-60925b280986/NationalGeographic_2731043_square.jpg"
    },
    {
      "name": "Whiskers",
      "type": "Cat",
      "age": 2,
      "breed": "Persian Cat",
      "image": "https://www.memphisveterinaryspecialists.com/files/best-breeds-of-house-cats-memphis-vet-1-1.jpeg"
    },
    {
      "name": "Mittens",
      "type": "Cat",
      "age": 3,
      "breed": "Siamese Cat",
      "image": "https://as1.ftcdn.net/v2/jpg/01/63/11/70/1000_F_163117064_syJkTuCddASYjvl4WqyRmnuy8cDXpoQY.jpg"
    },
    {
      "name": "Shadow",
      "type": "Cat",
      "age": 1,
      "breed": "Maine Coon",
      "image": "https://www.memphisveterinaryspecialists.com/files/best-breeds-of-house-cats-memphis-vet-1-1.jpeg"
    }
  ];

  const [pets, setPets] = useState(initialPets);

  return (
    <div className="manage-pets">
      <Container>
        <Row className="d-flex justify-content-between align-items-center">
          <Col className="d-flex align-items-center">
            <h2>Manage Pets</h2>
          </Col>
          <Col className="d-flex justify-content-end align-items-center">
            <Button variant="primary" className="ms-auto">Add Pet</Button>
          </Col>
        </Row>


        {/* Dogs Section */}
        <h4 className="pet-section-title">Dogs</h4>
        <Row>
          {pets
            .filter((pet) => pet.type === 'Dog')
            .map((pet, index) => (
              <Col md={4} key={index}>
                <Card className="pet-card mb-4">
                  <Card.Body>
                    <div className="d-flex align-items-center">
                      <div className="pet-image-col">
                        <img
                          src={pet.image}
                          alt={pet.name}
                          className="rounded-circle pet-image"
                          style={{ width: "5rem", }}
                        />
                      </div>
                      <div className="pet-text-col ms-3">
                        <h5 className="pet-info">{pet.name}</h5>
                        <p className="pet-info">{`${pet.type}, ${pet.age} years`}</p>
                        <p className="pet-info">{pet.breed}</p>
                        <div className="pet-actions">
                          <a href='' className="edit-btn rounded fs-6 fw-normal">
                            Edit
                          </a>
                          <a href='' className="view-btn">
                            View
                          </a>
                        </div>
                      </div>
                      <Button variant="danger" className="share-btn">
                        <img src={shareIcon} alt="My Profile" className="me-2" width={22} />
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
        </Row>

        {/* Cats Section */}
        <h4 className="pet-section-title">Cats</h4>
        <Row>
          {pets
            .filter((pet) => pet.type === 'Cat')
            .map((pet, index) => (
              <Col md={4} key={index}>
                <Card className="pet-card mb-4">
                  <Card.Body>
                    <div className="d-flex align-items-center">
                      <div className="pet-image-col">
                        <img
                          src={pet.image}
                          alt={pet.name}
                          className="rounded-circle pet-image"
                          style={{ width: "5rem", }}
                        />
                      </div>
                      <div className="pet-text-col ms-3">
                      <h5 className="pet-info">{pet.name}</h5>
                        <p className="pet-info">{`${pet.type}, ${pet.age} years`}</p>
                        <p className="pet-info">{pet.breed}</p>
                        <div className="pet-actions">
                          <a href=''  className="edit-btn rounded">
                            Edit
                          </a>
                          <a href='' className="view-btn">
                            View
                          </a>
                        </div>
                      </div>
                      <Button variant="outline-danger" className="share-btn">
                        <i class="bi bi-share-fill"></i>
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
        </Row>
      </Container>
    </div>
  );
};

export default ManagePets;
