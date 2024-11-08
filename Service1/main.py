# service1.py
import json
import subprocess
import time
import requests
from flask import Flask, jsonify

app = Flask(__name__)

# Function to get system information
def get_sysinfo():
    try:
        # Get the IP address
        ip_address = subprocess.getoutput("hostname -I").strip()
        
        # Get the list of running processes
        processes = subprocess.getoutput("ps -ax")
        
        # Get available disk space
        disk_space = subprocess.getoutput("df -h /")
        
        # Get time since last boot
        uptime = subprocess.getoutput("uptime -p")
        
        # System information as a dictionary
        info = {
            "IP Address": ip_address,
            "Processes": processes,
            "Disk Space": disk_space,
            "Uptime": uptime
        }
    except Exception as e:
        # In case of any error in retrieving system info, log and return empty info
        info = {"error": str(e)}

    return info

# Endpoint for HTTP requests
@app.route('/', methods=['GET'])
def get_info():
    # Get information from Service2
    service2_response = requests.get('http://service2:5000/info')
    service2_info = service2_response.json()
    
    # Get Service1's system info
    service1_info = get_sysinfo()
    
    response = {
        "Service1": service1_info,
        "Service2": service2_info
    }

    time.sleep(2)  # Delay for 2 seconds
    return jsonify(response)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8199)
