import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  Image,
  Spinner,
} from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";
import { FiEdit } from "react-icons/fi";

function Profile() {
  const { user, updateUser } = useAuth();

  // State for form fields
  const [firstName, setFirstName] = useState(user.first_name || "");
  const [lastName, setLastName] = useState(user.last_name || "");
  const [dob, setDob] = useState(user.dob || "");
  const [email, setEmail] = useState(user.email || "null");
  const [phone, setPhone] = useState(user.phone || "null");
  const [addressStreetName, setAddressStreetName] = useState(
    user.address.street_name || "null"
  );
  const [addressCity, setAddressCity] = useState(
    user.address.city || "null"
  );
  const [addressProvince, setAddressProvince] = useState(
    user.address.province || "null"
  );
  const [addressPostalCode, setAddressPostalCode] = useState(
    user.address.postal_code || "null"
  );
  const [addressCountry, setAddressCountry] = useState(
    user.address.country || "null"
  );
  const [petsOwned, setPetsOwned] = useState(user.pets_count || 0);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const provinces = [
    { value: "AB", label: "Alberta" },
    { value: "BC", label: "British Columbia" },
    { value: "MB", label: "Manitoba" },
    { value: "NB", label: "New Brunswick" },
    { value: "NL", label: "Newfoundland and Labrador" },
    { value: "NS", label: "Nova Scotia" },
    { value: "ON", label: "Ontario" },
    { value: "PE", label: "Prince Edward Island" },
    { value: "QC", label: "Quebec" },
    { value: "SK", label: "Saskatchewan" },
    { value: "NT", label: "Northwest Territories" },
    { value: "NU", label: "Nunavut" },
    { value: "YT", label: "Yukon" },
  ];

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await updateUser({
        first_name: firstName,
        last_name: lastName,
        email: email,
        phone: phone ? phone : "null",
        address_street_name: addressStreetName,
        address_city: addressCity,
        address_province: addressProvince,
        address_postal_code: addressPostalCode,
        address_country: addressCountry,
      });
      alert("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      alert("Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container className="p-4">
      {/* Profile Info Section */}
      <Row>
        <Col md={2} className="text-center me-5 mt-4">
          <Image
            src="https://img.freepik.com/free-photo/close-up-young-person-barbeque_23-2149271990.jpg"
            roundedCircle
            width={210}
            height={190}
          />
        </Col>
        <Col md={8} className="text-start mt-4">
          <h2>
            {user.first_name} {user.last_name}
          </h2>
          <p>
            {user.email}
            <br />
            {/* Display Address Info Properly */}
            {user.address && `${user.address.street_name}, ${user.address.city}, ${user.address.province}, ${user.address.postal_code}, ${user.address.country}`}
          </p>
          <a href="#" className="view-btn">{`${petsOwned} Pets`}</a>
          <Button variant="secondary" href="/managepets">
            Manage Pets
          </Button>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <h3 className="mt-5">
            Edit Profile
            <Button variant="link" onClick={handleEdit} className="mb-2">
              <FiEdit size={20} />
            </Button>
          </h3>
          <Form className="mt-3">
            {/* Personal Information */}
            <Row>
              <Col md={6}>
                <h6 className="text-muted fw-bold">Personal Information</h6>
                <Form.Group>
                  <Form.Label className="mt-2">First Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    disabled={!isEditing}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label className="mt-2">Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    disabled={!isEditing}
                  />
                </Form.Group>
              </Col>

              {/* Contact Information */}
              <Col md={6}>
                <h6 className="text-muted fw-bold">Contact Information</h6>
                <Form.Group>
                  <Form.Label className="mt-2">Email</Form.Label>
                  <Form.Control type="email" value={email} disabled />
                </Form.Group>
                <Form.Group>
                  <Form.Label className="mt-2">Phone Number</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder={
                      phone === "null"
                        ? "Enter Phone Number"
                        : phone
                    }
                    value={phone  === "null" ? "" : phone}
                    onChange={(e) => setPhone(e.target.value)}
                    disabled={!isEditing}
                  />
                </Form.Group>
              </Col>
            </Row>

            {/* Address Information */}
            <Row>
              <Col md={12}>
                <h6 className="text-muted fw-bold mt-3">Address Information</h6>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="mt-2">Address 1</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder={
                      addressStreetName === "null"
                        ? "Enter Street Name"
                        : addressStreetName
                    }
                    value={addressStreetName === "null" ? "" : addressStreetName}
                    onChange={(e) => setAddressStreetName(e.target.value)}
                    disabled={!isEditing}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="mt-2">City</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder={
                      addressCity === "null"
                        ? "Enter City"
                        : addressCity
                    }
                    value={addressCity === "null" ? "" : addressCity}
                    onChange={(e) => setAddressCity(e.target.value)}
                    disabled={!isEditing}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="mt-2">Province</Form.Label>
                  <Form.Control
                    as="select"
                    value={addressProvince}
                    onChange={(e) => setAddressProvince(e.target.value)}
                    disabled={!isEditing}
                  >
                    <option value="">Select Province</option>
                    {provinces.map((province) => (
                      <option key={province.value} value={province.value}>
                        {province.label}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="mt-2">Postal Code</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder={
                      addressPostalCode === "null"
                        ? "Enter Postal Code"
                        : addressPostalCode
                    }
                    value={
                      addressPostalCode === "null" ? "" : addressPostalCode
                    }
                    onChange={(e) => setAddressPostalCode(e.target.value)}
                    disabled={!isEditing}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="mt-2">Country</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder={
                      addressCountry === "null"
                        ? "Enter Country"
                        : addressCountry
                    }
                    value={addressCountry === "null" ? "" : addressCountry}
                    onChange={(e) => setAddressCountry(e.target.value)}
                    disabled={!isEditing}
                  />
                </Form.Group>
              </Col>
            </Row>

            {/* Pet Information */}
            <Row>
              <Col md={12}>
                <h6 className="text-muted fw-bold mt-3">Pet Information</h6>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="mt-2">Pets Owned</Form.Label>
                  <Form.Control
                    type="text"
                    value={petsOwned === "null" ? "No pets added" : petsOwned}
                    disabled
                  />
                </Form.Group>
              </Col>
            </Row>

            {/* Save Button */}
            <Row>
              <Button
                variant="danger"
                className="mt-3"
                onClick={handleSave}
                disabled={!isEditing}
              >
                {isLoading ? <Spinner /> : "Save"}
              </Button>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Profile;
