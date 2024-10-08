# Dockerfile for Service1
FROM python:3.9-slim

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
