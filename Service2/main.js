const express = require('express');
const { execSync } = require('child_process');

const app = express();

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

// Start server on port 5000
app.listen(5000, () => {
    console.log('Service2 running on port 5000');
});
