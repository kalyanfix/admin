# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json /app

# Install application dependencies
RUN npm install

# Copy all application files to the working directory
COPY ./ /app

# Expose port 2352
EXPOSE 3030

# Define the command to start your Node.js application
CMD [ "npm", "run", "dev" ]