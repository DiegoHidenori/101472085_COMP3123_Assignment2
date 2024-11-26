const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { 
    rootRoute, 
    getAllEmployees, 
    createEmployee, 
    getEmployeeById,
    updateEmployee,
    deleteEmployee
} = require('../controllers/employeeController');

router.get('/', rootRoute);

router.get('/employees', getAllEmployees);

router.post(
    '/employees', 
    [
        body('first_name').notEmpty().withMessage('First name is required'),
        body('last_name').notEmpty().withMessage('Last name is required'),
        body('email').isEmail().withMessage('Invalid email'),
        body('position').notEmpty().withMessage('Position is required'),
        body('salary').isNumeric().withMessage('Invalid salary'),
        body('date_of_joining').isISO8601().withMessage('Invalid date format'),
        body('department').notEmpty().withMessage('Department is required')
    ],
    createEmployee
);

router.get('/employees/:eid', getEmployeeById);

router.put(
    '/employees/:eid', 
    [
        body('firstName').optional().notEmpty().withMessage('First name is required'),
        body('lastName').optional().notEmpty().withMessage('Last name is required'),
        body('email').optional().isEmail().withMessage('Invalid email'),
        body('position').optional().notEmpty().withMessage('Position is required'),
        body('salary').optional().isNumeric().withMessage('Invalid salary'),
        body('date_of_joining').optional().isISO8601().withMessage('Invalid date format'),
        body('department').optional().notEmpty().withMessage('Department is required')
    ],
    updateEmployee
);

router.delete('/employees', deleteEmployee);

module.exports = router;