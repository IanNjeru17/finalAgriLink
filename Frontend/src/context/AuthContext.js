import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const fetchUserProfile = async (token) => {
        try {
            const profileResponse = await axios.get("http://localhost:5000/auth/user-profile", {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            setUser(profileResponse.data);
        } catch (error) {
            console.error("Failed to fetch user profile:", error);
            logout();
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            fetchUserProfile(token);
        }
    }, []);

    const login = async (email, password) => {
        try {
            const response = await axios.post("http://127.0.0.1:5000/auth/login", {
                email,
                password,
            });

            if (response.data.access_token) {
                localStorage.setItem("token", response.data.access_token);
                await fetchUserProfile(response.data.access_token);
                return { role: response.data.role }; 
            } else {
                throw new Error("Login failed. Please check your credentials.");
            }
        } catch (error) {
            const errorMessage = error.response
                ? error.response.data.msg || "Login failed. Please check your credentials."
                : "Login failed. Please try again later.";
            throw new Error(errorMessage);
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("token");
    };

    const hasRole = (role) => {
        return user && user.role === role;
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, hasRole }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use auth context
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
