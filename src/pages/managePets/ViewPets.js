import React, { useState, useEffect, Redirect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Tabs,
  Tab,
  Table,
  Badge,
  Modal,
  Form,
  Breadcrumb,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  FaMapMarkerAlt,
  FaNotesMedical,
  FaCalendar,
  FaPlus,
  FaUpload,
  FaEdit,
  FaTrash,
} from "react-icons/fa";

import { Link, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import previewImage from "../../assets/images/previewImage.jpg";
import CustomModal from "../../components/CustomModal";
import "./ManagePets.css";

function ViewPets() {
  // Retrieve pet id from the URL params

  const { id } = useParams();
  const {
    user,
    updatePet,
    petDetails,
    getPetDetails,
    uploadPetImage,
    allergenList,
    addPetAllergen,
    getPetAllergens,
    petAllergies,
    addPetSpecCondition,
    getSpecConditionList,
    specialConditionList,
    deletePetAllergen,
    deletePetSpecCondition,
    getVets,
    fetchVetSchedule,
    bookAppointment,
    getPetAppointments,
    deletePetAppointment,
  } = useAuth();

  const [petName, setPetname] = useState();
  const [dob, setDob] = useState("Unknown");
  const [gender, setGender] = useState("Unknown");
  const [color, setColor] = useState("Unknown");
  const [isMicrochipped, setIsMicrochipped] = useState(false);
  const [isSpayedNeutered, setIsSpayedNeutered] = useState(false);
  const [petBreed, setPetBreed] = useState("Unknown");
  const [isEditing, setIsEditing] = useState(false);
  const [petType, setPetType] = useState("Unkown");
  const [bio, setBio] = useState(null);
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [attachments, setAttachments] = useState([]);
  const [selectedFile, setSelectedFile] = useState(previewImage);

  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [modalData, setModalData] = useState({
    id: null,
    name: "", //  for reminders
    allergen: "", // for allergies
    condition: "",
    description: "",
    date: "",
  });
  const [editIndex, setEditIndex] = useState(null);
  const [allergies, setAllergies] = useState([]);
  const [specialConditions, setSpecialConditions] = useState([]);
  const [allergenID, setAllergenID] = useState();
  const [specialCondition, setSpecialCondition] = useState();
  const [vets, setVets] = useState();
  const [vetSchedule, setVetSchedule] = useState([]);
  const [selectedVet, setSelectedVet] = useState(null);
  const [selectedScheduleId, setSelectedScheduleId] = useState(null);
  const [showErrorModal, setShowErrorModal] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // New state for reschedule modal
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [rescheduleIndex, setRescheduleIndex] = useState(null);
  const [rescheduleData, setRescheduleData] = useState({ date: "", time: "" });

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getPetDetails(id);
        await getPetAllergens(id);
        await getSpecConditionList(id);
        // await getPetAppointments(id);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const appointmentsList = await getPetAppointments(id);
        console.log("Fetched Appointments:", appointmentsList);
        setAppointments(appointmentsList || []);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    if (petAllergies) {
      setAllergies(petAllergies);
    }
    if (specialConditionList) {
      setSpecialConditions(specialConditionList);
    }
  }, [petAllergies, specialConditionList]);

  useEffect(() => {
    if (petDetails) {
      setPetname(petDetails.name || "Unknown");
      setPetBreed(petDetails.breed || "Unknown");
      setDob(petDetails.dob || "Unknown");
      setGender(petDetails.gender || "Unknown");
      setColor(petDetails.color || "Unknown");
      setIsMicrochipped(petDetails.is_microchipped);
      setIsSpayedNeutered(petDetails.is_spayed_neutered);
      setPetType(petDetails.animal_type || "Unknown");
      setBio(petDetails.bio);
      setSelectedFile(
        petDetails.pet_image == null ? previewImage : petDetails.pet_image
      );
    }
  }, [petDetails]);

  useEffect(() => {
    if (allergenList) {
      console.log(allergenList);
    }
  }, [allergenList]);

  const [reminders, setReminders] = useState([
    {
      name: "Aspirin",
      description: "500mg BAYER, 1 tablet",
      date: "Everyday, 22:00",
    },
    { name: "Walk", description: "1 hour", date: "Everyday, 22:00" },
    { name: "Brush", description: "1 hour", date: "Everyday, 22:00" },
  ]);
  const [appointments, setAppointments] = useState([]);

  const addAppointment = (newAppointment) => {
    setAppointments((prevAppointments) => [
      ...prevAppointments,
      newAppointment,
    ]);
  };

  const handleShowModal = (type, index = null) => {
    setModalType(type);
    setEditIndex(index);

    if (index !== null) {
      const dataArray = getDataArray(type);
      const item = dataArray[index];
      setModalData({
        ...modalData,
        id: item.id,
        name:
          type === "allergy"
            ? item.allergen
            : type === "specialCondition"
            ? item.condition
            : item.name,
      });
    } else {
      setModalData({
        id: null,
        name: "",
        allergen: "",
        condition: "",
        description: "",
        date: "",
      });
    }
    setShowModal(true);
  };

  useEffect(() => {
    if (allergies && allergenID) {
      addPetAllergen(id, allergenID);
    }
    if (specialCondition) {
      addPetSpecCondition(id, specialCondition, "");
    }
  }, [allergies, allergenID, specialCondition]);

  const handleCloseModal = () => {
    setShowModal(false);
    setModalData({ name: "", description: "", date: "" });
    setEditIndex(null);
  };

  const getDataArray = (type) => {
    if (type === "allergy") return allergies;
    if (type === "specialCondition") return specialConditions;
    if (type === "reminder") return reminders;
  };

  const handleSaveModal = () => {
    if (modalType === "specialCondition") {
      const updatedConditions = [...specialConditions];

      if (editIndex === null) {
        // Add new condition
        updatedConditions.push({
          id: Date.now(), // Generate a unique ID for new condition
          condition: modalData.name, // Directly save text from input
        });
        setSpecialCondition(modalData.name);
      } else {
        // Update existing condition
        updatedConditions[editIndex].condition = modalData.name;
      }
      setSpecialConditions(updatedConditions);
    } else if (modalType === "allergy") {
      const selectedAllergen = allergenList.find(
        (opt) => opt.id === modalData.id
      );
      if (!selectedAllergen) return;
      const allergenExists = allergies.some((a) => a.id === modalData.id);
      if (allergenExists) {
        handleCloseModal();
        return;
      }
      const updatedAllergies = [...allergies];
      if (editIndex === null) {
        // Add new allergy
        updatedAllergies.push({
          id: modalData.id,
          allergen: selectedAllergen.allergen,
        });
        setAllergenID(modalData.id);
      }
      setAllergies(updatedAllergies);
    }

    handleCloseModal();
  };

  const handleDeleteAllergy = (allergyId) => {
    deletePetAllergen(id, allergyId);
  };

  const handleDeleteCondition = (conditionId) => {
    deletePetSpecCondition(id, conditionId);
  };

  const handleDeleteAppointment = async (appointmentID) => {
    try { 
      await deletePetAppointment(id, appointmentID);
      setAppointments((prevAppointments) =>
        prevAppointments.filter((appointment) => appointment.id !== appointmentID)
      );
      console.log(`Appointment with ID ${appointmentID} deleted successfully.`);
    } catch (error) {
      console.error("Error deleting appointment:", error);
      setModalMessage("Failed to delete the appointment. Please try again.");
      setShowErrorModal(true);
    }
  };
  
  const handleSave = async () => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("pet_owner_id", user.id);
      formData.append("breed", petBreed);
      formData.append("animal_type", petType);
      formData.append("dob", dob);
      formData.append("color", color ? color : "null");
      formData.append("gender", gender);
      formData.append("name", petName);
      formData.append("id", id);
      formData.append(
        "is_spayed_neutered",
        isSpayedNeutered ? isSpayedNeutered : "0"
      );
      formData.append("is_microchipped", isMicrochipped ? isMicrochipped : "0");
      formData.append("bio", String(bio));

      await updatePet(formData);
      setModalMessage("Pet profile updated successfully!");
      setShowConfirmModal(true);
    } catch (error) {
      console.log(error);
      alert("Failed to update pet profile", error);
    } finally {
      setIsLoading(false);
      setIsEditing(false);
      setIsEditingBio(false);
    }
  };

  // Appointment form states
  const [appointmentDetails, setAppointmentDetails] = useState({
    reason: "",
    date: "",
    time: "",
    vet: "",
    address: "",
  });

  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleFileUpload = () => {
    if (file) {
      const newAttachment = {
        name: file.name,
        date: new Date().toLocaleDateString(), // Current date in 'MM/DD/YYYY' format
        file: file,
      };
      setAttachments((prevAttachments) => [...prevAttachments, newAttachment]);
      setFile(null);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAppointmentDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
    if (name === "vet") {
      const selectedVet = vets.find((vet) => vet.name === value);
      setAppointmentDetails((prevDetails) => ({
        ...prevDetails,
        address: selectedVet ? selectedVet.address : "",
      }));
    }
  };

  // Function to handle rescheduling
  const handleReschedule = (index) => {
    setRescheduleIndex(index);
    const appointment = appointments[index];
    const [date, time] = appointment.date.split(" - ");
    setRescheduleData({ date, time });
    setShowRescheduleModal(true);
  };

  const formatTime = (time) => {
    const [hours, minutes] = time.split(":");
    const date = new Date();
    date.setHours(hours, minutes);

    return date.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true, // Convert to AM/PM format
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedFile(reader.result);
      };
      reader.readAsDataURL(file);
      setSelectedFile(file);
      uploadPetImage(file, id); // Call the upload function
    }
  };

  const handleOpenForm = async (petId) => {
    const vetsList = await getVets(petId);
    setVets(vetsList || []);
    setShowForm(true);
  };

  const handleVetChange = async (e) => {
    const vetId = e.target.value;
    setSelectedVet(vetId);
    setAppointmentDetails((prev) => ({ ...prev, vet: vetId }));

    if (vetId) {
      try {
        const schedule = await fetchVetSchedule(id, vetId); // Call the context function
        setVetSchedule(schedule); // Update state with fetched schedule
      } catch (error) {
        console.error("Failed to fetch vet schedule", error);
      }
    }
  };

  const handleCardSelect = (scheduleId) => {
    setSelectedScheduleId(scheduleId);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!selectedScheduleId) {
      setShowErrorModal(true);
      return;
    }
  
    try {
      const newAppointment = await bookAppointment(
        id,
        selectedScheduleId,
        appointmentDetails.reason
      );
  
      // Log the new appointment to verify its structure
      console.log("New Appointment:", newAppointment);
  
      // Dynamically add the new appointment to the state
      setAppointments((prevAppointments) => [...prevAppointments, newAppointment]);
  
      // Reset the form and close it
      setAppointmentDetails({
        reason: "",
        date: "",
        time: "",
        vet: "",
        address: "",
      });
      setSelectedScheduleId(null);
      setShowForm(false);
  
      setModalMessage("Appointment booked successfully!");
      setShowConfirmModal(true);
    } catch (error) {
      console.error("Error booking appointment:", error);
      setModalMessage("Failed to book the appointment. Please try again.");
      setShowErrorModal(true);
    }
  };
  
  

  return (
    <Container className="my-3">
      <Breadcrumb>
        <Breadcrumb.Item href="/home">Home</Breadcrumb.Item>
        <Breadcrumb.Item href="/managepets">Manage Pets</Breadcrumb.Item>
        <Breadcrumb.Item active>View Pet </Breadcrumb.Item>
      </Breadcrumb>

      {/* Header Row */}
      <Row className="mb-4">
        <Col md={4}>
          <Card.Img
            variant="top"
            src={selectedFile}
            alt="Pet Image"
            rounded="true"
          />
          <div className="image-upload-container text-center">
            <div className="image-box position-relative">
              <Button
                variant="primary"
                className="bottom-0 m-2"
                onClick={() => document.getElementById("imageUpload").click()}
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
        </Col>
        <Col md={8}>
          {isEditing ? (
            <Form.Group>
              <Form.Label className="mt-2">Enter Name</Form.Label>
              <Form.Control
                placeholder={petName}
                type="text"
                // value={petName}
                onChange={(e) => setPetname(e.target.value)}
              />
            </Form.Group>
          ) : (
            <h2>{petName}</h2>
          )}
          {isEditing ? (
            <Form.Group>
              <Form.Label className="mt-2">Choose Type</Form.Label>
              <Form.Select
                value={petType}
                onChange={(e) => setPetType(e.target.value)}
              >
                <option value={"Dog"}>Dog</option>
                <option value={"Cat"}>Cat</option>
              </Form.Select>
            </Form.Group>
          ) : (
            <p>Type: {petType}</p>
          )}
          {isEditing ? (
            <Form.Group>
              <Form.Label className="mt-2">Enter Breed</Form.Label>
              <Form.Control
                type="text"
                placeholder={petBreed}
                // value={petBreed}
                onChange={(e) => setPetBreed(e.target.value)}
              />
            </Form.Group>
          ) : (
            <p>Breed: {petBreed}</p>
          )}
          {isEditing ? (
            <Form.Group>
              <Form.Label className="mt-2">Enter Date of Birth</Form.Label>
              <Form.Control
                type="Date"
                placeholder={dob}
                value={dob}
                onChange={(e) => setDob(e.target.value)}
              />
            </Form.Group>
          ) : (
            <p>Born: {dob}</p>
          )}
          {isEditing ? (
            <Form.Group>
              <Form.Label className="mt-2">Gender Status</Form.Label>
              <Form.Select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </Form.Select>
            </Form.Group>
          ) : (
            <p>Gender: {gender}</p>
          )}
          {isEditing ? (
            <Form.Group>
              <Form.Label className="mt-2">Enter Color</Form.Label>
              <Form.Control
                type="text"
                placeholder={color}
                // value={color}
                onChange={(e) => setColor(e.target.value)}
              />
            </Form.Group>
          ) : (
            <p>Color: {color}</p>
          )}
          {isEditing ? (
            <Form.Group>
              <Form.Label className="mt-2">Microchipped Status</Form.Label>
              <Form.Select
                value={isMicrochipped}
                onChange={(e) => setIsMicrochipped(e.target.value)}
              >
                <option value={1}>Yes</option>
                <option value={0}>No</option>
              </Form.Select>
            </Form.Group>
          ) : (
            <p>Microchipped Status: {isMicrochipped ? "Yes" : "No"}</p>
          )}

          {isEditing ? (
            <Form.Group>
              <Form.Label className="mt-2">Neutered Status</Form.Label>
              <Form.Select
                value={isSpayedNeutered}
                onChange={(e) => setIsSpayedNeutered(e.target.value)}
              >
                <option value={1}>Yes</option>
                <option value={0}>No</option>
              </Form.Select>
            </Form.Group>
          ) : (
            <p>Neutered Status: {isSpayedNeutered ? "Yes" : "No"}</p>
          )}

          {isEditing ? (
            <Button
              variant="light"
              className="me-3 mt-1"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </Button>
          ) : (
            ""
          )}
          <Button
            variant="primary"
            className="mt-1"
            onClick={isEditing ? () => handleSave() : () => setIsEditing(true)}
          >
            {isEditing ? "Save" : "Edit"}
          </Button>
        </Col>
      </Row>

      {/* Tabs Section */}
      <Tabs defaultActiveKey="overview" id="pet-history-tabs" className="mb-3">
        <Tab eventKey="overview" title="Overview">
          <div className="d-flex align-items-center mt-4">
            <h4 className="mb-0">Bio</h4>
            <FaEdit
              style={{
                marginLeft: "20px",
                cursor: "pointer",
                color: "#DD595D",
              }}
              onClick={() => setIsEditingBio(!isEditingBio)}
            />
          </div>
          {isEditingBio ? (
            <>
              <Form.Control
                as="textarea"
                rows={5}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="mt-2"
              />
              <Button
                variant="outline-secondary"
                onClick={() => handleSave()}
                className="mt-2"
              >
                Save
              </Button>
            </>
          ) : (
            <p className="mt-2">{bio}</p>
          )}
          {/* overview appointment */}
          <Row className="mt-3 g-3">
          
          <h5 className="mb-0">Upcoming Appointments</h5>
            {appointments.filter((appointment) => appointment.status === "confirmed").map((appointment, index) => (
              <Col md={6} key={index}>
                <Card
                  className="rounded-3"
                  style={{
                    backgroundColor: "#FFE782",
                    width: "100%",
                    border: "none",
                  }}
                >
                  <Card.Body>
                    {/* Title */}
                    <Card.Title className="text-dark">
                      {`${appointment.provider_first_name} ${appointment.provider_last_name}`}
                    </Card.Title>

                    {/* Appointment details */}
                    <p style={{ color: "#6f4f37", fontSize: "0.85rem" }}>
                      <FaNotesMedical /> {appointment.notes}
                    </p>
                    <Row className="g-2">
                      <Col xs={6}>
                        <p style={{ color: "#6f4f37", fontSize: "0.85rem" }}>
                          <FaCalendar /> {appointment.schedule_date}
                        </p>
                      </Col>
                      <Col xs={6}>
                        <p
                          className="text-end"
                          style={{ color: "#6f4f37", fontSize: "0.85rem" }}
                        >
                          <FaMapMarkerAlt /> {appointment.location}
                        </p>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Tab>

        <Tab eventKey="history" title="History">
          {/* Allergies */}
          <h5>Allergies</h5>

          <Button
            variant="outline-danger"
            onClick={() => handleShowModal("allergy")}
          >
            <FaPlus /> Add Allergy
          </Button>

          <Row className="flex-wrap mt-3">
            {allergies.length === 0 ? (
              <Col>
                <p className="text-muted">No allergies added yet</p>
              </Col>
            ) : (
              allergies.map((allergy) => (
                <Col sm={4} key={allergy.id} className="mb-2">
                  <Badge
                    bg="white"
                    text="danger"
                    className="p-2 w-100 d-inline-flex justify-content-between align-items-center text-center"
                    style={{ border: "1px solid #ff6b6b", borderRadius: "0px" }}
                  >
                    {/* Allergy text */}
                    <span className="flex-grow-1 text-start">
                      {allergy.allergen}
                    </span>

                    {/* Edit and Delete icons */}
                    <div className="d-flex">
                      {/* Delete icon */}
                      <span
                        onClick={() => handleDeleteAllergy(allergy.allergen_id)}
                        className="ms-2 cursor-pointer text-danger"
                      >
                        <FaTrash style={{ cursor: "pointer" }} />
                      </span>
                    </div>
                  </Badge>
                </Col>
              ))
            )}
          </Row>

          {/* Special Conditions */}
          <h5 className="mt-4">Special Conditions</h5>

          <Button
            variant="outline-danger"
            onClick={() => handleShowModal("specialCondition")}
          >
            <FaPlus /> Add Condition
          </Button>

          <Row className="flex-wrap mt-3">
            {specialConditions.length === 0 ? specialConditions.map((condition, index) => (
              <Col sm={4} key={condition.id} className="mb-2">
                <Badge
                  bg="white"
                  text="danger"
                  className="p-2 w-100 d-inline-flex justify-content-between align-items-center text-center"
                  style={{ border: "1px solid #ff6b6b", borderRadius: "0px" }}
                >
                  <span className="flex-grow-1 text-start">
                    {condition.condition_name}
                  </span>

                  {/* Edit and Delete icons */}
                  <div className="d-flex">
                    <span
                      onClick={() => handleShowModal("specialCondition", index)}
                      className="ms-2 cursor-pointer text-pink"
                    >
                      <FaEdit style={{ cursor: "pointer" }} />
                    </span>
                    <span
                      onClick={() => handleDeleteCondition(condition.id)}
                      className="ms-2 cursor-pointer text-danger"
                    >
                      <FaTrash style={{ cursor: "pointer" }} />
                    </span>
                  </div>
                </Badge>
              </Col>
            )) :  <Col>
            <p className="text-muted">No special conditions added yet</p>
          </Col>}
          </Row>

          

          {/* Attachments */}
          <h5 className="mt-4">Records</h5>

          {/* File Upload Button */}
          <div className="d-flex">
            <Button
              variant="outline-danger"
              className="mb-2"
              onClick={handleFileUpload}
            >
              <FaUpload /> Upload
            </Button>
            {/* File Input */}
            <input type="file" onChange={handleFileChange} className="ms-2" />
          </div>

          {/* Table to display records */}
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Document</th>
                <th>Date Uploaded</th>
                <th>File</th> {/* Added a column for the file itself */}
              </tr>
            </thead>
            <tbody>
              {attachments.map((attachment, index) => (
                <tr key={index}>
                  <td>{attachment.name}</td>
                  <td>{attachment.date}</td>
                  <td>
                    {attachment.file ? (
                      <a href={URL.createObjectURL(attachment.file)} download>
                        Download
                      </a>
                    ) : (
                      <span>No file available</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Tab>
        <Tab eventKey="appointments" title="Appointments">
          <div className="d-flex justify-content-between align-items-center mt-4">
            <h5 className="mb-0">
              {" "}
              {showForm ? "Book Appointment" : "Upcoming Appointments"}{" "}
            </h5>
            <Button
              variant="primary"
              onClick={() => {
                if (!showForm) {
                  handleOpenForm(id);
                } else {
                  setShowForm(false);
                }
              }}
            >
              {showForm ? "Cancel" : "Book Appointment"}{" "}
            </Button>
          </div>

          {/* Show the form when showForm is true */}
          {showForm && (
            <Form
              onSubmit={handleSubmit}
              className="mt-3 p-3 border rounded"
              style={{ background: "#ffffff", border: "2px solid #DD595D" }}
            >
              <Form.Group controlId="formReason" className="mb-3">
                <Form.Label style={{ color: "#DD595D" }}>
                  Reason for Appointment
                </Form.Label>
                <Form.Control
                  as="select"
                  name="reason"
                  value={appointmentDetails.reason}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a reason</option>
                  <option value="My pet is sick">My pet is sick</option>
                  <option value="Physical exam">Physical exam</option>
                  <option value="Vaccines">Vaccines</option>
                  <option value="Reason not listed">Reason not listed</option>
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="formVet" className="mb-3">
                <Form.Label style={{ color: "#DD595D" }}>Select Vet</Form.Label>
                <Form.Control
                  as="select"
                  name="vet"
                  value={appointmentDetails.vet}
                  onChange={handleVetChange}
                  required
                >
                  <option value="">Select a vet</option>
                  {vets.map((vet, index) => (
                    <option key={vet.id} value={vet.id}>
                      {vet.fullName}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>

              <div>
                {vetSchedule.length > 0 && (
                  <div className="mt-4">
                    <h5>Available Appointments</h5>
                    <Row className="g-3">
                      {vetSchedule.map((schedule) => (
                        <Col md={4} key={schedule.id}>
                          <Card
                            className={`h-100 ${
                              selectedScheduleId === schedule.id
                                ? "selected cards"
                                : "cards"
                            }`}
                            onClick={() => handleCardSelect(schedule.id)}
                            style={{
                              border:
                                selectedScheduleId === schedule.id
                                  ? "3px solid #df575e" // Selected border color
                                  : "2px solid #DD595D", // Default border color
                              borderRadius: "5px",
                              cursor: "pointer",
                              transition: "border-color 0.2s ease",
                            }}
                          >
                            <Card.Body>
                              <Card.Title>
                                {schedule.service_company_provider_name}
                              </Card.Title>
                              <Card.Text>
                                <strong>Date:</strong> {schedule.schedule_date}{" "}
                                <br />
                                <strong>Time:</strong> {schedule.start_time} -{" "}
                                {schedule.end_time} <br />
                                <strong>Location:</strong> {schedule.location}{" "}
                                <br />
                                <strong>Cost:</strong> ${schedule.cost} <br />
                              </Card.Text>
                            </Card.Body>
                          </Card>
                        </Col>
                      ))}
                    </Row>
                  </div>
                )}
              </div>

              <div className="d-flex justify-content-end mt-3">
                <Button type="submit" variant="success">
                  Book Appointment
                </Button>
              </div>
            </Form>
          )}

          {/* Display the list of appointments */}
          <Row className="mt-3 g-3 mb-3">
  {!showForm &&
    (appointments.filter((appointment) => appointment.status === "confirmed")
      .length > 0 ? (
      <Row className="mt-3 g-3 mb-3">
        {appointments
          .filter((appointment) => appointment.status === "confirmed")
          .map((appointment) => (
            <Col md={12} key={appointment.id}>
              <Card
                className="d-flex flex-row align-items-center p-3"
                style={{
                  border: "1px solid #e0e0e0",
                  borderRadius: "10px",
                  backgroundColor: "#ffffff",
                  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                }}
              >
                {/* Appointment Details Column */}
                <div className="d-flex flex-column">
                  <Card.Title
                    style={{
                      color: "#DD595D",
                      fontWeight: "bold",
                      fontSize: "1.05rem",
                      marginBottom: "5px",
                    }}
                  >
                    Dr. {appointment.provider_first_name}{" "}
                    {appointment.provider_last_name}
                    <span
                      style={{ color: "#6f6f6f", fontWeight: "normal" }}
                    >
                      {" "}
                      - {appointment.service_company_provider_name}
                    </span>
                  </Card.Title>
                  <div style={{ color: "#6f6f6f", fontSize: "0.85rem" }}>
                    <FaCalendar style={{ marginRight: "5px" }} />
                    {appointment.schedule_date}
                    {" - "}
                    {formatTime(appointment.start_time)} -{" "}
                    {formatTime(appointment.end_time)}
                    <br />
                    <FaMapMarkerAlt style={{ marginRight: "5px" }} />
                    {appointment.location}
                  </div>
                  <div style={{ color: "#6f6f6f", marginTop: "5px" }}>
                    <strong>Reason for visit:</strong> {appointment.notes}
                  </div>
                </div>

                {/* Action Buttons Column */}
                <div className="ms-auto d-flex align-items-center">
                  <Button
                    variant="outline-primary"
                    size="sm"
                    className="me-2"
                    onClick={() => handleReschedule(appointment.id)}
                    style={{
                      border: "1px solid #007bff",
                      color: "#007bff",
                      fontWeight: "bold",
                    }}
                  >
                    Reschedule
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => handleDeleteAppointment(appointment.id)}
                    style={{
                      border: "1px solid #dc3545",
                      color: "#dc3545",
                      fontWeight: "bold",
                    }}
                  >
                    Delete
                  </Button>
                </div>
              </Card>
            </Col>
          ))}
      </Row>
    ) : (
      !showForm && (
        <p className="mt-4 text-center">
          No appointments found for this pet.
        </p>
      )
    ))}
</Row>

        </Tab>
      </Tabs>

      {/* Modal for Adding/Editing Items */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {editIndex !== null ? "Edit" : "Add"}{" "}
            {modalType === "specialCondition"
              ? "Special Condition"
              : modalType === "allergy"
              ? "Allergy"
              : "Reminder"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {modalType === "specialCondition" ? (
              <Form.Group>
                <Form.Label>Condition</Form.Label>
                <Form.Control
                  type="text"
                  value={modalData.name}
                  onChange={(e) =>
                    setModalData({ ...modalData, name: e.target.value })
                  }
                />
              </Form.Group>
            ) : modalType === "allergy" ? (
              <Form.Group>
                <Form.Label>Select Allergen</Form.Label>
                <Form.Select
                  value={modalData.id || ""}
                  onChange={(e) => {
                    const selected = e.target.value;
                    const item = allergenList.find(
                      (opt) => opt.id === Number(selected)
                    );
                    if (item) {
                      setModalData({
                        ...modalData,
                        id: item.id,
                        name: item.allergen,
                      });
                    }
                  }}
                >
                  <option value="">Select an option</option>
                  {allergenList.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.allergen}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            ) : (
              <>
                <Form.Group>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={modalData.name}
                    onChange={(e) =>
                      setModalData({ ...modalData, name: e.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type="text"
                    value={modalData.description}
                    onChange={(e) =>
                      setModalData({
                        ...modalData,
                        description: e.target.value,
                      })
                    }
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={modalData.date}
                    onChange={(e) =>
                      setModalData({ ...modalData, date: e.target.value })
                    }
                  />
                </Form.Group>
              </>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveModal}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Reschedule Modal */}
      <Modal
        show={showRescheduleModal}
        onHide={() => setShowRescheduleModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Reschedule Appointment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="rescheduleDate">
              <Form.Label>New Date</Form.Label>
              <Form.Control
                type="date"
                value={rescheduleData.date}
                onChange={(e) =>
                  setRescheduleData({ ...rescheduleData, date: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="rescheduleTime">
              <Form.Label>New Time</Form.Label>
              <Form.Control
                type="time"
                value={rescheduleData.time}
                onChange={(e) =>
                  setRescheduleData({ ...rescheduleData, time: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowRescheduleModal(false)}
          >
            Close
          </Button>
          <Button
            variant="primary"
            // onClick={saveRescheduledAppointment}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      {/* confirmation modal */}
      <CustomModal
        show={showConfirmModal}
        title="Success!"
        message={modalMessage}
        showCancel={false}
        cancelText={"Close"}
        variant="success"
        onClose={() => setShowConfirmModal(false)}
        onConfirm={() => setShowConfirmModal(false)}
        showConfirm={true}
        confirmText="Close"
      />
      <CustomModal
        show={showErrorModal}
        title="Error"
        message="Please select a schedule before booking."
        onConfirm={() => setShowErrorModal(false)}
        showConfirm={true}
        showCancel={false}
        confirmText="Cancel"
        cancelText="Cancel"
        variant="danger"
      />
    </Container>
  );
}

export default ViewPets;
