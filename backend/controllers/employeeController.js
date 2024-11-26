const Employee = require('../models/Employee');
const { validationResult } = require('express-validator');

const rootRoute = async (req, res) => {
    res.send('Root route inside employeeController.js file');
};

const getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).json({ status: true, employees });
    } catch (err) {
        res.status(500).json({ status: false, message: err.message });
    }
};

const createEmployee = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ status: false, message: errors.array() });
    }

    const { first_name, last_name, email, position, salary, date_of_joining, department } = req.body;


    // To check if the employee already exists
    const existingEmployee = await Employee.findOne({ email });
    if (existingEmployee) {
        return res.status(409).json({ status: false, message: 'Employee already exists :(' });
    }


    const newEmployee = new Employee({
        first_name,
        last_name,
        email,
        position,
        salary,
        date_of_joining,
        department,
        created_at: new Date(),
        updated_at: new Date()
    });

    try {
        await newEmployee.save();
        return res.status(201).json({ status: true, message: 'Employee created successfully.', employee_id: newEmployee._id });
    } catch (err) {
        return res.status(500).json({ status: false, message: err.message });
    }
};

const getEmployeeById = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.eid);
        if (!employee) {
            return res.status(404).json({ status: false, message: 'Employee not found' });
        }
        res.status(200).json({ status: true, employee});
    } catch (err) {
        res.status(500).json({ status: false, message: err.message });
    }
};

const updateEmployee = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ status: false, message: errors.array() });
    }

    const { eid } = req.params;
    const updates = req.body;


    // Check if updates are given
    if (Object.keys(updates).length === 0) {
        return res.status(400).json({ status: false, message: 'No updates provided.' });
    }

    try {
        const employeeUpdate = await Employee.findByIdAndUpdate(eid, updates, { new: true });

        if (!employeeUpdate) {
            return res.status(404).json({ status: false, message: 'Employee not found' });
        }

        res.status(200).json({ status: true, message: 'Employee updated', employee: employeeUpdate });
    } catch (err) {
        res.status(500).json({ status: false, message: err.message });
    }
};

const deleteEmployee = async (req, res) => {
    const { eid } = req.query;

    if (!eid) {
        return res.status(400).json({ status: false, message: 'Employee ID is required.' });
    }

    try {
        const employeeDelete = await Employee.findByIdAndDelete(eid);

        if (!employeeDelete) {
            return res.status(404).json({ status: false, message: 'Employee not found' });
        }

        res.status(200).json({ status: true, message: 'Employee deleted successfully.' });
    } catch (err) {
        res.status(500).json({ status: false, message: err.message });
    }
};

module.exports = {
    rootRoute,
    getAllEmployees,
    createEmployee,
    getEmployeeById,
    updateEmployee,
    deleteEmployee
};