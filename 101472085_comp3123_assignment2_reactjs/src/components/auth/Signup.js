import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${process.env.REACT_APP_BACKEND_USER_URL}/signup`, {
                username,
                email,
                password,
            });
            alert("Signup successful! Please login.");
            navigate("/");
        } catch (error) {
            alert("Signup failed: " + error.response?.data?.message || "An error occurred.");
        }
    };

    return (
        <div className="form-material" style={styles.div}>
            <form onSubmit={handleSignup}>
                <h2>Signup</h2>
                <div className="form-group">
                    <label for="username">Username</label>
                    <input
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                        required
                    />
                </div>
                <div className="form-group">
                    <label for="email">Email</label>
                    <input
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
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                    />
                </div>
                <div className="d-flex gap-2">
                    <button type="submit" className="btn btn-primary">Signup</button>
                    <button onClick={() => navigate("/")} className="btn btn-primary">Log In</button>
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

export default Signup;
