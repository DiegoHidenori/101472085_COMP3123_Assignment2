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
        <div className="form-material" style={styles.div}>
            <form onSubmit={handleLogin}>
                <h2>Login</h2>
                <div className="form-group">
                    <label for="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="example@example.com"
                        required
                    />
                </div>
                <div className="form-group">
                    <label for="password">Password</label>
                    <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                    />
                </div>
                <div className="d-flex gap-2">
                    <button type="submit" className="btn btn-primary">Login</button>
                    <button onClick={() => navigate("/signup")} className="btn btn-primary">Sign Up</button>
                </div>
            </form>
        </div>
    );
};

const styles = {
    div: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "50%"
    }
}

export default Login;