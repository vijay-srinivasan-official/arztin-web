import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import React, { useEffect, useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { useNavigate } from 'react-router-dom';
import { Grid } from '@mui/material';
import DashboardCard from './DashboardCard';
import { FaCouch, FaUsers, FaStore, FaUserPlus, FaClock, FaCheckCircle } from 'react-icons/fa';
import { BiCalendarCheck } from 'react-icons/bi';

function Dashboard() {
    const navigate = useNavigate();
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const handleViewAll = async (e) => {
        navigate('/pending-appointments');
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
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={3}>
                        <DashboardCard
                            icon={<BiCalendarCheck />}
                            label="Total Appointments"
                            value={appointments.totalAppointments}
                            growth="+55%"
                            growthLabel="than last week"
                            route="/all-appointments"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <DashboardCard
                            icon={<FaClock />}
                            label="Pending Appointments"
                            value={appointments.pendingAppointments}
                            growth="+3%"
                            growthLabel="than last month"
                            route="/pending-appointments"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <DashboardCard
                            icon={<FaCheckCircle />}
                            label="Upcoming Appointments"
                            value={appointments.upcomingAppointments}
                            growth={appointments.upcomingAppointments === 0 ? '+0%' : '+1%'}
                            growthLabel="than yesterday"
                            route="/upcoming-appointments"
                        />
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

export default Dashboard;