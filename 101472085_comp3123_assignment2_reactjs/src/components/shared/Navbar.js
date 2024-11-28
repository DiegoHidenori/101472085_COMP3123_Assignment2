import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <nav>
            <button onClick={() => navigate("/employees")}>Employee List</button>
            <button onClick={handleLogout}>Logout</button>
        </nav>
    );
};

export default Navbar;
