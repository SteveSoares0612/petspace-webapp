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
} from "react-icons/fa";

import { Link, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import previewImage from "../../assets/images/previewImage.jpg";
import CustomModal from "../../components/CustomModal";

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
    addPetAllergen,  } = useAuth();

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

  const [allergenID, setAllergenID] = useState();

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
    date: ""
  });
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    getPetDetails(id);
  }, [id]);

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
      // setSelectedFile(petDetails.pet_image)

      console.log("Pet Image is ", petDetails);
    }
  }, [petDetails]);

  const allergyOptions = [
    { id: 1, allergen: "Peanuts" },
    { id: 2, allergen: "Dairy" },
    { id: 3, allergen: "Gluten" },
    { id: 4, allergen: "Eggs" },
    { id: 5, allergen: "Soy" },
    { id: 6, allergen: "Fish" },
    { id: 7, allergen: "Shellfish" },
    { id: 8, allergen: "Tree Nuts" },
  ];

  const conditionOptions = [
    { id: 1, condition: "Diabetes" },
    { id: 2, condition: "Heart Disease" },
    { id: 3, condition: "Arthritis" },
    { id: 4, condition: "Kidney Disease" },
    { id: 5, condition: "Thyroid Disorder" },
    { id: 6, condition: "Anxiety" },
    { id: 7, condition: "Skin Allergies" },
    { id: 8, condition: "Hip Dysplasia" },
  ];

  useEffect(() => {
    if (allergenList) {
      console.log(allergenList);
    }
  }, [allergenList]);

  // Initial data as JSON arrays
  const [allergies, setAllergies] = useState([]);
  const [specialConditions, setSpecialConditions] = useState([
  
  ]);

  const [reminders, setReminders] = useState([
    {
      name: "Aspirin",
      description: "500mg BAYER, 1 tablet",
      date: "Everyday, 22:00",
    },
    { name: "Walk", description: "1 hour", date: "Everyday, 22:00" },
    { name: "Brush", description: "1 hour", date: "Everyday, 22:00" },
  ]);
  const [appointments, setAppointments] = useState([
    {
      doctor: "Dr. Salih Ahmet",
      date: "14.02.2024 - 13:00",
      location: "Binevler Mahallesi",
      reason: "flea removal",
    },
    {
      doctor: "Dr. Salih Ahmet",
      date: "24.01.2025 - 10:00",
      location: "12 Merchant Ave, Waterloo",
      reason: "tooth removal",
    },
  ]);

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
      console.log("Updated Allergies: ", allergies);
      console.log("Allergen ID: ", allergenID);
    }
  }, [allergies, allergenID]);
  

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

  // const setDataArray = (type, newArray) => {
  //   if (type === "allergy") {
  //     setAllergies(newArray);
  //   }
  //   if (type === "specialCondition") setSpecialConditions(newArray);
  //   if (type === "reminder") setReminders(newArray);
  // };

  const handleSaveModal = () => {
    if (!modalData.id) return; // Don't save if no option selected

    if (modalType === "allergy") {
      const selectedAllergen = allergenList.find(
        (opt) => opt.id === modalData.id
      );
      if (!selectedAllergen) return;

      if (editIndex === null) {
        // Adding new allergy
        const exists = allergies.some((item) => item.id === modalData.id);
        if (!exists) {
          setAllergies((prev) => [
            ...prev,
            {
              id: modalData.id,
              allergen: selectedAllergen.allergen,
            },
           
          ]);
          setAllergenID(modalData.id)
         
        }
      } else {
        // Editing existing allergy
        const updatedAllergies = [...allergies];
        updatedAllergies[editIndex] = {
          id: modalData.id,
          allergen: selectedAllergen.allergen,
        };
        setAllergies(updatedAllergies);
      }
    } else if (modalType === "specialCondition") {
      const selectedCondition = conditionOptions.find(
        (opt) => opt.id === modalData.id
      );
      if (!selectedCondition) return;

      if (editIndex === null) {
        // Adding new condition
        const exists = specialConditions.some(
          (item) => item.id === modalData.id
        );
        if (!exists) {
          setSpecialConditions((prev) => [
            ...prev,
            {
              id: modalData.id,
              condition: selectedCondition.condition,
            },
          
          ],);
         
        }
      } else {
        // Editing existing condition
        const updatedConditions = [...specialConditions];
        updatedConditions[editIndex] = {
          id: modalData.id,
          condition: selectedCondition.condition,
        };
        setSpecialConditions(updatedConditions);
      }
    }

    handleCloseModal();
    // console.log("Final Allergies List:", allergies);
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
      formData.append("is_spayed_neutered", isSpayedNeutered);
      formData.append("is_microchipped", isMicrochipped);
      formData.append("bio", String(bio));

      // if (selectedFile) {
      //   formData.append("image", selectedFile); // Appends the image file as is
      // }

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

  const vets = [
    { name: "Dr. Salih Ahmet", address: "Binevler Mahallesi" },
    { name: "Dr. Mohammed Ismai", address: "12 Merchant Ave, Waterloo" },
  ];

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

  const handleSubmit = (e) => {
    e.preventDefault();
    addAppointment({
      doctor: appointmentDetails.vet,
      date: `${appointmentDetails.date} - ${appointmentDetails.time}`,
      reason: appointmentDetails.reason,
      location: appointmentDetails.address,
    });
    setAppointmentDetails({
      reason: "",
      date: "",
      time: "",
      vet: "",
      address: "",
    });
    setShowForm(false); // Hide form after submit
  };

  // Define showForm and setShowForm state
  const [showForm, setShowForm] = useState(false);

  // New state for reschedule modal
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [rescheduleIndex, setRescheduleIndex] = useState(null);
  const [rescheduleData, setRescheduleData] = useState({ date: "", time: "" });

  // Function to handle rescheduling
  const handleReschedule = (index) => {
    setRescheduleIndex(index);
    const appointment = appointments[index];
    const [date, time] = appointment.date.split(" - ");
    setRescheduleData({ date, time });
    setShowRescheduleModal(true);
  };

  // Function to save rescheduled appointment
  const saveRescheduledAppointment = () => {
    const updatedAppointments = [...appointments];
    updatedAppointments[rescheduleIndex] = {
      ...updatedAppointments[rescheduleIndex],
      date: `${rescheduleData.date} - ${rescheduleData.time}`,
    };
    setAppointments(updatedAppointments);
    setShowRescheduleModal(false);
  };

  // Function to cancel appointment
  const cancelAppointment = (index) => {
    const updatedAppointments = appointments.filter((_, i) => i !== index);
    setAppointments(updatedAppointments);
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
            {" "}
            {/* g-3 adds controlled spacing between cards */}
            {appointments.map((appointment, index) => (
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
                      {appointment.doctor}
                    </Card.Title>

                    {/* Appointment details */}
                    <p style={{ color: "#6f4f37", fontSize: "0.85rem" }}>
                      <FaNotesMedical /> {appointment.reason}
                    </p>
                    <Row className="g-2">
                      <Col xs={6}>
                        <p style={{ color: "#6f4f37", fontSize: "0.85rem" }}>
                          <FaCalendar /> {appointment.date}
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
          <h4 className="text-danger mt-4">History & Health</h4>
          <h5 className="mt-3">Vet Summary</h5>
          <p>
            Poppy is a healthy and active 4-year-old Golden Retriever. She has
            no significant health conditions but has a mild allergy to chicken,
            which her owner manages by ensuring her diet is free from
            chicken-based products. Regular vet check-ups confirm she is up to
            date on vaccinations and has no known chronic illnesses. Poppy
            maintains a healthy weight through a balanced diet and regular
            exercise, including daily walks and playtime. While she is generally
            healthy, she may experience anxiety during thunderstorms, which her
            owner addresses with comforting techniques and safe spaces.
          </p>

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
                    className="p-2 w-100 d-inline-block text-center"
                    style={{ border: "1px solid #ff6b6b", borderRadius: "0px" }}
                  >
                    {allergy.allergen}
                    <span
                      onClick={() => {
                        const index = allergies.findIndex(
                          (a) => a.id === allergy.id
                        );
                        handleShowModal("allergy", index);
                      }}
                      className="ms-2 cursor-pointer text-pink"
                    >
                      <FaEdit />
                    </span>
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
  {specialConditions.length === 0 ? (
    <Col>
      <p className="text-muted">No special conditions added yet</p>
    </Col>
  ) : (
    specialConditions.map((condition) => (
      <Col sm={4} key={condition.id} className="mb-2">
        <Badge
          bg="white"
          text="danger"
          className="p-2 w-100 d-inline-block text-center"
          style={{ border: "1px solid #ff6b6b", borderRadius: "0px" }}
        >
          {condition.condition}
          <span
            onClick={() => {
              const index = specialConditions.findIndex(c => c.id === condition.id);
              handleShowModal("specialCondition", index);
            }}
            className="ms-2 cursor-pointer text-pink"
          >
            <FaEdit />
          </span>
        </Badge>
      </Col>
    ))
  )}
</Row>

          {/* Reminders */}
          <h5 className="mt-4">Reminders</h5>
          <Button
            variant="outline-danger"
            onClick={() => handleShowModal("reminder")}
          >
            <FaPlus /> Add Reminder
          </Button>
          <Row className="mt-3">
            {reminders.map((reminder, index) => (
              <Col md={4} key={index}>
                <Card className="mb-3">
                  <Card.Body>
                    <Card.Title>{reminder.name}</Card.Title>
                    <p>{reminder.description}</p>
                    <FaCalendar /> {reminder.date}
                    <span
                      onClick={() => handleShowModal("reminder", index)}
                      className="ms-2 cursor-pointer"
                    >
                      <FaEdit />
                    </span>
                  </Card.Body>
                </Card>
              </Col>
            ))}
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
            <h5 className="mb-0">Upcoming Appointments</h5>
            <Button variant="primary" onClick={() => setShowForm(true)}>
              Book Appointment
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
                  type="text"
                  placeholder="Enter reason for appointment"
                  name="reason"
                  value={appointmentDetails.reason}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Row>
                <Col>
                  <Form.Group controlId="formDate" className="mb-3">
                    <Form.Label style={{ color: "#DD595D" }}>Date</Form.Label>
                    <Form.Control
                      type="date"
                      name="date"
                      value={appointmentDetails.date}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="formTime" className="mb-3">
                    <Form.Label style={{ color: "#DD595D" }}>Time</Form.Label>
                    <Form.Control
                      type="time"
                      name="time"
                      value={appointmentDetails.time}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group controlId="formVet" className="mb-3">
                <Form.Label style={{ color: "#DD595D" }}>Select Vet</Form.Label>
                <Form.Control
                  as="select"
                  name="vet"
                  value={appointmentDetails.vet}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a vet</option>
                  {vets.map((vet, index) => (
                    <option key={index} value={vet.name}>
                      {vet.name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="formAddress" className="mb-3">
                <Form.Label style={{ color: "#DD595D" }}>Address</Form.Label>
                <Form.Control
                  type="text"
                  name="address"
                  value={appointmentDetails.address}
                  onChange={handleChange}
                  readOnly
                />
              </Form.Group>

              <div className="d-flex justify-content-end">
                <Button type="submit" variant="success">
                  Book Appointment
                </Button>
              </div>
            </Form>
          )}

          {/* Display the list of appointments */}
          <Row className="mt-3 g-3">
            {appointments.map((appointment, index) => (
              <Col md={6} key={index}>
                <Card
                  className="g-2"
                  style={{
                    border: "2px solid #ff6b6b",
                    borderRadius: "0px",
                    width: "100%",
                  }}
                >
                  <Card.Body className="d-flex flex-row align-items-center">
                    {/* Image Column */}
                    <div className="me-3 ms-3">
                      <img
                        src="https://mighty.tools/mockmind-api/content/human/9.jpg" // Replace with your image URL
                        alt="Doctor"
                        className="rounded-circle"
                        style={{ width: "100px", height: "100px" }}
                      />
                    </div>

                    {/* Appointment Details Column */}
                    <div>
                      <Card.Title
                        style={{
                          color: "#DD595D",
                          fontWeight: "bolder",
                          fontSize: "1.05rem",
                        }}
                      >
                        {appointment.doctor}
                      </Card.Title>
                      <p style={{ color: "#6f4f37", fontSize: "0.85rem" }}>
                        <FaNotesMedical /> {appointment.reason}
                      </p>
                      <Row className="g-2">
                        <Col xs={6}>
                          <p style={{ color: "#6f4f37", fontSize: "0.85rem" }}>
                            <FaCalendar /> {appointment.date}
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
                      <Row className="g-2">
                        <Col xs={6}>
                          <Button
                            variant="outline-primary"
                            className="mt-2"
                            onClick={() => handleReschedule(index)}
                          >
                            Reschedule
                          </Button>
                        </Col>
                        <Col xs={6}>
                          <Button
                            variant="outline-primary"
                            className="mt-2 me-2"
                            onClick={() => cancelAppointment(index)}
                          >
                            Cancel
                          </Button>
                        </Col>
                      </Row>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Tab>
      </Tabs>

      {/* Modal for Adding/Editing Items */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {editIndex !== null ? "Edit" : "Add"}{" "}
            {modalType === "reminder"
              ? "Reminder"
              : modalType === "allergy"
              ? "Allergy"
              : "Condition"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {modalType === "allergy" || modalType === "specialCondition" ? (
              <Form.Group>
                <Form.Label>
                  Select {modalType === "allergy" ? "Allergen" : "Condition"}
                </Form.Label>
                <Form.Select
                  value={modalData.id || ""}
                  onChange={(e) => {
                    const selected = e.target.value;
                    const options =
                      modalType === "allergy"
                        ? allergenList
                        : conditionOptions;
                    const item = options.find(
                      (opt) => opt.id === Number(selected)
                    );
                    if (item) {
                      setModalData({
                        ...modalData,
                        id: item.id,
                        name:
                          modalType === "allergy"
                            ? item.allergen
                            : item.condition,
                      });
                    }
                  }}
                >
                  <option value="">Select an option</option>
                  {(modalType === "allergy"
                    ? allergenList
                    : conditionOptions
                  ).map((option) => (
                    <option key={option.id} value={option.id}>
                      {modalType === "allergy"
                        ? option.allergen
                        : option.condition}
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
          <Button variant="primary" onClick={saveRescheduledAppointment}>
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
    </Container>
  );
}

export default ViewPets;
