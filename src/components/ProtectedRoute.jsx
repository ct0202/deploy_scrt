import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AUTH_TOKEN_KEY } from '../config';

const ProtectedRoute = ({ children }) => {
    const location = useLocation();
    const isAuthenticated = localStorage.getItem(AUTH_TOKEN_KEY);

    if (!isAuthenticated) {
        // Redirect to login page with the return path
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};

export default ProtectedRoute; 