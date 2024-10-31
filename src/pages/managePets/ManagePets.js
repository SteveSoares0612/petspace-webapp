import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import "./ManagePets.css";
import shareIcon from "../../assets/images/shareIcon.png";
import { useAuth } from "../../context/AuthContext";

const ManagePets = () => {
  const { petList, addPet, getPetList } = useAuth();
  const [showAddPetForm, setShowAddPetForm] = useState(false);
  const [newPet, setNewPet] = useState({
    name: "",
    breed: "",
    type: "Dog", // default to Dog
  });

  useEffect(() => {
    getPetList(); // Fetch pets on component mount
  }, []);

  const handleAddPetClick = () => {
    setShowAddPetForm(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPet((prevPet) => ({
      ...prevPet,
      [name]: value,
    }));
  };

  const handleSavePet = async () => {
    if (newPet.name && newPet.breed) {
      try {
        await addPet(newPet.name, newPet.breed, newPet.type);
        setNewPet({ name: "", breed: "", type: "Dog" });
        setShowAddPetForm(false);
        getPetList(); // Refresh pet list after adding a new pet
      } catch (error) {
        console.error("Failed to save pet:", error);
      }
    } else {
      alert("Please enter both the name and breed of the pet.");
    }
  };

  const handleCancel = () => {
    setShowAddPetForm(false);
  };

  return (
    <div className="manage-pets">
      <Container className="p-4 mt-3 ms-0">
        <Row className="d-flex justify-content-between align-items-center">
          <Col className="d-flex align-items-center">
            <h2>Manage Pets</h2>
          </Col>
          <Col className="d-flex justify-content-end align-items-center">
            <Button
              variant="primary"
              onClick={handleAddPetClick}
              className="ms-auto"
            >
              Add Pet
            </Button>
          </Col>
        </Row>

        {showAddPetForm ? (
          <Row className="mt-3">
            <Col md={6}>
              <Form>
                <Form.Group controlId="petName">
                  <Form.Label>Pet Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter pet name"
                    name="name"
                    value={newPet.name}
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <Form.Group controlId="petBreed" className="mt-3">
                  <Form.Label>Breed</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter breed"
                    name="breed"
                    value={newPet.breed}
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <Form.Group controlId="petType" className="mt-3">
                  <Form.Label>Type</Form.Label>
                  <Form.Control
                    as="select"
                    name="type"
                    value={newPet.type}
                    onChange={handleInputChange}
                  >
                    <option value="Dog">Dog</option>
                    <option value="Cat">Cat</option>
                  </Form.Control>
                </Form.Group>

                <Button
                  variant="light"
                  onClick={handleCancel}
                  className="mt-3 mb-3 me-3"
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  onClick={handleSavePet}
                  className="mt-3 mb-3"
                >
                  Save Pet
                </Button>
              </Form>
            </Col>
          </Row>
        ) : (
          <>
            {Array.isArray(petList) && petList.length > 0 ? (
              <>
                <h4>Dogs</h4>
                <Row>
                  {petList
                    .filter((pet) => pet.type === "Dog")
                    .map((pet, index) => (
                      <Col key={index} md={4}>
                        <Card>
                          <Card.Body>
                            <Card.Title>{pet.name}</Card.Title>
                            <Card.Text>{pet.breed}</Card.Text>
                          </Card.Body>
                        </Card>
                      </Col>
                    ))}
                </Row>

                <h4>Cats</h4>
                <Row>
                  {petList
                    .filter((pet) => pet.type === "Cat")
                    .map((pet, index) => (
                      <Col key={index} md={4}>
                        <Card>
                          <Card.Body>
                            <Card.Title>{pet.name}</Card.Title>
                            <Card.Text>{pet.breed}</Card.Text>
                          </Card.Body>
                        </Card>
                      </Col>
                    ))}
                </Row>
              </>
            ) : (
              <Col className="text-center mt-4">
                <p>
                No pets currently added. Click "Add Pet" to add a new pet.
                </p>
              </Col>
            )}
          </>
        )}
      </Container>
    </div>
  );
};

export default ManagePets;
