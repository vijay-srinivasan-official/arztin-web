import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

function RejectModal(props) {

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
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Add your comments for rejection:</Form.Label>
                            <Form.Control as="textarea" rows={3} />
                        </Form.Group>
                    </Form>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
                <Button variant="danger" onClick={props.onApprove}>Reject</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default RejectModal;