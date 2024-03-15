# Use Node.js 18 as base image
FROM node:18

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install --quiet

# Copy the rest of the application source code
COPY . .

# Expose port
EXPOSE 8070

# Command to run the application
CMD ["npm", "start"]
