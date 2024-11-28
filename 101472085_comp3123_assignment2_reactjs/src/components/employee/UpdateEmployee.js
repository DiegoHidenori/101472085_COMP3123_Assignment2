import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

const UpdateEmployee = () => {
    const { id } = useParams();
    const [employee, setEmployee] = useState({});
    const navigate = useNavigate();
    const { token } = useContext(AuthContext);

    useEffect(() => {
        const fetchEmployeeById = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_EMP_URL}/employees/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setEmployee(response.data.employee);
            } catch (error) {
                console.error("Error fetching employees:", error);
                alert('Error fetching employee details: ' + error.message);
            }
        };

        fetchEmployeeById();
    }, [token, id]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`${process.env.REACT_APP_BACKEND_EMP_URL}/employees/${id}`, 
                employee,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            );
            alert("Employee updated successfully: " + response.data.employee._id);
            navigate("/employees");
        } catch (error) {
            alert("Failed to update employee.");
        }
    };

    return (
        <form onSubmit={handleUpdate}>
            <h2>Update Employee</h2>
            <input
                type="text"
                value={employee.first_name || ""}
                onChange={(e) => setEmployee({ ...employee, first_name: e.target.value })}
                placeholder="First Name"
                required
            />
            <input
                type="text"
                value={employee.last_name || ""}
                onChange={(e) => setEmployee({ ...employee, last_name: e.target.value })}
                placeholder="Last Name"
                required
            />
            <input
                type="email"
                value={employee.email || ""}
                onChange={(e) => setEmployee({ ...employee, email: e.target.value })}
                placeholder="Email"
                required
            />
            <input
                type="text"
                value={employee.position || ""}
                onChange={(e) => setEmployee({ ...employee, position: e.target.value })}
                placeholder="Position"
                required
            />
            <input
                type="number"
                value={employee.salary || ""}
                onChange={(e) => setEmployee({ ...employee, salary: e.target.value })}
                placeholder="Salary"
                required
            />
            <input
                type="text"
                value={employee.department || ""}
                onChange={(e) => setEmployee({ ...employee, department: e.target.value })}
                placeholder="Department"
                required
            />
            <button type="submit">Update Employee</button>
        </form>
    );
};

export default UpdateEmployee;
