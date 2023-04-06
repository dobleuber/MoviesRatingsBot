# Use the official Node.js Alpine image as the base image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the dependencies
RUN yarn install

# Copy the rest of the application code to the working directory
COPY . .

# Expose a TCP port
EXPOSE 3000

# Start the application
CMD ["node", "index.js"]
