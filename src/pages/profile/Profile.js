import React, { useState,useEffect } from 'react';
import { Container, Row, Col, Button, Form, Image } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import { FiEdit } from 'react-icons/fi'; // Import the edit icon



function Profile() {
  const { isAuthenticated, user, updateUser } = useAuth();

  // State for form fields
  const [firstName, setFirstName] = useState(user.first_name || '');
  const [lastName, setLastName] = useState(user.last_name || '');
  const [gender, setGender] = useState(user.gender || '');
  const [dob, setDob] = useState(user.dob || '');
  // const [phone, setPhone] = useState(user.phone || '');
  // const [address, setAddress] = useState('887 Northlake Place, Waterloo'); 
  // const [province, setProvince] = useState('ON'); 
  // const [petsOwned, setPetsOwned] = useState('3');
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = async () => {
    try {
      await updateUser({
        first_name: firstName,
        last_name: lastName,
        gender,
        dob,
        // phone,
        // address,
        // province,
        // pets_owned: petsOwned,
      });
      alert("Profile updated successfully!");
      window.location.reload(); // Refresh the page after save
    } catch (error) {
      alert("Failed to update profile");
    }
  };

  return (
    <Container className="p-4 mt-3 ms-0">
            <Row>
                <Col className="d-flex justify-content-between align-items-center">
                    <h2>My Profile</h2>
                </Col>
            </Row>
      {/* Profile Info Section */}
      <Row>
        <Col md={2} className="text-center me-5 mt-4">
          <Image src="https://img.freepik.com/free-photo/close-up-young-person-barbeque_23-2149271990.jpg" roundedCircle width={210} height={190} />
        </Col>
        <Col md={8} className="text-start mt-4">
          <h2>{user.first_name} {user.last_name}</h2>
          <p>Female<br />{user.email}<br />{'user.address'}<br />12 Pet Events Attended</p>
          <Button className="me-2 custom">4 Pets</Button>
          <Button variant="danger" className="me-2">Add More+</Button>
          <Button variant="secondary">Manage Pets</Button>
        </Col>
        <Row>
          <Col md={12}>
            <h3 className="mt-5">Edit Profile  
              <Button variant="link" onClick={handleEdit} className="mb-2">
                <FiEdit size={20} />
              </Button></h3>
            <Form className="mt-3">
              <Row>
                <Col md={6}>
                  <h6 className="text-muted fw-bold">Personal Information</h6>
                  <Row md={12}>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label className="mt-2">First Name</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter First Name"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          disabled={!isEditing}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label className="mt-2">Surname</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter Last Name"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          disabled={!isEditing}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                </Col>
                <Col md={6}>
                  <h6 className="text-muted fw-bold">Contact Information</h6>
                  <Form.Group>
                    <Form.Label className="mt-2">Email</Form.Label>
                    <Form.Control type="email" placeholder={user.email} value={user.email} disabled={!isEditing} />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="mt-2">Gender</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Gender"
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      disabled={!isEditing}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="mt-2">Date of Birth</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter DOB"
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                      disabled={!isEditing}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="mt-2">Address</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Address"
                      // value={address}
                      // onChange={(e) => setAddress(e.target.value)}
                      disabled={!isEditing}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="mt-2">Province</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Province"
                      // value={province}
                      // onChange={(e) => setProvince(e.target.value)}
                      disabled={!isEditing}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="mt-2">Pets Owned</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Pets Owned"
                      // value={petsOwned}
                      // onChange={(e) => setPetsOwned(e.target.value)}
                      disabled={!isEditing}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="mt-2">Phone Number</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter phone number"
                      // value={phone}
                      // onChange={(e) => setPhone(e.target.value)}
                      disabled={!isEditing}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
              <Button variant="danger" className="mt-3" onClick={handleSave} disabled={!isEditing} >Save</Button>
              </Row>
              {/* <Button variant="outline-danger" className="me-2 mt-3">Reset Password</Button> */}
             
            </Form>
          </Col>
        </Row>
      </Row>
    </Container>
  );
}

export default Profile;
