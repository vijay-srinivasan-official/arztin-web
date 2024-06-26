import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import './AppointmentForm.css';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';

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
    const [selectedDate, setSelectedDate] = useState('');
    const [timeSlots, setTimeSlots] = useState([]);
    const [noSlots, setNoSlots] = useState(false);
    const [selectedSlot, setSelectedSlot] = useState('');
    var [loading, setLoading] = useState(false);

    useEffect(() => {
        const apiUrl = process.env.REACT_APP_API_URL;
        const apiKey = process.env.REACT_APP_API_KEY;
        if (selectedDate) {
            const fetchTimeSlots = async () => {
                try {
                    const requestBody = {
                        DoctorId: doctor.id,
                        Date: selectedDate
                    };
                    const response = await fetch(apiUrl + `/GetAvailableTimeSlots` + apiKey, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(requestBody),
                    });
                    const data = await response.json();
                    if (data.length === 0) {
                        setNoSlots(true);
                    } else {
                        setNoSlots(false);
                    }
                    const formattedTimeSlots = data.map((slot) => formatTimeSlot(slot));
                    setTimeSlots(formattedTimeSlots);
                } catch (error) {
                    console.error('Error fetching time slots:', error);
                }
            };

            fetchTimeSlots();
        }
    }, [selectedDate]);

    const formatTimeSlot = (slot) => {
        const date = new Date(slot);
        const options = { hour: 'numeric', minute: 'numeric', hour12: true };
        return new Intl.DateTimeFormat('en-US', options).format(date);
    };

    const handleClose = () => {
        setValidated(false);
        setShowForm(false);
        setFormData({
            name: '',
            email: '',
            phoneNumber: '',
            appointmentTime: '',
            agreedToTerms: false,
        });
        setSelectedDate('');
        setSelectedSlot('');
        setTimeSlots([]);
    };

    const bookAppointment = () => {
        setShowForm(true);
    };

    const handleSubmit = async (e) => {
        const apiUrl = process.env.REACT_APP_API_URL;
        const apiKey = process.env.REACT_APP_API_KEY;
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
            // setValidated(false);
            return;
        }
        setValidated(true);

        if (formData.name != '' && formData.email != '' && formData.email.includes('@') && formData.email.includes('.') && formData.phoneNumber != '' && selectedDate != '' && selectedSlot != '') {
            setLoading(true);
            e.preventDefault();
            // Call your API to submit form data
            try {
                const requestBody = {
                    DoctorId: doctor.id,
                    PatientName: formData.name,
                    PatientEmail: formData.email,
                    PatientPhone: formData.phoneNumber,
                    AppointmentDate: selectedDate,
                    AppointmentTime: selectedSlot
                };
                const response = await fetch(apiUrl + `/BookAppointment` + apiKey, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(requestBody),
                });
                const data = await response.json();
                setLoading(false);
                if (data.message)
                    alert(data.message);
                // Reset form after successful submission
                setValidated(false);
                setShowForm(false);
                setFormData({
                    name: '',
                    email: '',
                    phoneNumber: '',
                    appointmentTime: '',
                    agreedToTerms: false,
                });
                setSelectedDate('');
                setSelectedSlot('');
                setTimeSlots([]);
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

    const handleSlotChange = (e) => {
        setSelectedSlot(e.target.value);
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
                                placeholder="Enter patient name"
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
                                placeholder="Enter patient email"
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
                                placeholder="Enter patient phone number"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicCalendar">
                            <Form.Label>Choose a time slot</Form.Label>
                            <br></br>
                            <input
                                type="date"
                                value={selectedDate}
                                required
                                onChange={(e) => setSelectedDate(e.target.value)}
                            />
                            {noSlots && (<div className='mt-2'><Alert key='danger' variant='danger'>
                                No slots available on selected date. Please choose another one.
                            </Alert></div>)}
                        </Form.Group>

                        {selectedDate && !noSlots && (
                            <Form.Group className="mb-3">
                                <Form.Label>Select time slot</Form.Label>
                                <Form.Select
                                    aria-label="Select time slot"
                                    className="form-select"
                                    value={selectedSlot}
                                    required
                                    onChange={handleSlotChange}
                                >
                                    <option value="">select an available slot</option>
                                    {timeSlots.map((slot, index) => (
                                        <option key={index} value={slot}>
                                            {slot}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        )}

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
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        <div className='d-flex justify-content-center align-items-center gap-2'>{loading && (<Spinner animation="grow" />)} Book now</div>
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default AppointmentForm;
