import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(!!sessionStorage.getItem('auth-token'));
    const login = () => {
        // sessionStorage.setItem('auth-token', 'your-auth-token');
        setIsAuthenticated(true);
    };

    const logout = () => {
        sessionStorage.clear();
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
