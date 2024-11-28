import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const navigate = useNavigate();
    const { token } = useContext(AuthContext);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_EMP_URL}/employees`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setEmployees(response.data.employees);
            } catch (error) {
                console.error("Error fetching employees:", error);
            }
        };

        fetchEmployees();
    }, [token]);

    const employeeDetails = (id) => {
        navigate(`/employees/${id}`);
    }

    const editEmployee = (id) => {
        navigate(`/employees/edit/${id}`);
    };

    const deleteEmployee = async (id) => {
        try {
            await axios.delete(`${process.env.REACT_APP_BACKEND_EMP_URL}/employees?eid=${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setEmployees((prev) => prev.filter((emp) => emp._id !== id));
            alert("Employee deleted successfully!");
        } catch (error) {
            console.error("Error deleting employee:", error);
            alert("Failed to delete employee.");
        }
    };

    return (
        <div>
            <h1>Employee List</h1>
            <button onClick={() => navigate("/employees/add")}>Add Employee</button>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Department</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((emp) => (
                        <tr key={emp.id}>
                            <td>
                                {emp.first_name} {emp.last_name}
                            </td>
                            <td>{emp.department}</td>
                            <td>
                                <button onClick={() => employeeDetails(emp._id)}>Details</button>
                                <button onClick={() => editEmployee(emp._id)}>Edit</button>
                                <button onClick={() => deleteEmployee(emp._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EmployeeList;
