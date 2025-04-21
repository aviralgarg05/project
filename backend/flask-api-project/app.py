from flask import Flask
from dotenv import load_dotenv
import os

# Load .env variables
load_dotenv()

from routes.sms import main as sms_blueprint

app = Flask(__name__)
app.register_blueprint(sms_blueprint, url_prefix='/api')

if __name__ == '__main__':
    # Default port 5000; debug on for auto-reload
    app.run(host='0.0.0.0', port=5000, debug=True)
