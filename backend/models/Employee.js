const mongoose = require('mongoose');


// Employee schema
const employeeSchema = new mongoose.Schema({
    "first_name": String,
    "last_name": String,
    "email": String,
    "position": String,
    "salary": Number,
    "date_of_joining": Date,
    "department": String,
    "created_at": Date,
    "updated_at": Date
});


// Employee model
const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;