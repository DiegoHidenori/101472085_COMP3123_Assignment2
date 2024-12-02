import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

const EmployeeDetails = () => {
    const { id } = useParams();
    const [ employee, setEmployee ] = useState(null);
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

    // useEffect(() => {
    //     axios.get(`${process.env.REACT_APP_BACKEND_EMP_URL}/employees/${id}`)
    //         .then((response) => setEmployee(response.data.employee))
    //         .catch((error) => alert("Error fetching employee details: " + error.message));
    // }, [id]);

    if (!employee) return <p>Loading...</p>;

    return (
        <div style={styles.div} className="list-group list-group-flush">
            <h2 className="list-group-item">Employee Details</h2>
            <p className="list-group-item">Name: {employee.first_name} {employee.last_name}</p>
            <p className="list-group-item">Email: {employee.email}</p>
            <p className="list-group-item">Position: {employee.position}</p>
            <p className="list-group-item">Salary: {employee.salary}</p>
            <p className="list-group-item">Department: {employee.department}</p>
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

export default EmployeeDetails;
