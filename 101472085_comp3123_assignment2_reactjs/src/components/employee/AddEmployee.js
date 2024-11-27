import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddEmployee = () => {
    const [ firstName, setFirstName ] = useState("");
    const [ lastName, setLastName ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ position, setPosition ] = useState("");
    const [ salary, setSalary ] = useState("");
    const [ department, setDepartment ] = useState("");
    const [ date_of_joining, setDateOfJoining ] = useState("");
    const navigate = useNavigate();

    const handleAdd = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${process.env.REACT_APP_BACKEND_EMP_URL}/employees`, {
                first_name: firstName,
                last_name: lastName,
                email,
                position,
                salary,
                department,
                date_of_joining: new Date()
            });
            alert("Employee added successfully!");
            navigate("/employees");
        } catch (error) {
            alert("Failed to add employee.");
        }
    };

    return (
        <form onSubmit={handleAdd}>
            <h2>Add Employee</h2>
            <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First Name" required />
            <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last Name" required />
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
            <input type="text" value={position} onChange={(e) => setPosition(e.target.value)} placeholder="Position" required />
            <input type="number" value={salary} onChange={(e) => setSalary(e.target.value)} placeholder="Salary" required />
            <input type="text" value={department} onChange={(e) => setDepartment(e.target.value)} placeholder="Department" required />
            <button type="submit">Add Employee</button>
        </form>
    );
};

export default AddEmployee;
