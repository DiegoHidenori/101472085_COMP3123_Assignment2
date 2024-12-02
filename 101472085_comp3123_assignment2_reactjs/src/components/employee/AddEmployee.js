import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const AddEmployee = () => {
    const [ firstName, setFirstName ] = useState("");
    const [ lastName, setLastName ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ position, setPosition ] = useState("");
    const [ salary, setSalary ] = useState("");
    const [ department, setDepartment ] = useState("");
    const [ date_of_joining, setDateOfJoining ] = useState("");
    const navigate = useNavigate();
    const [ employee, setEmployee ] = useState(null);
    const { token } = useContext(AuthContext);

    // const handleAdd = async () => {
    //     try {
    //         const response = await axios.post(`${process.env.REACT_APP_BACKEND_EMP_URL}/employees`, {
    //             headers: {
    //                 Authorization: `Bearer ${token}`,
    //             },
    //             first_name: firstName,
    //             last_name: lastName,
    //             email,
    //             position,
    //             salary,
    //             department,
    //             date_of_joining: new Date()
    //         });
    //         alert('Employee created successfully: ' + response.data.employee_id);
    //         navigate('/employees');
    //     } catch (error) {
    //         console.error("Error fetching employees:", error);
    //         alert('Error fetching create employee: ' + error.message);
    //     }
    // };

    const handleAdd = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_EMP_URL}/employees`, 
                {
                    first_name: firstName,
                    last_name: lastName,
                    email,
                    position,
                    salary,
                    department,
                    date_of_joining: new Date()
                }, 
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            );
            alert('Employee created successfully: ' + response.data.employee_id);
            navigate("/employees");
        } catch (error) {
            console.error("Error adding employee:", error);
            alert("Failed to add employee.");
        }
    };

    return (
        <form onSubmit={handleAdd} className="list-group list-group-flush" style={styles.form}>
            <h2>Add Employee</h2>
            <div>
                <label className="form-label">First Name</label>
                <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First Name"
                    required
                    className="form-control"
                />
            </div>
            <div>
                <label className="form-label">Last Name</label>
                <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setEmployee(e.target.value)}
                    placeholder="Last Name"
                    required
                    className="form-control"
                />
            </div>
            <div>
                <label className="form-label">Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmployee(e.target.value)}
                    placeholder="Email"
                    required
                    className="form-control"
                />
            </div>
            <div>
                <label className="form-label">Position</label>
                <input
                    type="text"
                    value={position}
                    onChange={(e) => setEmployee(e.target.value)}
                    placeholder="Position"
                    required
                    className="form-control"
                />
            </div>
            <div>
                <label className="form-label">Salary</label>
                <input
                    type="number"
                    value={salary}
                    onChange={(e) => setEmployee(e.target.value)}
                    placeholder="Salary"
                    required
                    className="form-control"
                />
            </div>
            <div>
                <label className="form-label">Department</label>
                <input
                    type="text"
                    value={department}
                    onChange={(e) => setEmployee(e.target.value)}
                    placeholder="Department"
                    required
                    className="form-control"
                />
            </div>
            <button type="submit" className="btn btn-primary">Add Employee</button>
        </form>
    );
};

{/* <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First Name" required />
<input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last Name" required />
<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
<input type="text" value={position} onChange={(e) => setPosition(e.target.value)} placeholder="Position" required />
<input type="number" value={salary} onChange={(e) => setSalary(e.target.value)} placeholder="Salary" required />
<input type="text" value={department} onChange={(e) => setDepartment(e.target.value)} placeholder="Department" required /> */}

const styles = {
    form: {
        padding: "15px",
    }
}

export default AddEmployee;
