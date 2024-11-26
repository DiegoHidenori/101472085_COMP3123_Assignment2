const express = require('express');
const errorHandlerMiddleware = require('./middlewares/errorHandlerMiddleware');
const cors = require('cors');
const userRouter = require('./routes/userRoutes');
const employeeRouter = require('./routes/employeeRoutes');

const app = express();

// Middleware to parse incoming JSON and URL-encoded data
app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Allows sending form-like data

const loggerMiddleware = (req, res, next) => {
  console.log(`Logged ${req.url} ${req.method} -- ${new Date()}`);
  next();
};

app.use(loggerMiddleware);

app.use('/api/v1/user', userRouter);
app.use('/api/v1/emp', employeeRouter);

// Example route for testing errors
// http://localhost:3000/err
app.get('/error', (req, res) => {
    throw new Error('This is a forced error');
    res.send('Error');
});

// http://localhost:3000/err
// app.get('/err', (req, res) => {
//   try {
//     throw new Error('This is a forced error');
//     res.send('Error');
//   } catch (err) {
//     next(err);
//     res.status(500).send('Error');
//   }
// });

app.use(errorHandlerMiddleware);

module.exports = app;