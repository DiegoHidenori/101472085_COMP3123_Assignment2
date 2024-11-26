const mongoose = require('mongoose');

// const mongoURI = 'mongodb+srv://admin:admin123@comp3123-assignment1.djz5i.mongodb.net/?retryWrites=true&w=majority&appName=comp3123-assignment1';
// const mongoURI = 'mongodb+srv://admin:admin123@comp3123-assignment1.djz5i.mongodb.net/comp3123_assignment1?retryWrites=true&w=majority&appName=comp3123-assignment1';
const mongoURI = process.env.MONGODB_URI;

const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log(`MongoDB connected: ${mongoURI}`);
    }
    catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}

module.exports = connectDB;