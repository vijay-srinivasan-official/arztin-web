import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import React, { useEffect, useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
    const navigate = useNavigate();
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const handleViewAll = async (e) => {
        navigate('/my-appointments');
    }

    useEffect(() => {
        const apiUrl = process.env.REACT_APP_API_URL;
        const apiKey = process.env.REACT_APP_API_KEY;
        const fetchData = async () => {
            try {
                const requestBody = {
                    Id: sessionStorage.getItem("uid")
                };
                const response = await fetch(apiUrl + `/DashboardDetails` + apiKey, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(requestBody),
                });
                const data = await response.json();
                setAppointments(data);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div className='spinner-container'><Spinner animation="grow" /></div>;
    }

    return (
        <div>
            <h2>Dashboard</h2>
            <div className='row gap-3'>
                <Card style={{ width: '18rem' }}>
                    {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
                    <Card.Body>
                        <Card.Title>Total Appointments</Card.Title>
                        <Card.Text>
                            <h3> {appointments.totalAppointments} </h3>
                            {/* <p>Hooray! You successfully handled an incredible [Total Appointments] appointments as of today! This outstanding achievement reflects an unwavering dedication and commitment to providing excellent patient care and maintaining a consistent schedule. Keep up the fantastic work!</p> */}
                        </Card.Text>
                        <Button variant="primary">Explore</Button>
                    </Card.Body>
                </Card>
                <Card style={{ width: '18rem' }}>
                    {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
                    <Card.Body>
                        <Card.Title>Upcoming Appointments</Card.Title>
                        <Card.Text>
                            <h3> {appointments.upcomingAppointments} </h3>

                        </Card.Text>
                        <Button variant="primary" onClick={handleViewAll}>View all</Button>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
}

export default Dashboard;