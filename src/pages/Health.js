import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Tabs, Tab, Table, Badge, Modal, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaMapMarkerAlt, FaNotesMedical, FaCalendar, FaPlus, FaUpload, FaEdit } from 'react-icons/fa';

function Health() {
  // Initial data as JSON arrays
  const [allergies, setAllergies] = useState(['Peanuts', 'Mold', 'Metal']);
  const [specialConditions, setSpecialConditions] = useState(['Anemia', 'Fleas']);
  const [reminders, setReminders] = useState([
    { name: 'Aspirin', description: '500mg BAYER, 1 tablet', date: 'Everyday, 22:00' },
    { name: 'Walk', description: '1 hour', date: 'Everyday, 22:00' },
    { name: 'Brush', description: '1 hour', date: 'Everyday, 22:00' }
  ]);
  const [appointments, setAppointments] = useState([
    { doctor: 'Dr. Salih Ahmet', date: '14.02.2024 - 13:00', location: 'Binevler Mahallesi', reason: 'flea removal' },
    { doctor: 'Dr. Salih Ahmet', date: '24.01.2025 - 10:00', location: '12 Merchant Ave, Waterloo', reason: 'tooth removal'}
  ]);

  const addAppointment = (newAppointment) => {
    setAppointments((prevAppointments) => [...prevAppointments, newAppointment]);
  };

  const [attachments, setAttachments] = useState([
   
  ]);

  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [modalData, setModalData] = useState({ name: '', description: '', date: '' });
  const [editIndex, setEditIndex] = useState(null);

  // Modal functions for adding/editing
  const handleShowModal = (type, index = null) => {
    setModalType(type);
    setEditIndex(index);  // Set the edit index to edit an existing entry
    if (index !== null) {
      const dataArray = getDataArray(type);  // Get the correct data array based on the type
      setModalData({ ...dataArray[index] });  // Set modalData for editing
    } else {
      setModalData({ name: '', description: '', date: '' });  // Reset modalData for new entry
    }
    setShowModal(true);  // Open the modal
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalData({ name: '', description: '', date: '' });
    setEditIndex(null);
  };

  const getDataArray = (type) => {
    if (type === 'allergy') return allergies;
    if (type === 'specialCondition') return specialConditions;
    if (type === 'reminder') return reminders;
  };

  const setDataArray = (type, newArray) => {
    if (type === 'allergy') setAllergies(newArray);
    if (type === 'specialCondition') setSpecialConditions(newArray);
    if (type === 'reminder') setReminders(newArray);
  };

  const handleSaveModal = () => {
    const dataArray = getDataArray(modalType);  // Get the correct array based on modal type
    const newArray = [...dataArray];
  
    if (modalType === 'allergy' || modalType === 'specialCondition') {
      if (editIndex === null) {
        newArray.push(modalData.name);  // Push name (string) only for allergies/conditions
      } else {
        newArray[editIndex] = modalData.name;  // Update with the new name
      }
    } else if (modalType === 'reminder') {
      if (editIndex === null) {
        newArray.push(modalData);  // Add entire reminder object
      } else {
        newArray[editIndex] = modalData;  // Update reminder object
      }
    }
  
    setDataArray(modalType, newArray);  // Update the state with the new array
    handleCloseModal();  // Close the modal after saving
  };
  
  // Appointment form states
  const [appointmentDetails, setAppointmentDetails] = useState({
    reason: '',
    date: '',
    time: '',
    vet: '',
    address: ''
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
        file: file, // Store the actual file
      };
      setAttachments((prevAttachments) => [...prevAttachments, newAttachment]);
      setFile(null); // Reset the file after uploading
    }
  };

  
  const vets = [
    { name: 'Dr. Salih Ahmet', address: 'Binevler Mahallesi' },
    { name: 'Dr. Mohammed Ismai', address: '12 Merchant Ave, Waterloo' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAppointmentDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value
    }));
    if (name === 'vet') {
      const selectedVet = vets.find((vet) => vet.name === value);
      setAppointmentDetails((prevDetails) => ({
        ...prevDetails,
        address: selectedVet ? selectedVet.address : ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addAppointment({
      doctor: appointmentDetails.vet,
      date: `${appointmentDetails.date} - ${appointmentDetails.time}`,
      reason: appointmentDetails.reason,
      location: appointmentDetails.address
    });
    setAppointmentDetails({
      reason: '',
      date: '',
      time: '',
      vet: '',
      address: ''
    });
    setShowForm(false); // Hide form after submit
  };

  // Define showForm and setShowForm state
  const [showForm, setShowForm] = useState(false);

  // New state for reschedule modal
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [rescheduleIndex, setRescheduleIndex] = useState(null);
  const [rescheduleData, setRescheduleData] = useState({ date: '', time: '' });

  // Function to handle rescheduling
  const handleReschedule = (index) => {
    setRescheduleIndex(index);
    const appointment = appointments[index];
    const [date, time] = appointment.date.split(' - ');
    setRescheduleData({ date, time });
    setShowRescheduleModal(true);
  };

  // Function to save rescheduled appointment
  const saveRescheduledAppointment = () => {
    const updatedAppointments = [...appointments];
    updatedAppointments[rescheduleIndex] = {
      ...updatedAppointments[rescheduleIndex],
      date: `${rescheduleData.date} - ${rescheduleData.time}`
    };
    setAppointments(updatedAppointments);
    setShowRescheduleModal(false);
  };

  // Function to cancel appointment
  const cancelAppointment = (index) => {
    const updatedAppointments = appointments.filter((_, i) => i !== index);
    setAppointments(updatedAppointments);
  };

  // New state for bio
  const [bio, setBio] = useState("Poppy is a spirited Golden Retriever with a heart full of love and a nose for adventure. This 4-year-old sweetheart enjoys long walks in the park, chasing after tennis balls, and playing fetch with her favorite squeaky toys. Poppy loves belly rubs and will happily roll over to show off her fluffy belly—if you want to win her trust, that's the quickest way! While she adores treats, Poppy has a slight allergy to chicken, so her human makes sure to keep her snacks chicken-free. She also dislikes loud noises and thunderstorms, often seeking refuge under the bed during storms. With a gentle nature and a wagging tail, Poppy is always ready for new friends and exciting adventures!");
  const [isEditingBio, setIsEditingBio] = useState(false);

  return (
    
    <Container className="my-5">

      {/* Header Row */}
      <Row className="mb-4">
        <Col md={4}>
          <Card.Img variant="top" src="https://hips.hearstapps.com/hmg-prod/images/close-up-of-dog-sticking-out-tongue-against-blue-royalty-free-image-888244458-1548966956.jpg?crop=0.99933xw:1xh;center,top&resize=980:*" alt="Pet Image" rounded />
        </Col>
        <Col md={8}>
          <h2>Poppy</h2>
          <p>Breed: Labrador</p>
          <p>Born: April 16, 2024</p>
          <p>Owner: Leslie Lexington</p>
          <p>Weight: 55 lbs</p>
          <p>Color: Ash Grey</p>
        </Col>
      </Row>

      {/* Tabs Section */}
      <Tabs defaultActiveKey="history" id="pet-history-tabs" className="mb-3">

        <Tab eventKey="overview" title="Overview">
          <div className="d-flex align-items-center mt-4">
            <h4 className="mb-0">Bio</h4>
            <FaEdit 
              style={{ marginLeft: '20px', cursor: 'pointer', color: '#DD595D' }} 
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
                onClick={() => setIsEditingBio(false)}
                className="mt-2"
              >
                Save
              </Button>
            </>
          ) : (
            <p className="mt-2">{bio}</p>
          )}
          {/* overview appointment */}
          <Row className="mt-3 g-3"> {/* g-3 adds controlled spacing between cards */}
  {appointments.map((appointment, index) => (
    <Col md={6} key={index}>  
      <Card className="rounded-3" style={{ backgroundColor: '#FFE782', width: '100%', border:'none' }}>
        <Card.Body>
          {/* Title */}
          <Card.Title className="text-dark">{appointment.doctor}</Card.Title>

          {/* Appointment details */}
          <p style={{ color: '#6f4f37', fontSize: '0.85rem' }}><FaNotesMedical /> {appointment.reason}</p>
          <Row className="g-2">
            <Col xs={6}>
              <p style={{ color: '#6f4f37', fontSize: '0.85rem' }}><FaCalendar /> {appointment.date}</p>
            </Col>
            <Col xs={6}>
              <p className="text-end" style={{ color: '#6f4f37', fontSize: '0.85rem' }}><FaMapMarkerAlt /> {appointment.location}</p>
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
          Poppy is a healthy and active 4-year-old Golden Retriever. She has no significant health conditions but has a mild allergy to chicken, which her owner manages by ensuring her diet is free from chicken-based products. Regular vet check-ups confirm she is up to date on vaccinations and has no known chronic illnesses. Poppy maintains a healthy weight through a balanced diet and regular exercise, including daily walks and playtime. While she is generally healthy, she may experience anxiety during thunderstorms, which her owner addresses with comforting techniques and safe spaces.
          </p>

         {/* Allergies */}
 <h5>Allergies</h5>

    <Button variant="outline-danger" onClick={() => handleShowModal('allergy')}>
      <FaPlus /> Add Allergy
    </Button>
 
<Row className="flex-wrap mt-3">
  {allergies.map((allergy, index) => (
    <Col sm={4} key={index} className="mb-2">
      <Badge
        bg="white" // White background
        text="danger" // Pink text (bootstrap's "danger" is pink)
        className="p-2 w-100 d-inline-block text-start"
        style={{ border: '1px solid #ff6b6b', borderRadius: '0px'}}
      >
        {allergy}
        <span
          onClick={() => handleShowModal('allergy', index)}
          className="ms-2 cursor-pointer text-pink"
        >
          <FaEdit />
        </span>
      </Badge>
    </Col>
  ))}
</Row>


          {/* Special Conditions */}
<h5 className='mt-4'>Special Conditions</h5>
 
    <Button variant="outline-danger" onClick={() => handleShowModal('specialCondition')}>
      <FaPlus /> Add Condition
    </Button>

<Row className="flex-wrap mt-3">
  {specialConditions.map((condition, index) => (
    <Col sm={4} key={index} className="mb-2">
      <Badge
        bg="white"
        text="danger"
        className="p-2 w-100 d-inline-block text-center"
        style={{ border: '1px solid #ff6b6b', borderRadius: '0px'}}
      >
        {condition}
        <span
          onClick={() => handleShowModal('specialCondition', index)}
          className="ms-2 cursor-pointer"
        >
          <FaEdit />
        </span>
      </Badge>
    </Col>
  ))}
</Row>

          {/* Reminders */}
          <h5 className="mt-4">Reminders</h5>
          <Button variant="outline-danger" onClick={() => handleShowModal('reminder')}>
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
                      onClick={() => handleShowModal('reminder', index)}
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
        <Button variant="outline-danger" className="mb-2" onClick={handleFileUpload}>
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
            <Button variant="primary" onClick={() => setShowForm(true)}>Book Appointment</Button>
          </div>     

          {/* Show the form when showForm is true */}
         {showForm && (
        <Form onSubmit={handleSubmit} className="mt-3 p-3 border rounded" style={{ background: '#ffffff', border: '2px solid #DD595D' }}>
          <Form.Group controlId="formReason" className="mb-3">
            <Form.Label style={{ color: '#DD595D' }}>Reason for Appointment</Form.Label>
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
                <Form.Label style={{ color: '#DD595D' }}>Date</Form.Label>
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
                <Form.Label style={{ color: '#DD595D' }}>Time</Form.Label>
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
            <Form.Label style={{ color: '#DD595D' }}>Select Vet</Form.Label>
            <Form.Control
              as="select"
              name="vet"
              value={appointmentDetails.vet}
              onChange={handleChange}
              required
            >
              <option value="">Select a vet</option>
              {vets.map((vet, index) => (
                <option key={index} value={vet.name}>{vet.name}</option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="formAddress" className="mb-3">
            <Form.Label style={{ color: '#DD595D' }}>Address</Form.Label>
            <Form.Control
              type="text"
              name="address"
              value={appointmentDetails.address}
              onChange={handleChange}
              readOnly
            />
          </Form.Group>

          <div className="d-flex justify-content-end">
            <Button type="submit" variant="success">Book Appointment</Button>
          </div>
        </Form>
      )}

          {/* Display the list of appointments */}
         <Row className="mt-3 g-3">
  {appointments.map((appointment, index) => (
    <Col md={6} key={index}>
      <Card className="g-2" style={{border: '2px solid #ff6b6b', borderRadius: '0px', width: '100%' }}>
        <Card.Body className="d-flex flex-row align-items-center">
          {/* Image Column */}
          <div className="me-3 ms-3">
            <img
              src="https://mighty.tools/mockmind-api/content/human/9.jpg" // Replace with your image URL
              alt="Doctor"
              className="rounded-circle"
              style={{ width: '100px', height: '100px' }}
            />
          </div>

          {/* Appointment Details Column */}
          <div>
            <Card.Title style={{color: '#DD595D', fontWeight: 'bolder', fontSize: '1.05rem'}}>{appointment.doctor}</Card.Title>
            <p style={{ color: '#6f4f37', fontSize: '0.85rem' }}>
              <FaNotesMedical /> {appointment.reason}
            </p>
            <Row className="g-2">
              <Col xs={6}>
                <p style={{ color: '#6f4f37', fontSize: '0.85rem' }}>
                  <FaCalendar /> {appointment.date}
                </p>
              </Col>
              <Col xs={6}>
                <p className="text-end" style={{ color: '#6f4f37', fontSize: '0.85rem' }}>
                  <FaMapMarkerAlt /> {appointment.location}
                </p>
              </Col>
            </Row>
            <Row className="g-2">
              <Col xs={6}>
              <Button variant="outline-primary" className="mt-2" onClick={() => handleReschedule(index)}>
              Reschedule
            </Button>
              </Col>
              <Col xs={6}>
              <Button variant="outline-primary" className="mt-2 me-2" onClick={() => cancelAppointment(index)}>
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
          <Modal.Title>{editIndex !== null ? 'Edit' : 'Add'} {modalType === 'reminder' ? 'Reminder' : 'Item'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={modalData.name}
                onChange={(e) => setModalData({ ...modalData, name: e.target.value })}
              />
            </Form.Group>
            {modalType === 'reminder' && (
              <>
                <Form.Group>
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type="text"
                    value={modalData.description}
                    onChange={(e) => setModalData({ ...modalData, description: e.target.value })}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={modalData.date}
                    onChange={(e) => setModalData({ ...modalData, date: e.target.value })}
                  />
                </Form.Group>
              </>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
          <Button variant="primary" onClick={handleSaveModal}>Save</Button>
        </Modal.Footer>
      </Modal>

      {/* Reschedule Modal */}
      <Modal show={showRescheduleModal} onHide={() => setShowRescheduleModal(false)}>
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
                onChange={(e) => setRescheduleData({ ...rescheduleData, date: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="rescheduleTime">
              <Form.Label>New Time</Form.Label>
              <Form.Control
                type="time"
                value={rescheduleData.time}
                onChange={(e) => setRescheduleData({ ...rescheduleData, time: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowRescheduleModal(false)}>Close</Button>
          <Button variant="primary" onClick={saveRescheduledAppointment}>Save Changes</Button>
        </Modal.Footer>
      </Modal>

    </Container>
  );
}

export default Health