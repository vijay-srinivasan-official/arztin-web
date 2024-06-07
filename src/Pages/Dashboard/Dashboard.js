// Dashboard.js
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';

const Dashboard = () => {
    const [records, setRecords] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const requestBody = {
                    Id: sessionStorage.getItem("uid")
                };
                const response = await fetch('http://localhost:7071/api/GetPendingAppointments', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(requestBody),
                });
                const data = await response.json();
                setRecords(data);
            } catch (err) {

            }
        };
        fetchData();
    }, []);

    const handleApprove = (id) => {
        // Handle approve logic here
        console.log(`Record with id ${id} approved`);
    };

    const handleReject = (id) => {
        // Handle reject logic here
        console.log(`Record with id ${id} rejected`);
    };

    return (
        <div>
            <h2>Pending appointments</h2>
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
                            <td>
                                <div className='d-flex gap-2'>
                                    <Button variant="outline-success" onClick={() => handleApprove(record.id)}>Approve</Button>
                                    <Button variant="outline-danger" onClick={() => handleReject(record.id)}>Reject</Button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

        </div>
    );
};

export default Dashboard;
