FROM node:20.9.0

# Set the timezone to Asia/Kolkata
ENV TZ=Asia/Kolkata

# Setting the working directory on the Docker image
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of the files into the image
COPY . .

# Expose application port
EXPOSE 7777

# Start the application
CMD [ "npm start" ]