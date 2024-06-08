// src/components/DoctorList.js
import React, { useState, useEffect } from 'react';
import DoctorProfile from './DoctorProfile';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import './DoctorList.css';

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const apiKey = process.env.REACT_APP_API_KEY;
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl + `/GetAllDoctors` + apiKey);
        setDoctors(response.data);
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

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="container">
      <div className="row align-items-center">
        {doctors.map((doctor, index) => (
          <DoctorProfile doctor={doctor} />
        ))}
      </div>
    </div>
  );
};

export default DoctorList;
