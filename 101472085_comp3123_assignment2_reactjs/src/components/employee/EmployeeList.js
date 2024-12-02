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
        <div className="div-center">
            <h1>Employee List</h1>
            <button onClick={() => navigate("/employees/add")} className="btn btn-primary">Add Employee</button>
            <table className="table table-center">
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
                            <td className="d-flex gap-2">
                                <button onClick={() => employeeDetails(emp._id)} className="btn btn-primary">Details</button>
                                <button onClick={() => editEmployee(emp._id)} className="btn btn-warning">Edit</button>
                                <button onClick={() => deleteEmployee(emp._id)} className="btn btn-danger">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EmployeeList;
