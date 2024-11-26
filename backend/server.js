require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const userRouter = require('./api/v1/user/userRoute'); // Import the user router
const employeeRouter = require('./api/v1/emp/employeeRoute'); // Import the employee router
const errorHandlerMiddleware = require('./api/errorHandlerMiddleware');
const connectDB = require('./api/db');  // Import the database connection
// const loggerMiddleware = require('./api/loggerMiddleware'); // Import the logger middleware


app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Can send any type of data?

const loggerMiddleware = (req, res, next) => {
    console.log(`Logged ${req.url} ${req.method} -- ${new Date()}`);
    next();
};


// Connect to the database
connectDB();

app.use(loggerMiddleware);

app.use('/api/v1/user', userRouter);
app.use('/api/v1/emp', employeeRouter);

app.get('/error', (req, res) => {
    throw new Error('This is a forced error');
    res.send('Error');
});

// // http://localhost:3000/err
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


// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;