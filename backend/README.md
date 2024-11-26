# 101472085_COMP3123_Assignment2

# Setting up the backend project dependencies

1. Run:
   - npm init -y # '-y' is for default setup
   - npm install express # library is saved in node_modules (Updates package-lock)
   - npm install -D nodemon # '-D' is for devDependencies
   - npm install mongoose
   - npm install mongodb # Omit if used npm install mongoose
   - npm install dotenv # For storing MongoDB connection string
   - npm install bcrypt # For hashing passwords
   - (INSIDE BACKEND DIRECTORY) npx gitignore node

## Steps for creating the assignment database

2. Create the database and cluster on MongoDB website
   - Connect > Drivers > Mongoose (Project specific)
3. create a ".env" file
   - Put this code on ".env" file:
     - MONGODB_URI=mongodb+srv://<admin>:<password>@<cluster>.xxxx.mongodb.net/<database>?retryWrites=true&w=majority&appName=<customAppNameInLogs>
     - The url can create the dbcollection if it doensn't exist
     - Make sure network access is set to 0.0.0.0/0 so that any ip can access the database
4. Create a separate "db.js" file

   - Insert this code:
     const mongoose = require('mongoose');

     const mongoURI = 'MONGODB_URI=mongodb+srv://admin:admin123@comp3123-assigment1.djz5i.mongodb.net/?retryWrites=true&w=majority&appName=comp3123-assigment1';

     module.exports = async () => {
     try {
     const dbconnect = await mongoose.connect(mongoURI, {
     useNewUrlParser: true,
     useUnifiedTopology: true,
     })
     console.log(`MongoDB connected: ${dbconnect.connection.host}`);
     }
     catch (error) {
     console.error(`Error: ${error.message}`);
     process.exit(1);
     }
     }
