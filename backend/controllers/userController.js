const User = require('../models/User');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

// Root route handler
const rootRoute = async (req, res) => {
  res.send('Root route inside userRoute.js file');
};

// Signup handler
const signUp = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ status: false, errors: errors.array() });
  }

  const { username, email, password } = req.body;

  // Check if the user already exists
  const existingUser = await User.findOne({ $or: [{ username }, { email }] });
  if (existingUser) {
    return res.status(409).json({ status: false, message: 'User already exists :(' });
  }

  // Create and store the new user
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    return res.status(201).json({
      status: true,
      message: 'User created successfully.',
      user_id: newUser._id,
    });
  } catch (err) {
    return res.status(500).json({ status: false, message: err.message });
  }
};

// Login handler
const login = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ status: false, errors: errors.array() });
  }

  const { email, password } = req.body;

  // Find the user
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ status: false, message: 'Invalid username or password' });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ status: false, message: 'Invalid password' });
  }

  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  return res.status(200).json({ status: true, message: 'Login successful.', token });
};

module.exports = {
  rootRoute,
  signUp,
  login,
};
