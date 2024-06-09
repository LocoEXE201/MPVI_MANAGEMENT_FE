# Base image
FROM node:20

# Create app directory
WORKDIR /usr/src/app

# Copy package.json and yarn.lock (if using Yarn) to the working directory
COPY package*.json yarn.lock ./

# Install app dependencies
RUN yarn install --frozen-lockfile

# Bundle app source code
COPY . .

# Build the NestJS application (assuming you have a build script)
RUN npm run dev

# Start the server using the production build
CMD ["node", "dist/main.js"]
