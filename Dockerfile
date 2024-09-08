FROM node:20.16-alpine

# Set working directory
WORKDIR /app

# Copy only the built application files that were generated in the CI pipeline
COPY .next ./.next
COPY next.config.mjs ./next.config.mjs
COPY public ./public
COPY package.json package-lock.json ./

# Install only production dependencies
RUN npm ci --only=production

# Expose the port the app will run on
EXPOSE 3000

# Start the app
CMD ["npm", "run", "start"]
