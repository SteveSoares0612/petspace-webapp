import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Modal,
} from "react-bootstrap";
import "./ManagePets.css";
import deleteIcon from "../../assets/images/delete.png";
import { useAuth } from "../../context/AuthContext";

const ManagePets = () => {
  const { petList, addPet, deletePet, getPetList } = useAuth();
  const [pets, setPets] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showAddPetForm, setShowAddPetForm] = useState(false);
  const [petToDelete, setPetToDelete] = useState(null);

  const [newPet, setNewPet] = useState({
    name: "",
    breed: "",
    type: "Dog", // default to Dog
    dob: "", // date of birth
    color: "", // color
    gender: "", // gender
  });

  useEffect(() => {
    // Update pets state whenever petList changes
    if (petList && petList.pets_owned) {
      setPets(petList.pets_owned);
    }
  }, [petList]);

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
        await addPet(
          newPet.name,
          newPet.breed,
          newPet.type,
          newPet.dob,
          newPet.color,
          newPet.gender
        );
        // Reset newPet state
        setNewPet({
          name: "",
          breed: "",
          type: "Dog",
          dob: "",
          color: "",
          gender: "",
        });
        setShowAddPetForm(false);
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

  const handleDeleteMember = (id) => {
    setPetToDelete(id);
    console.log(id);
    setShowModal(true);
  };

  const confirmDeletePet = async () => {
    if (petToDelete) {
      try {
        await deletePet(petToDelete);
        setShowModal(false);
        setPetToDelete(null);
        await getPetList(); // Refresh the pet list
      } catch (error) {
        alert("Failed to delete pet.");
      }
    }
  };

  // Helper function to get display text for pet attributes
  const getDisplayText = (value, defaultText) => {
    return value ? value : defaultText;
  };

  // Determine if there are both dog and cat types in pets
  const hasDogs = pets.some((pet) => pet.animal_type === "Dog");
  const hasCats = pets.some((pet) => pet.animal_type === "Cat");

  return (
    <div className="manage-pets">
      <Container>
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

                <Form.Group controlId="petDob" className="mt-3">
                  <Form.Label>Date of Birth</Form.Label>
                  <Form.Control
                    type="date"
                    name="dob"
                    value={newPet.dob}
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <Form.Group controlId="petColor" className="mt-3">
                  <Form.Label>Color</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter color"
                    name="color"
                    value={newPet.color}
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <Form.Group controlId="petGender" className="mt-3">
                  <Form.Label>Gender</Form.Label>
                  <Form.Control
                    as="select"
                    name="gender"
                    value={newPet.gender}
                    onChange={handleInputChange}
                  >
                    <option value="">Select...</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
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
            {pets.length === 0 ? (
              <Col className="text-center mt-4">
                <p>No pets found. Click "Add Pet" to add a new pet.</p>
              </Col>
            ) : (
              <>
                {hasDogs && (
                  <>
                    <h4 className="pet-section-title">Dogs</h4>
                    <Row>
                      {pets
                        .filter((pet) => pet.animal_type === "Dog")
                        .map((pet) => (
                          <Col md={4} key={pet.id}>
                            <Card className="pet-card mb-4">
                              <Card.Body>
                                <div className="d-flex align-items-center">
                                  <div className="pet-image-col">
                                    <img
                                      src={
                                        "https://images.pexels.com/photos/1490908/pexels-photo-1490908.jpeg?cs=srgb&dl=pexels-svetozar-milashevich-99573-1490908.jpg&fm=jpg" ||
                                        deleteIcon
                                      } // Fallback image if none exists
                                      alt={pet.name}
                                      className="rounded-circle pet-image"
                                      style={{ height: "7rem" }}
                                    />
                                  </div>
                                  <div className="pet-text-col ms-3">
                                    <h5 className="pet-info fw-bold">
                                      {getDisplayText(pet.name, "Unnamed")}
                                    </h5>
                                    <p className="pet-info">
                                      {`${getDisplayText(
                                        pet.breed,
                                        "Unknown Breed"
                                      )}, ${getDisplayText(
                                        pet.dob,
                                        "Unknown"
                                      )} Years`}
                                    </p>
                                    <div className="pet-actions">
                                      <a href="#" className="view-btn">
                                        View
                                      </a>
                                    </div>
                                  </div>
                                  <Button
                                    variant="danger"
                                    className="share-btn"
                                    onClick={() => handleDeleteMember(pet.id)}
                                  >
                                    <img
                                      src={deleteIcon}
                                      alt="Share"
                                      className="me-2"
                                      width={22}
                                    />
                                  </Button>
                                </div>
                              </Card.Body>
                            </Card>
                          </Col>
                        ))}
                    </Row>
                  </>
                )}

                {hasCats && (
                  <>
                    <h4 className="pet-section-title">Cats</h4>
                    <Row>
                      {pets
                        .filter((pet) => pet.animal_type === "Cat")
                        .map((pet) => (
                          <Col md={4} key={pet.id}>
                            <Card className="pet-card mb-4">
                              <Card.Body>
                                <div className="d-flex align-items-center">
                                  <div className="pet-image-col">
                                    <img
                                      src={
                                        "https://t3.ftcdn.net/jpg/02/36/99/22/360_F_236992283_sNOxCVQeFLd5pdqaKGh8DRGMZy7P4XKm.jpg" ||
                                        deleteIcon
                                      } // Fallback image if none exists
                                      alt={pet.name}
                                      className="rounded-circle pet-image"
                                      style={{ height: "7rem" }}
                                    />
                                  </div>
                                  <div className="pet-text-col ms-3">
                                    <h5 className="pet-info fw-bold">
                                      {getDisplayText(pet.name, "Unnamed")}
                                    </h5>
                                    <p className="pet-info">
                                      {`${getDisplayText(
                                        pet.breed,
                                        "Unknown Breed"
                                      )}, ${getDisplayText(
                                        pet.dob,
                                        "Unknown"
                                      )} Years`}
                                    </p>
                                    <div className="pet-actions">
                                      <a href="#" className="view-btn">
                                        View
                                      </a>
                                    </div>
                                  </div>
                                  <Button
                                    variant="danger"
                                    className="share-btn"
                                    onClick={() => handleDeleteMember(pet.id)}
                                  >
                                    <img
                                      src={deleteIcon}
                                      alt="Share"
                                      className="me-2"
                                      width={22}
                                    />
                                  </Button>
                                </div>
                              </Card.Body>
                            </Card>
                          </Col>
                        ))}
                    </Row>
                  </>
                )}
              </>
            )}
          </>
        )}
        {/* Confirmation Modal */}
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Deletion</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete this pet? This action is
            irreversible, and all associated data will be permanently lost.
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={confirmDeletePet}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
};

export default ManagePets;
