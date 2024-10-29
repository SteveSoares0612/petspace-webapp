import React, { useState,useEffect } from 'react';
import { Container, Row, Col, Button, Form, Image } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import { FiEdit } from 'react-icons/fi';


function Family() {
    const { isAuthenticated, user } = useAuth();

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
    // try {
    //   await updateUser({
    //     first_name: firstName,
    //     last_name: lastName,
    //     gender,
    //     dob,
    //     // phone,
    //     // address,
    //     // province,
    //     // pets_owned: petsOwned,
    //   });
    //   alert("Profile updated successfully!");
    //   window.location.reload(); // Refresh the page after save
    // } catch (error) {
    //   alert("Failed to update profile");
    // }
  };

    return (
        <Container className="p-4 mt-3 ms-0">
            <Row>
                <Col className="d-flex justify-content-between align-items-center">
                    <h2>My Family</h2>
                </Col>
            </Row>
            
          {/* Family Info Section */}
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
              
            </Row>
          </Row>
        </Container>
      );
}

export default Family;
