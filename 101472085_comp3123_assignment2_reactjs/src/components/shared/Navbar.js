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
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <button onClick={() => navigate("/employees")} className="nav-link active">Employee List</button>
                <button onClick={handleLogout} className="nav-link active">Logout</button>
            </div>
        </nav>
    );
};

export default Navbar;
