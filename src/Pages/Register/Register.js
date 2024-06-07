import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Auth/AuthContext';

const Register = () => {
    const { isAuthenticated, authRegister } = useAuth();
    const navigate = useNavigate();
    const [validated, setValidated] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleRegister = async (e) => {
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
            return;
        }
        setValidated(true);

        if (formData.email !== '' && formData.email.includes('@') && formData.email.includes('.') && formData.password !== '') {
            e.preventDefault();
            // Call your API to submit form data
            try {
                const requestBody = {
                    Email: formData.email,
                    Password: formData.password
                };
                const response = await fetch(' https://arztin-fa.azurewebsites.net/api/SignIn?code=9KCl0n7yVGpCup9396UnPw0l8k_WkEk3cunbK1Xrj5S4AzFuEh1LHQ%3D%3D', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(requestBody),
                });
                const data = await response.json();
                if (data.error)
                    alert(data.error);
                else {
                    sessionStorage.setItem("auth-token", data.access_token);
                    sessionStorage.setItem("expires_at", data.expires_at);
                    sessionStorage.setItem("refresh-token", data.refresh_token);
                    sessionStorage.setItem("uid", data.user.id);
                    authRegister();
                    navigate('/dashboard');
                }
                // Reset form after successful submission
                setValidated(false);
                setFormData({
                    email: '',
                    password: '',
                });
            } catch (error) {
                console.error('Error submitting form:', error);
            }
        }
    };

    return (
        <Row className="w-100">
            <Col md={6} lg={4} className="mx-auto">
                <div className='company-title'>
                    <img src="arztin-logo.svg" alt="Company Logo" className="logo" />
                    <img src="arztin.svg" alt="Company Logo" className="logo" />
                </div>
                <h3 className="mb-4">Register</h3>
                <Form noValidate validated={validated}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword" className="mt-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required />
                    </Form.Group>

                    <small className='mt-4 float-right'>Already a user? <a href='/login'> Login here</a> </small>

                    <Button variant="primary" className="w-100 mt-4" onClick={handleRegister}>
                        Register
                    </Button>
                </Form>
            </Col>
        </Row>
    );
}

export default Register;
