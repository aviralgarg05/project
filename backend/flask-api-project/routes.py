from flask import Blueprint, request, jsonify
from twilio.rest import Client
import os

main = Blueprint('main', __name__)

# Read credentials from environment
TWILIO_ACCOUNT_SID = os.getenv('TWILIO_ACCOUNT_SID')
TWILIO_AUTH_TOKEN  = os.getenv('TWILIO_AUTH_TOKEN')
TWILIO_PHONE_NUMBER= os.getenv('TWILIO_PHONE_NUMBER')

@main.route('/submit', methods=['POST'])
def submit():
    data = request.get_json() or {}
    name            = data.get('name')
    address         = data.get('address')
    phone           = data.get('phone')
    emergency_number= data.get('emergency_number')

    # Validate input
    if not all([name, address, phone, emergency_number]):
        return jsonify({"error": "All fields are required"}), 400

    client = Client(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)

    # 1️⃣ Send SMS back to user
    try:
        message = client.messages.create(
            body=f"Name: {name}\nAddress: {address}\nPhone: {phone}",
            from_=TWILIO_PHONE_NUMBER,
            to=phone
        )
    except Exception as e:
        return jsonify({"error": f"Failed to send SMS: {str(e)}"}), 500

    # 2️⃣ Initiate emergency call
    try:
        call = client.calls.create(
            twiml=f'<Response><Say>This is an emergency call for {name}. Please respond immediately.</Say></Response>',
            from_=TWILIO_PHONE_NUMBER,
            to=emergency_number
        )
    except Exception as e:
        return jsonify({"error": f"Failed to initiate emergency call: {str(e)}"}), 500

    return jsonify({
        "message": "Data sent successfully via SMS and emergency call initiated",
        "sms_sid": message.sid,
        "call_sid": call.sid
    }), 200

