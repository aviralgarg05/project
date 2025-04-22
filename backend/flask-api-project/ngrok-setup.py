#!/usr/bin/env python
"""
Script to start Flask API with ngrok for public access.
This script properly manages ngrok tunnels to avoid session limit errors.
"""
import os
import sys
import subprocess
import time
import webbrowser
from pyngrok import ngrok, conf
from pyngrok.exception import PyngrokNgrokError

# Kill any existing ngrok processes
os.system("pkill -f ngrok")  # Unix/Mac
os.system("taskkill /f /im ngrok.exe")  # Windows (will fail silently on Mac)

# Set port
PORT = int(os.getenv('PORT', 5001))

def start_ngrok():
    print("Setting up ngrok tunnel...")
    try:
        # Configure ngrok (set auth token if you have one)
        # conf.get_default().auth_token = "your_auth_token_here"
        
        # Start a new tunnel
        public_url = ngrok.connect(PORT).public_url
        print(f"🚀 Public ngrok URL: {public_url}/api/emergency/send")
        print(f"📝 Test this endpoint with: curl -X POST {public_url}/api/emergency/send -H 'Content-Type: application/json' -d '{{}}'")
        # Open browser to tunnel info
        webbrowser.open(f"http://127.0.0.1:4040")
        return public_url
    except PyngrokNgrokError as e:
        print(f"⚠️ Ngrok error: {e}")
        print("Try killing any existing ngrok sessions manually")
        return None

# Start ngrok
url = start_ngrok()

# Start Flask app
if url:
    print(f"Starting Flask API on port {PORT}...")
    subprocess.call(["python", "server.py"])
else:
    print("Failed to start ngrok, exiting")
