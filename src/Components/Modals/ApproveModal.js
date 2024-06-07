import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ApproveModal(props) {

    const formatTime = (dateString) => {
        const options = { hour: 'numeric', minute: 'numeric', hour12: true };
        return new Date(dateString).toLocaleTimeString([], options);
    };

    return (
        <Modal
            show={props.show}
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
                <Button variant="success" onClick={props.onApprove}>Approve</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ApproveModal;