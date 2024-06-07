import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(!!sessionStorage.getItem('auth-token'));
    const authLogin = () => {
        // sessionStorage.setItem('auth-token', 'your-auth-token');
        setIsAuthenticated(true);
    };

    const authLogout = () => {
        sessionStorage.clear();
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, authLogin, authLogout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
