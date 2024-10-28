// src/components/Profile.js
import React, { useState } from 'react';
import './Profile.css'; 
import 'bootstrap/dist/css/bootstrap.min.css';  // Import Bootstrap
import { Form, Button } from 'react-bootstrap'; // Import Form and Button from react-bootstrap

const Profile = () => {
  const [profile, setProfile] = useState({
    firstName: "Kelsie",
    surname: "Lexington",
    gender: "Female",
    dob: "12-02-2001",
    petsOwned: 3,
    email: "kelsie.lexie@gmail.com",
    phoneNumber: "+1 436578788771",
    country: "",
    city: "Waterloo"
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Profile updated:", profile);
  };

  const handleResetPassword = () => {
    // Logic to reset password goes here
    console.log("Reset password functionality to be implemented");
  };

  return (
    <div>
      {/* Main Content */}
      <div className="container">
        {/* Profile Info */}
        <div className="row mb-4">
          <div className="col-md-12">
            <div className="card profile-card p-2">
              <div className="row g-0">
                <div className="col-md-3 text-center">
                  <img
                    src="https://mighty.tools/mockmind-api/content/human/55.jpg" // Replace with the actual image path
                    alt="Profile"
                    className="profile-pic mb-3"
                  />
                </div>
                <div className="col-md-9 d-flex flex-column justify-content-center">
                  <h5 className="card-title">Kelsie Lexington</h5>
                  <p className="card-text">
                    <i className="bi bi-gender-female icon-style"></i>Female
                  </p>
                  <p className="card-text"><i className="bi bi-envelope-fill icon-style"></i>{profile.email}</p>
                  <p className="card-text"><i className="bi bi-geo-alt-fill icon-style"></i>887 Northlake Place, Waterloo, ON, CA</p>
                  <p className="card-text"><i className="bi bi-emoji-smile-fill icon-style"></i> 12 Pet Events Attended</p>
                  <div className="d-flex flex-wrap">
                    <button className="btn btn-secondary me-2">4 Pets</button>
                    <button className="btn btn-primary me-2">Add More+</button>
                    <button className="btn btn-primary">Manage Pets</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Edit Form */}
        <div className="row">
          <div className="col-md-12">
            <div className="card p-3">
              <div className="card-body">
                <h5 className="card-title">Edit Profile</h5>
                <p className="text-muted">Last Edited On: 12-02-2001</p>

                <Form className="row g-3" onSubmit={handleSubmit}>
                  <Form.Group className="col-md-6" controlId="formFirstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="firstName"
                      value={profile.firstName}
                      onChange={handleInputChange}
                    />
                  </Form.Group>

                  <Form.Group className="col-md-6" controlId="formSurname">
                    <Form.Label>Surname</Form.Label>
                    <Form.Control
                      type="text"
                      name="surname"
                      value={profile.surname}
                      onChange={handleInputChange}
                    />
                  </Form.Group>

                  <Form.Group className="col-md-6" controlId="formGender">
                    <Form.Label>Gender</Form.Label>
                    <Form.Control
                      type="text"
                      value={profile.gender}
                      disabled
                    />
                  </Form.Group>

                  <Form.Group className="col-md-6" controlId="formDob">
                    <Form.Label>Date of Birth</Form.Label>
                    <Form.Control
                      type="text"
                      value={profile.dob}
                      disabled
                    />
                  </Form.Group>

                  <Form.Group className="col-md-6" controlId="formPetsOwned">
                    <Form.Label>Pets Owned</Form.Label>
                    <Form.Control
                      type="number"
                      value={profile.petsOwned}
                      disabled
                    />
                  </Form.Group>

                  <Form.Group className="col-md-6" controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={profile.email}
                      disabled
                    />
                  </Form.Group>

                  <Form.Group className="col-md-6" controlId="formPhoneNumber">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                      type="text"
                      name="phoneNumber"
                      value={profile.phoneNumber}
                      onChange={handleInputChange}
                    />
                  </Form.Group>

                  <Form.Group className="col-md-6" controlId="formCountry">
                    <Form.Label>Country</Form.Label>
                    <Form.Select
                      name="country"
                      value={profile.country}
                      onChange={handleInputChange}
                    >
                      <option>Select Country</option>
                      <option value="Canada">Canada</option>
                      <option value="USA">USA</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="col-md-6" controlId="formCity">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                      type="text"
                      name="city"
                      value={profile.city}
                      onChange={handleInputChange}
                    />
                  </Form.Group>

                  <div className="col-12">
                    <Button type="submit" className="btn btn-danger me-2">
                      Save Changes
                    </Button>
                    <Button type="button" className="btn btn-secondary" onClick={handleResetPassword}>
                      Reset Password
                    </Button>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default Profile;
