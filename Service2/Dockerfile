# Dockerfile for Service2
FROM node:14

# working directory
WORKDIR /app

# Copy app files
COPY main.js .

# Install express
RUN npm install express

# Install dockerode for docker access
RUN npm install dockerode

# Expose port 5000
EXPOSE 5000

# Run the application
CMD ["node", "main.js"]
