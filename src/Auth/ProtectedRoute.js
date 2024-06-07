import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
    const authToken = sessionStorage.getItem('auth-token');
    return (
        authToken ? <Outlet></Outlet> : <Navigate to="/login"></Navigate>
    );
};

export default ProtectedRoute;
