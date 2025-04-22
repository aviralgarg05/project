import os
from flask import Blueprint, request, jsonify
from twilio.rest import Client
from twilio.base.exceptions import TwilioRestException

main = Blueprint('emergency', __name__)

# ← hard‑coded credentials for test only
TWILIO_ACCOUNT_SID   = 'AC443ff39b8848da1bb5c5608da917a8f6'
TWILIO_AUTH_TOKEN    = 'cf7fc928cc6f0f8e9f0a3ad5d738c35d'
TWILIO_PHONE_NUMBER  = '+13156704064'
EMERGENCY_NUMBER     = '+919971195728'

# strip whitespace and verify
sid = TWILIO_ACCOUNT_SID.strip()
token = TWILIO_AUTH_TOKEN.strip()
print("Using SID:", repr(sid))
print("Using TOKEN:", repr(token))

client = Client(sid, token)

@main.route('/send', methods=['POST'])
def send_emergency():
    data    = request.get_json() or {}
    name    = data.get('name', 'Unknown')
    address = data.get('address', 'Unknown')
    phone   = data.get('phone', EMERGENCY_NUMBER)

    try:
        msg = client.messages.create(
            body=f"EMERGENCY from {name}\nAddress: {address}\nPhone: {phone}",
            from_=TWILIO_PHONE_NUMBER,
            to=EMERGENCY_NUMBER
        )
    except TwilioRestException as e:
        return jsonify({'error': e.msg, 'twilio_code': e.code}), 400

    return jsonify({'sms_sid': msg.sid}), 200

