# Step 1: Use an official Node.js runtime as the base image
FROM node:18-alpine

# Step 2: Set the working directory in the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Step 4: Install the project dependencies inside the container
RUN npm install --production

# Step 5: Copy the rest of your application code to the container
COPY . .

# Step 6: Expose the port on which the app will run (e.g., port 3000)
EXPOSE 3000

# Step 7: Define the command to start your app
CMD ["npm", "start"]
