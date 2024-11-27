import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const EmployeeDetails = () => {
    const { id } = useParams();
    const [ employee, setEmployee ] = useState(null);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_EMP_URL}/employees/${id}`)
            .then((response) => setEmployee(response.data.employee))
            .catch((error) => alert("Error fetching employee details: " + error.message));
    }, [id]);

    if (!employee) return <p>Loading...</p>;

    return (
        <div>
            <h2>Employee Details</h2>
            <p>Name: {employee.first_name} {employee.last_name}</p>
            <p>Email: {employee.email}</p>
            <p>Position: {employee.position}</p>
            <p>Salary: {employee.salary}</p>
            <p>Department: {employee.department}</p>
        </div>
    );
};

export default EmployeeDetails;
