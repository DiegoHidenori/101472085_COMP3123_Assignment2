# 101472085_COMP3123_Assignment2

## GUIDE FOR RUNNING APP IN PRODUCTION

- Frontend:

  1. Run:
     - 'cd frontend'
     - 'npm install' to get all dependencies.
     - 'npm start' to start the application

- Backend:
  1.  Run:
      - 'cd backend'
      - 'npm install'
      - 'npm start'

## Setting up the backend project

1. Run:

   - npm init -y # '-y' is for default setup
   - npm install express # library is saved in node_modules (Updates package-lock)
   - npm install -D nodemon # '-D' is for devDependencies
   - npm install mongoose mongodb dotenv bcrypt express-validator uuid
   - (INSIDE BACKEND DIRECTORY) npx gitignore node

2. Create the database and cluster on MongoDB website

   - Connect > Drivers > Mongoose (Project specific)
     - This will get you the url for the environment variable

3. create a ".env" file

   - Put this code on ".env" file:
     - MONGODB_URI=mongodb+srv://<admin>:<password>@<cluster>.xxxx.mongodb.net/<database>?retryWrites=true&w=majority&appName=<customAppNameInLogs>
     - The url can create the dbcollection if it doensn't exist
     - Make sure network access is set to 0.0.0.0/0 so that any ip can access the database

4. Set up deployment through Heroku

   - Run:

     - heroku login
     - cd backend
     - git init
     - heroku create

   - Set up the environment variables in Heroku
   - Push code to Heroku:
     - Run:
       1. git add .
       2. git commit -m "..."
       3. heroku git:remote -a <herokuAppName>
       4. git push heroku main
       5. (optional) heroku logs --tail to check logs for errors

## Setting up the frontend project

1. Run:

- npm install axios

4. Set up Vercel:
   - Create vercel.json file
   - Push to GitHub
