# Dockerfile for Service1
FROM python:3.9-slim

# Install necessary utilities
RUN apt-get update && apt-get install -y \
  procps \
  util-linux \
  && rm -rf /var/lib/apt/lists/*  # Clean up to reduce image size

# working directory
WORKDIR /app

# Copy application files
COPY main.py .

# Install required packages
RUN pip install flask requests

# Expose port 8199
EXPOSE 8199

# Run the application
CMD ["python", "main.py"]
