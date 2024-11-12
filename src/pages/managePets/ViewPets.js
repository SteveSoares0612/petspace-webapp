import React, { useEffect } from "react";
import { Breadcrumb, Container } from "react-bootstrap";
import { Link, useParams } from "react-router-dom"; 
import { useAuth } from "../../context/AuthContext";


function ViewPets() {
  // Retrieve pet id from the URL params
  const { id } = useParams();
  const { petDetails, getPetDetails } = useAuth()

  useEffect(() => {
    getPetDetails(id); // Trigger the API call from context
  }, [id]); 
  return (
    <Container className="mt-4">
      <Breadcrumb>
        <Breadcrumb.Item href="/home">Home</Breadcrumb.Item>
        <Breadcrumb.Item href="/managepets">Manage Pets</Breadcrumb.Item>
        <Breadcrumb.Item active>View Pet </Breadcrumb.Item>
      </Breadcrumb>

      {/* Render pet details once fetched */}
      {petDetails && (
        <div>
          <h2>Pet Details for Pet {id}</h2>
          <p>Name: {petDetails.name}</p>
          <p>Breed: {petDetails.breed}</p>
          <p>Age: {petDetails.age}</p>
          {/* Render more pet details as needed */}
        </div>
      )}
    </Container>
  );
}

export default ViewPets;
