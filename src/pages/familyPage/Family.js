import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  Form,
  Modal,
} from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";
import "../managePets/ManagePets.css";

function Family() {
  const {
    familyMembers,
    getFamilyMembers,
    addFamilyMember,
    deleteFamilyMember,
  } = useAuth();
  const [showAddMemberForm, setShowAddMemberForm] = useState(false);
  const [newMemberEmail, setNewMemberEmail] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState(null);

  useEffect(() => {
    const fetchFamilyMembers = async () => {
      try {
        await getFamilyMembers();
      } catch (error) {
        console.error("Failed to fetch family members:", error);
      }
    };

    fetchFamilyMembers();
  }, []);

  const handleCancel = () => {
    setShowAddMemberForm(false);
  };

  const handleAddMemberClick = () => {
    setShowAddMemberForm(true);
  };

  const handleSaveMember = async () => {
    if (newMemberEmail) {
      try {
        await addFamilyMember(newMemberEmail);
        setShowAddMemberForm(false);
        setNewMemberEmail("");
        getFamilyMembers();
      } catch (error) {
        alert("Failed to add family member.");
      }
    } else {
      alert("Please enter an email address.");
    }
  };

  const handleDeleteMember = (id) => {
    setMemberToDelete(id);
    setShowModal(true);
  };

  const confirmDeleteMember = async () => {
    if (memberToDelete) {
      try {
        await deleteFamilyMember(memberToDelete);
        setShowModal(false); // Close the modal
        setMemberToDelete(null); // Clear the member to delete
        await getFamilyMembers(); // Refresh the family members list
      } catch (error) {
        alert("Failed to delete family member.");
      }
    }
  };

  return (
    <div className="manage-pets">
      <Container>
        <Row className="d-flex justify-content-between align-items-center">
          <Col className="d-flex align-items-center">
            <h2>My Family</h2>
          </Col>
          <Col className="d-flex justify-content-end align-items-center">
            <Button
              variant="primary"
              onClick={handleAddMemberClick}
              className="ms-auto"
            >
              Add Member
            </Button>
          </Col>
        </Row>

        {showAddMemberForm ? (
          <Row className="mt-3">
            <Col md={6} className="text-start">
              <Form>
                <Form.Group controlId="memberEmail">
                  <Form.Label>Enter Member Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={newMemberEmail}
                    onChange={(e) => setNewMemberEmail(e.target.value)}
                  />
                </Form.Group>
                <Button
                  variant="light"
                  onClick={handleCancel}
                  className="mt-3 me-3"
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  onClick={handleSaveMember}
                  className="mt-3"
                >
                  Save Member
                </Button>
              </Form>
            </Col>
          </Row>
        ) : (
          <Row className="mt-3">
            {familyMembers.length > 0 ? (
              familyMembers.map((member) => (
                <Col md={4} key={member.id}>
                  <Card className="pet-card mb-4">
                    <Card.Body>
                      <div className="d-flex align-items-center">
                        <div className="pet-image-col">
                          <img
                            src={"https://media.istockphoto.com/id/1171169127/photo/headshot-of-cheerful-handsome-man-with-trendy-haircut-and-eyeglasses-isolated-on-gray.jpg?s=612x612&w=0&k=20&c=yqAKmCqnpP_T8M8I5VTKxecri1xutkXH7zfybnwVWPQ="} // Ensure you have a valid image source
                            alt={member.name}
                            className="rounded-circle pet-image"
                            style={{ width: "5rem", height: "5rem" }}
                          />
                        </div>
                        <div className="pet-text-col ms-3">
                          <h5 className="pet-info">
                            {member.first_name} {member.last_name}
                          </h5>
                          <p className="pet-info">{member.email}</p>
                          <div className="pet-actions">
                            <Button
                              variant="danger"
                              onClick={() => handleDeleteMember(member.id)}
                            >
                              Delete
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            ) : (
              <Col className="text-center mt-4">
                <p>
                  No family members found. Click "Add Member" to add a family
                  member.
                </p>
              </Col>
            )}
          </Row>
        )}

        {/* Confirmation Modal */}
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Deletion</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to remove this user from your family? This
            action can be reversed, and the user can be added back at any time.
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={confirmDeleteMember}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
}

export default Family;
