import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

const AppointmentForm = ({ doctor }) => {
    const [validated, setValidated] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        appointmentTime: '',
        agreedToTerms: false,
    });

    const handleClose = () => setShowForm(false);

    const bookAppointment = () => {
        setShowForm(true);
    };

    const handleSubmit = async (e) => {
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
            // setValidated(false);
            return;
        }
        setValidated(true);

        if (validated === true) {
            e.preventDefault();
            // Call your API to submit form data
            try {
                const requestBody = {
                    DoctorId: doctor.id,
                    PatientName: formData.name,
                    PatientEmail: formData.email,
                    PatientPhone: formData.phoneNumber,
                    AppointmentTime: formData.appointmentTime
                };
                const response = await fetch('your-api-endpoint', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(requestBody),
                });
                const data = await response.json();
                console.log('Form submitted:', data);
                // Reset form after successful submission
                setFormData({
                    name: '',
                    email: '',
                    phoneNumber: '',
                    appointmentTime: '',
                    agreedToTerms: false,
                });
            } catch (error) {
                console.error('Error submitting form:', error);
            }
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    return (
        <div>
            <Button variant="primary" onClick={bookAppointment}>
                Book Appointment
            </Button>

            <Modal show={showForm} onHide={handleClose}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Book an appointment with {doctor.name} </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form noValidate validated={validated}>
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control
                                type="tel"
                                placeholder="Enter phone number"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Check
                                type="checkbox"
                                label="I read and understand terms and conditions for booking an appointment through arztin."
                                name="agreedToTerms"
                                checked={formData.agreedToTerms}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Disabled select menu</Form.Label>
                            <Form.Select>
                                <option>Disabled select</option>
                            </Form.Select>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Book Now
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default AppointmentForm;
