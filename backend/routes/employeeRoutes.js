const express = require('express');
const router = express.Router();
// const Employee = require('../model/employee');  // Import the employee model
const Employee = require('../model/Employee'); // Import the employee model
const { body, validationResult } = require('express-validator');    // For validation


// GET method to get all employees
router.get('/employees', async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).json({ status: true, employees });
    } catch (err) {
        res.status(500).json({ status: false, message: err.message });
    }
});


// POST method to create an employee
router.post('/employees', [
    body('first_name').notEmpty().withMessage('First name is required'),
    body('last_name').notEmpty().withMessage('Last name is required'),
    body('email').isEmail().withMessage('Invalid email'),
    body('position').notEmpty().withMessage('Position is required'),
    body('salary').isNumeric().withMessage('Invalid salary'),
    body('date_of_joining').isISO8601().withMessage('Invalid date format'),
    body('department').notEmpty().withMessage('Department is required')
], async (req, res) => {
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
});


// GET method to get an employee by id
router.get('/employees/:eid', async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.eid);
        if (!employee) {
            return res.status(404).json({ status: false, message: 'Employee not found' });
        }
        res.status(200).json({ status: true, employee});
    } catch (err) {
        res.status(500).json({ status: false, message: err.message });
    }
});


// PUT method to update an employee
router.put('/employees/:eid', [
    body('firstName').optional().notEmpty().withMessage('First name is required'),
    body('lastName').optional().notEmpty().withMessage('Last name is required'),
    body('email').optional().isEmail().withMessage('Invalid email'),
    body('position').optional().notEmpty().withMessage('Position is required'),
    body('salary').optional().isNumeric().withMessage('Invalid salary'),
    body('date_of_joining').optional().isISO8601().withMessage('Invalid date format'),
    body('department').optional().notEmpty().withMessage('Department is required')
], async (req, res) => {
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
});


// DELETE method to delete an employee by id
router.delete('/employees', async (req, res) => {
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
});

module.exports = router;