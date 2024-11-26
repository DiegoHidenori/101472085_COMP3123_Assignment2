const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { rootRoute, signUp, login } = require('../controllers/userController');


router.get('/', rootRoute);
router.post(
    '/signup', 
    [
        body('username').notEmpty().withMessage('Username is required'),
        body('email').isEmail().withMessage('Invalid email').notEmpty().withMessage('Email is required'),
        body('password').notEmpty().withMessage('Password is required')
    ], 
    signUp
);


// POST method for the login route
router.post(
    '/login', 
    [
        body('email').isEmail().withMessage('Invalid email').notEmpty().withMessage('Email is required'),
        body('password').notEmpty().withMessage('Password is required')
    ], 
    login
);

module.exports = router;