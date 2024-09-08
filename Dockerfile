FROM node:20.16-alpine

# Set working directory

ENV NODE_ENV=production
# Copy package.json and package-lock.json (if available)
COPY package*.json ./


# Copy the built application files
COPY ./.next ./.next
COPY ./next.config.mjs ./next.config.mjs
COPY ./public ./public
COPY ./.next/static ./_next/static
COPY ./node_modules ./node_modules

EXPOSE 3000

# Start the Node.js server
CMD ["npm", "run", "start"]