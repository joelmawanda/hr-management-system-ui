# Base Image
FROM node:latest

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install

# Copy app files
COPY . .

# Build the app
RUN npm run build

# EXPOSE port 3000
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
