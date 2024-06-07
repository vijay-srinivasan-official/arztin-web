import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

function RejectModal(props) {
    const [formData, setFormData] = useState({
        comments: ''
    });
    const [showPopup, setShowPopup] = useState(true);
    const [validated, setValidated] = useState(false);

    const formatTime = (dateString) => {
        const options = { hour: 'numeric', minute: 'numeric', hour12: true };
        return new Date(dateString).toLocaleTimeString([], options);
    };

    const handleRejection = async (e) => {
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
            return;
        }
        setValidated(true);

        if (formData.comments != null && formData.comments !== '') {
            try {
                setValidated(true);
                const requestBody = {
                    AppointmentId: props.props.appointmentId,
                    DoctorId: sessionStorage.getItem("uid"),
                    RejectedReason: formData.comments
                };
                const response = await fetch(' http://localhost:7071/api/RejectAppointment', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(requestBody),
                });
                const data = await response.json();
                if (data.error || data.message) {
                    alert(data.error ?? data.message);
                    setShowPopup(false);
                    props.onHide();
                }
                if (data.httpStatus === 200) {
                    setValidated(false);
                    setFormData({
                        comments: ''
                    });
                }
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
        <Modal
            show={props.show || showPopup}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton onClick={props.onHide}>
                <Modal.Title>Rejection for {props.props.patientName}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/* <p><b>Reject appointment with {props.props.patientName} on {new Date(props.props.appointmentTime).toLocaleDateString()} at {formatTime(props.props.appointmentTime)}?</b></p> */}
                <div>
                    <h2>Important: Appointment Review Needed</h2>
                    <p><strong>Patient:</strong> {props.props.patientName}</p>
                    {/* <p><strong>Phone:</strong> {props.props.patientPhone}</p> Phone number can be added in future */}
                    <p><strong>Scheduled Appointment:</strong> {new Date(props.props.appointmentTime).toLocaleDateString()} at {formatTime(props.props.appointmentTime)}</p>
                    <p>Please review the patient's file and decide whether to cancel or reschedule this appointment. Your prompt attention is appreciated.</p>
                    <Form noValidate validated={validated}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Add your comments for rejection:</Form.Label>
                            <Form.Control as="textarea" name="comments" value={formData.comments} onChange={handleChange}
                                required rows={3} />
                        </Form.Group>
                    </Form>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
                <Button variant="danger" onClick={handleRejection}>Reject</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default RejectModal;