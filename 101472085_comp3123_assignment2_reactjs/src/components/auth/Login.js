import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            // No token, just ensure login works
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_USER_URL}/login`, { email, password });
            if (response.data.token) {
                login(response.data.token);
                alert("Login successful!");
                navigate(`/employees`);
            } else {
                alert("Failed to retrieve token. Please try again.");
            }
        } catch (error) {
            alert("Login failed. Please check your credentials.");
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <h2>Login</h2>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
            />
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;