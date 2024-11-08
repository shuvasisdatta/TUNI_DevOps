const express = require('express');
const { execSync } = require('child_process');
const Docker = require('dockerode');

const app = express();

// Create Docker instance using the Docker socket
const docker = new Docker({
    socketPath: '/var/run/docker.sock'  // Path to the Docker socket inside the container
  });

// Function to get system information
function getSysInfo() {
    // Get the container IP address
    const ipAddress = execSync("hostname -I").toString().trim();
    
    // Get the list of running processes
    const processes = execSync("ps -ax").toString();
    
    // Get available disk space
    const diskSpace = execSync("df -h /").toString();
    
    // Get time since last boot
    const uptime = execSync("uptime -p").toString().trim();
    
    // Return system information
    return {
        "IP Address": ipAddress,
        "Processes": processes,
        "Disk Space": diskSpace,
        "Uptime": uptime
    };
}

// Endpoint to provide system information
app.get('/info', (req, res) => {
    res.json(getSysInfo());
});


// Route to handle the shutdown request (called by STOP button)
app.post('/stop', async (req, res) => {
    try {
      // Stop and remove all containers
      console.log('Stopping and removing containers...');
      docker.listContainers(function (err, containers) {
        containers.forEach(function (containerInfo) {
          docker.getContainer(containerInfo.Id).stop();
        });
      });
      res.send('All containers stopped successfully.');
    } catch (error) {
      console.error('Error while stopping containers:', error);
      res.status(500).send('Failed to stop containers.');
    }
});

// Start server on port 5000
app.listen(5000, () => {
    console.log('Service2 running on port 5000');
});
