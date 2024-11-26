# 101472085_COMP3123_Assignment2

## GUIDE FOR RUNNING APP IN PRODUCTION

- Without Docker:
  1. Run:
     - 'npm install' to get all dependencies.
     - 'npm start' to start the application
  2. ...

## Setting up the backend project dependencies

1. Run:

   - npm init -y # '-y' is for default setup
   - npm install express # library is saved in node_modules (Updates package-lock)
   - npm install -D nodemon # '-D' is for devDependencies
   - npm install mongoose
   - npm install mongodb # Omit if used npm install mongoose
   - npm install dotenv # For storing MongoDB connection string
   - npm install bcrypt # For hashing passwords
   - (INSIDE BACKEND DIRECTORY) npx gitignore node

2. Create the database and cluster on MongoDB website

   - Connect > Drivers > Mongoose (Project specific)

3. create a ".env" file

   - Put this code on ".env" file:
     - MONGODB_URI=mongodb+srv://<admin>:<password>@<cluster>.xxxx.mongodb.net/<database>?retryWrites=true&w=majority&appName=<customAppNameInLogs>
     - The url can create the dbcollection if it doensn't exist
     - Make sure network access is set to 0.0.0.0/0 so that any ip can access the database

4. Set up Vercel:
   - Create vercel.json file
   - Push to GitHub
