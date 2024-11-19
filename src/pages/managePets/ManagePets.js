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

import previewImage from "../../assets/images/previewImage.jpg";
import CustomModal from "../../components/CustomModal";

import { Link } from "react-router-dom";
import "./ManagePets.css";
import deleteIcon from "../../assets/images/delete.png";
import { useAuth } from "../../context/AuthContext";
import breeds from "../../data/Breeds";


const ManagePets = () => {
  const { petList, addPet, deletePet, getPetList } = useAuth();
  const [pets, setPets] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showAddPetForm, setShowAddPetForm] = useState(false);
  const [petToDelete, setPetToDelete] = useState(null);


  const [newPet, setNewPet] = useState({
    name: "",
    breed: "",
    type: "Dog",
    dob: "",
    color: "",
    gender: "",
    is_microchipped: "0",
    is_spayed_neutered: "0",
  });

  // Update `pets` state whenever `petList` changes
  useEffect(() => {
    if (petList && petList.pets_owned) {
      setPets(petList.pets_owned);
    }
  }, [petList]);

  const handleAddPetClick = () => setShowAddPetForm(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPet((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "type" && { breed: "" }),
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
          newPet.gender,
          newPet.is_microchipped,
          newPet.is_spayed_neutered
        );
        setNewPet({
          name: "",
          breed: "",
          type: "Dog",
          dob: "",
          color: "",
          gender: "",
          is_microchipped: "0",
          is_spayed_neutered: "0",
        });
        setShowAddPetForm(false);
        await getPetList(); // Refresh pet list after adding
      } catch (error) {
        console.error("Failed to save pet:", error);
      }
    } else {
      alert("Please enter both the name and breed of the pet.");
    }
  };

  const handleCancel = () => setShowAddPetForm(false);

  const handleDeleteMember = (id) => {
    setPetToDelete(id);
    setShowModal(true);
  };

  const confirmDeletePet = async () => {
    if (petToDelete) {
      try {
        await deletePet(petToDelete);
        setShowModal(false);
        setPetToDelete(null);
        await getPetList(); // Refresh pet list after deletion
      } catch (error) {
        alert("Failed to delete pet.");
      }
    }
  };

  const calculateAge = (dob) => {
    const birthDate = new Date(dob); // Parse the DOB string into a Date object
    const today = new Date(); // Get the current date

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    const dayDifference = today.getDate() - birthDate.getDate();

    // If the current date is before the birthday in the current year
    if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
      age--; // Subtract one year if the birthday hasn't occurred yet this year
    }

    if (age < 1) {
      // Calculate months difference
      const totalMonths =
        (today.getFullYear() - birthDate.getFullYear()) * 12 +
        today.getMonth() -
        birthDate.getMonth();

      const adjustedMonths = dayDifference < 0 ? totalMonths - 1 : totalMonths;
      return `${adjustedMonths} month${adjustedMonths === 1 ? "" : "s"}`;
    }

    return `${age} year${age === 1 ? "" : "s"}`;
  };

  const getDisplayText = (value, defaultText) => (value ? value : defaultText);

  // Determine if there are both dog and cat types in pets
  const hasDogs = pets.some((pet) => pet.animal_type === "Dog");
  const hasCats = pets.some((pet) => pet.animal_type === "Cat");

  console.log(pets);
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
                <Form.Group>
                  <Form.Label className="mt-2">Enter Name</Form.Label>
                  <Form.Control
                    placeholder="Enter pet name"
                    name="name"
                    value={newPet.name}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label className="mt-2">Choose Type</Form.Label>
                  <Form.Select
                    name="type"
                    value={newPet.type}
                    onChange={handleInputChange}
                  >
                    <option value={"Dog"}>Dog</option>
                    <option value={"Cat"}>Cat</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group>
                  <Form.Label className="mt-2">Choose Breed</Form.Label>
                  <Form.Select
                    name="breed"
                    value={newPet.breed}
                    onChange={handleInputChange}
                    disabled={!newPet.type}
                  >
                    <option value="">Select a breed</option>
                    {breeds[newPet.type]?.map((breed) => (
                      <option key={breed} value={breed}>
                        {breed}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <Form.Group>
                  <Form.Label className="mt-2">Enter Date of Birth</Form.Label>
                  <Form.Control
                    type="Date"
                    name="dob"
                    value={newPet.dob}
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
                <Form.Group>
                  <Form.Label className="mt-2">Enter Color</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter color"
                    name="color"
                    value={newPet.color}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label className="mt-2">Microchipped Status</Form.Label>
                  <Form.Select
                    name="is_microchipped"
                    value={newPet.is_microchipped}
                    onChange={handleInputChange}
                  >
                    <option value="1">Yes</option>
                    <option value="0">No</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group>
                  <Form.Label className="mt-2">
                    Spayed/Neutered Status
                  </Form.Label>
                  <Form.Select
                    name="is_spayed_neutered"
                    value={newPet.is_spayed_neutered}
                    onChange={handleInputChange}
                  >
                    <option value="1">Yes</option>
                    <option value="0">No</option>
                  </Form.Select>
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

            {/* Image Upload Section */}
            {/* <Col
              md={6}
              className="d-flex align-items-start justify-content-center"
            >
              <div className="image-upload-container text-center">
                <div className="image-box position-relative">
                  <img
                    src={imagePreview || previewImage}
                    alt="Pet Profile"
                    className="img-fluid rounded"
                    style={{
                      width: "100%",
                      maxHeight: "250px",
                      objectFit: "cover",
                    }}
                  />
                  <Button
                    variant="primary"
                    className="position-absolute bottom-0 end-0 m-2"
                    onClick={() =>
                      document.getElementById("imageUpload").click()
                    }
                  >
                    Upload Image
                  </Button>
                  <input
                    type="file"
                    id="imageUpload"
                    style={{ display: "none" }}
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </div>
              </div>
            </Col> */}
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
                        ?.filter((pet) => pet.animal_type === "Dog")
                        .map((pet) => (
                          <Col md={4} key={pet.id}>
                            <Card className="pet-card mb-4">
                              <Card.Body>
                                <Row>
                                  <Col
                                    xs={4}
                                    className="d-flex justify-content-center align-items-center"
                                  >
                                    <img
                                      src={pet.pet_image || previewImage} // Fallback to previewImage if no pet_image
                                      alt={pet.name}
                                      className="pet-image img-fluid rounded"
                                      style={{
                                        maxWidth: "100%",
                                        maxHeight: "150px",
                                        objectFit: "cover",
                                      }}
                                    />
                                  </Col>

                                  <Col xs={8}>
                                    <h5 className="pet-info fw-bold">
                                      {getDisplayText(pet.name, "Unnamed")}
                                    </h5>
                                    <p className="pet-info">{`${getDisplayText(
                                      pet.breed,
                                      "Unknown Breed"
                                    )}, ${getDisplayText(
                                      calculateAge(pet.dob),
                                      "Unknown"
                                    )}`}</p>

                                    <div className="d-flex justify-content-between align-items-center mt-3">
                                      <Link
                                        to={`/viewpets/${pet.id}`}
                                        className="view-btn"
                                      >
                                        View
                                      </Link>
                                      <Button
                                        variant="danger"
                                        onClick={() =>
                                          handleDeleteMember(pet.id)
                                        }
                                      >
                                        <img
                                          src={deleteIcon}
                                          alt="Delete"
                                          width={22}
                                        />
                                      </Button>
                                    </div>
                                  </Col>
                                </Row>
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
                                <Row>
                                  <Col
                                    xs={4}
                                    className="d-flex justify-content-center align-items-center"
                                  >
                                    <img
                                      src={pet.pet_image || previewImage}
                                      alt={pet.name}
                                      className="pet-image img-fluid rounded"
                                      style={{
                                        maxWidth: "100%",
                                        maxHeight: "150px",
                                        objectFit: "cover",
                                      }}
                                    />
                                  </Col>
                                  <Col xs={8}>
                                    <h5 className="pet-info fw-bold">
                                      {getDisplayText(pet.name, "Unnamed")}
                                    </h5>
                                    <p className="pet-info">{`${getDisplayText(
                                      pet.breed,
                                      "Unknown Breed"
                                    )}, ${getDisplayText(
                                      calculateAge(pet.dob),
                                      "Unknown"
                                    )}`}</p>

                                    {/* Buttons Section (View and Delete on same line, opposite ends) */}
                                    <div className="d-flex justify-content-between align-items-center mt-3">
                                      <Link
                                        to={`/viewpets/${pet.id}`}
                                        // component={ViewPets}
                                        className="view-btn"
                                      >
                                        View
                                      </Link>
                                      <Button
                                        variant="danger"
                                        onClick={() =>
                                          handleDeleteMember(pet.id)
                                        }
                                      >
                                        <img
                                          src={deleteIcon}
                                          alt="Delete"
                                          width={22}
                                        />
                                      </Button>
                                    </div>
                                  </Col>
                                </Row>
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
      </Container>

      {/* Confirmation Modal */}
      <CustomModal
        show={showModal}
        title="Confirm Deletion"
        message="Are you sure you want to delete this pet?"
        onClose={() => setShowModal(false)}
        onConfirm={confirmDeletePet}
        showConfirm={true}
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
      />
    </div>
  );
};

export default ManagePets;
