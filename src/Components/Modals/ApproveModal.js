import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ApproveModal(props) {
    const [showPopup, setShowPopup] = useState(true);

    const formatTime = (dateString) => {
        const options = { hour: 'numeric', minute: 'numeric', hour12: true };
        return new Date(dateString).toLocaleTimeString([], options);
    };

    const handleApproval = async () => {
        try {
            const requestBody = {
                AppointmentId: props.props.appointmentId,
                DoctorId: sessionStorage.getItem("uid")
            };
            const response = await fetch(' https://arztin-fa.azurewebsites.net/api/ApproveAppointment?code=9KCl0n7yVGpCup9396UnPw0l8k_WkEk3cunbK1Xrj5S4AzFuEh1LHQ%3D%3D', {
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
                <Button variant="success" onClick={handleApproval}>Approve</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ApproveModal;