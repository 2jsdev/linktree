FROM node:20.16-alpine

# Set working directory

ENV NODE_ENV=production

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Copy the built application files
COPY .next ./.next
COPY next.config.mjs ./next.config.mjs
COPY public ./public
COPY ./.next/static ./_next/static
COPY package.json package-lock.json ./

# Expose the port the app will run on
EXPOSE 3000

# Start the app
CMD ["npm", "run", "start"]