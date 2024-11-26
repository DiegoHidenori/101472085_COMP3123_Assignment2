const express = require('express');
const router = express.Router();
const User = require('../model/User'); // Import the user model
const bcrypt = require('bcrypt'); // To hash password
const { body, validationResult } = require('express-validator');    // For validation
// const connectDB = require('../db');  // Import the database connection
// const errorHandlerMiddleware = require('../errorHandlerMiddleware'); // Import the error handler middleware


// Root route, extra
router.get('/', async (req, res) => {
    res.send('Root route inside userRoute.js file');
});


// POST method for the sign up route
router.post('/signup', [
    body('username').notEmpty().withMessage('Username is required'),
    body('email').isEmail().withMessage('Invalid email').notEmpty().withMessage('Email is required'),
    body('password').notEmpty().withMessage('Password is required')
], async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ status: false, errors: errors.array() });
    }

    const { username, email, password } = req.body;


    // To check if the user already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
        return res.status(409).json({ status: false, message: 'User already exists :(' });
    }


    // To create the user and store it
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
        username,
        email,
        password: hashedPassword
    });

    try {
        await newUser.save();
        return res.status(201).json({ status: true, message: 'User created successfully.', user_id: newUser._id });
    } catch (err) {
        return res.status(500).json({ status: false, message: err.message });
    }
});


// POST method for the login route
router.post('/login', [
    body('email').isEmail().withMessage('Invalid email').notEmpty().withMessage('Email is required'),
    body('password').notEmpty().withMessage('Password is required')
], async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ status: false, errors: errors.array() });
    }

    const { email, password } = req.body;


    // To find the user
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(401).json({ status: false, message: 'Invalid username or password' });
    }


    // To check for the hashed password match
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({ status: false, message: 'Invalid password' });
    }

    return res.status(200).json({ status: true, message: 'Login successful.' });
});

module.exports = router;