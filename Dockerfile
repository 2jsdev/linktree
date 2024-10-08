FROM node:20.16-alpine

# Set working directory

# Set environment variables
ENV NODE_ENV=production

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy the rest of the application files
COPY . .

# Expose the port that the app will run on
EXPOSE 3000

# Start the app
CMD ["npm", "run", "start"]
