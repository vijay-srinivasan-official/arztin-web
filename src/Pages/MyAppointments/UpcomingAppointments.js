import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import ApproveModal from '../../Components/Modals/ApproveModal.js';
import RejectModal from '../../Components/Modals/RejectModal.js';
import Spinner from 'react-bootstrap/Spinner';
import './UpcomingAppointments.css';

const UpcomingAppointments = (props) => {
    const [records, setRecords] = useState([]);
    const [approvalSelectedRecord, setApprovalSelectedRecord] = useState(null);
    const [rejectionSelectedRecord, setRejectionSelectedRecord] = useState(null);
    const [loading, setLoading] = useState(true);

    const [showApprove, setShowApprove] = useState(false);
    const [showReject, setShowReject] = useState(false);
    const handleClose = () => {
        setShowApprove(false);
        setShowReject(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const apiUrl = process.env.REACT_APP_API_URL;
        const apiKey = process.env.REACT_APP_API_KEY;
        try {
            const requestBody = {
                Id: sessionStorage.getItem("uid")
            };
            const response = await fetch(apiUrl + `/UpcomingAppointments` + apiKey, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });
            const data = await response.json();
            setRecords(data);
            setLoading(false);
        } catch (err) {

        }
    };

    const handleApprove = (record) => {

        setShowApprove(true);
        setApprovalSelectedRecord(record);
        // Handle approve logic here
        console.log(`Record with id ${record.appointmentId} approved`);
    };

    const handleReject = (record) => {
        setShowReject(true);
        setRejectionSelectedRecord(record);
        // Handle reject logic here
        console.log(`Record with id ${record.appointmentId} rejected`);
    };

    return (
        <div className=''>
            {!loading && (<div><h2>Upcoming appointments</h2>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {records.map((record, index) => (
                            <tr key={record.id}>
                                <td>{index + 1}</td>
                                <td>{record.patientName}</td>
                                <td>{new Date(record.appointmentTime).toLocaleDateString()}</td>
                                <td>{new Date(record.appointmentTime).toLocaleTimeString()}</td>
                                <td>{record.appointmentStatus}</td>
                            </tr>
                        ))}

                        {approvalSelectedRecord && (
                            <ApproveModal
                                show={!!approvalSelectedRecord}
                                props={approvalSelectedRecord}
                                onHide={() => {
                                    setApprovalSelectedRecord(null);
                                    fetchData();
                                }}
                            />
                        )}

                        {rejectionSelectedRecord && (
                            <RejectModal
                                show={!!rejectionSelectedRecord}
                                props={rejectionSelectedRecord}
                                onHide={() => {
                                    setRejectionSelectedRecord(null);
                                    fetchData();
                                }}
                            />
                        )}
                    </tbody>
                </Table></div>)}

            {loading && (<div className='spinner-container'><Spinner animation="grow" /></div>)}

        </div>
    );
};

export default UpcomingAppointments;
