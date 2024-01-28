# Use the official Node.js image as a base image
FROM node:18

ENV DATABASE_HOST mongodb

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the entire project to the working directory
COPY . .

# Expose the port on which the application will run
EXPOSE 3000

# Command to run the application
CMD ["npm", "run", "start:dev"]
