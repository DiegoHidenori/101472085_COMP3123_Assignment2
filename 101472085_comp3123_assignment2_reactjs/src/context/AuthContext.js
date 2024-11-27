import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token") || "");

    const login = (userToken) => {
        localStorage.setItem("token", userToken);
        setToken(userToken);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setToken("");
    };

    return (
        <AuthContext.Provider value={{ token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
