# Use official Node.js image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy only package files first (for efficient caching)
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install --only=production

# Copy all files after dependencies are installed
COPY . .

# Expose port for API Gateway
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
