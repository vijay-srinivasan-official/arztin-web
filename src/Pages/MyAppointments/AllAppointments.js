import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import ApproveModal from '../../Components/Modals/ApproveModal.js';
import RejectModal from '../../Components/Modals/RejectModal.js';
import Spinner from 'react-bootstrap/Spinner';
import './AllAppointments.css';

const AllAppointments = (props) => {
    const [records, setRecords] = useState([]);
    const [approvalSelectedRecord, setApprovalSelectedRecord] = useState(null);
    const [rejectionSelectedRecord, setRejectionSelectedRecord] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const formatTime = (dateString) => {
        const options = { hour: 'numeric', minute: 'numeric', hour12: true };
        return new Date(dateString).toLocaleTimeString([], options);
    };

    const fetchData = async () => {
        const apiUrl = process.env.REACT_APP_API_URL;
        const apiKey = process.env.REACT_APP_API_KEY;
        try {
            const requestBody = {
                Id: localStorage.getItem("uid")
            };
            const response = await fetch(apiUrl + `/GetAllAppointments` + apiKey, {
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

    return (
        <div className=''>
            <h2>All appointments</h2>
            {!loading && records.length > 0 && (<div>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>S.No</th>
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
                                <td>{formatTime(record.appointmentTime)}</td>
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
            {records.length === 0 && (<div>No records found</div>)}

            {loading && (<div className='spinner-container'><Spinner animation="grow" /></div>)}

        </div>
    );
};

export default AllAppointments;
