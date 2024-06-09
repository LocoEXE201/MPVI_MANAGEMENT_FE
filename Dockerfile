# Base image
FROM node:20

# Create app directory
WORKDIR /usr/src/app

# Copy package.json and yarn.lock (if using Yarn) to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm i

# Bundle app source code
COPY . .

# Build the NestJS application (assuming you have a build script)
RUN npm run dev

# Start the server using the production build
CMD [ "npm", "run", "start:dev" ]
