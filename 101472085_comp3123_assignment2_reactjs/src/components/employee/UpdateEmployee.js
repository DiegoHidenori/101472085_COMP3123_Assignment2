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
        <form onSubmit={handleUpdate} className="list-group list-group-flush" style={styles.form}>
            <h2>Update Employee</h2>
            <div>
                <label className="form-label">First Name</label>
                <input
                    type="text"
                    value={employee.first_name || ""}
                    onChange={(e) => setEmployee({ ...employee, first_name: e.target.value })}
                    placeholder="First Name"
                    required
                    className="form-control"
                />
            </div>
            <div>
                <label className="form-label">Last Name</label>
                <input
                    type="text"
                    value={employee.last_name || ""}
                    onChange={(e) => setEmployee({ ...employee, last_name: e.target.value })}
                    placeholder="Last Name"
                    required
                    className="form-control"
                />
            </div>
            <div>
                <label className="form-label">Email</label>
                <input
                    type="email"
                    value={employee.email || ""}
                    onChange={(e) => setEmployee({ ...employee, email: e.target.value })}
                    placeholder="Email"
                    required
                    className="form-control"
                />
            </div>
            <div>
                <label className="form-label">Position</label>
                <input
                    type="text"
                    value={employee.position || ""}
                    onChange={(e) => setEmployee({ ...employee, position: e.target.value })}
                    placeholder="Position"
                    required
                    className="form-control"
                />
            </div>
            <div>
                <label className="form-label">Salary</label>
                <input
                    type="number"
                    value={employee.salary || ""}
                    onChange={(e) => setEmployee({ ...employee, salary: e.target.value })}
                    placeholder="Salary"
                    required
                    className="form-control"
                />
            </div>
            <div>
                <label className="form-label">Department</label>
                <input
                    type="text"
                    value={employee.department || ""}
                    onChange={(e) => setEmployee({ ...employee, department: e.target.value })}
                    placeholder="Department"
                    required
                    className="form-control"
                />
            </div>
            <button type="submit" className="btn">Update Employee</button>
        </form>
    );
};

const styles = {
    form: {
        padding: "15px",
    }
}

export default UpdateEmployee;
