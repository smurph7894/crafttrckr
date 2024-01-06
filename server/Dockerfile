# Use the official Node.js image as a base
FROM node:lts-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install npm dependencies
RUN npm i

# Copy the rest of the application files to the working directory
COPY . .

# Expose the port that the Express app runs on
EXPOSE 8000

# Command to start the Express server
CMD ["node", "server.js"]