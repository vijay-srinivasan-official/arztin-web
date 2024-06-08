import React, { useState, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './Modal.css';

function ApproveModal(props) {
    const [showPopup, setShowPopup] = useState(true);
    const [loading, setLoading] = useState(false);

    const formatTime = (dateString) => {
        const options = { hour: 'numeric', minute: 'numeric', hour12: true };
        return new Date(dateString).toLocaleTimeString([], options);
    };

    const handleApproval = async () => {
        setLoading(true);
        const apiUrl = process.env.REACT_APP_API_URL;
        const apiKey = process.env.REACT_APP_API_KEY;
        try {
            const requestBody = {
                AppointmentId: props.props.appointmentId,
                DoctorId: localStorage.getItem("uid")
            };
            const response = await fetch(apiUrl + `/ApproveAppointment` + apiKey, {
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
            setLoading(false);
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <Modal
            show={props.show || showPopup}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton onClick={props.onHide}>
                <Modal.Title>Approval for {props.props.patientName}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p><b>Approve appointment with {props.props.patientName} on {new Date(props.props.appointmentTime).toLocaleDateString()} at {formatTime(props.props.appointmentTime)}?</b></p>
                <div>
                    <h5>Important Information:</h5>
                    <p>Please review the patient's medical history and current medications before approving the appointment. Ensure that you will be available at the respective time of the appointment.</p>
                    <p>For any concerns or clarifications, please contact the administration office.</p>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
                <Button variant="success" onClick={handleApproval}>
                    <div className='d-flex justify-content-center align-items-center gap-2'>{loading && (<Spinner animation="grow" />)} Approve</div>
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ApproveModal;