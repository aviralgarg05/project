import os
from flask import Blueprint, request, jsonify
from twilio.rest import Client
from twilio.base.exceptions import TwilioRestException
from app.models import Contact, UserInfo

main = Blueprint('emergency', __name__)

# pull from your .env (now hard‑coded for testing)
TWILIO_ACCOUNT_SID  = 'AC443ff39b8848da1bb5c5608da917a8f6'
TWILIO_AUTH_TOKEN   = 'cf7fc928cc6f0f8e9f0a3ad5d738c35d'
TWILIO_PHONE_NUMBER = '+13156704064'
EMERGENCY_NUMBER    = '+919971195728'

client = Client(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)

@main.route('', methods=['GET','POST'])
def send_emergency_root():
    if request.method == 'GET':
        return jsonify({
            'status': 'ok',
            'usage': 'POST to /api/emergency/send with JSON {"latitude":.., "longitude":..}'
        }), 200
    return send_emergency()

@main.route('/send', methods=['GET','POST'])
def send_emergency():
    if request.method == 'GET':
        return jsonify({
            'status': 'ok',
            'usage': 'POST JSON {"latitude":.., "longitude":..} to trigger emergency SMS'
        }), 200

    data = request.get_json() or {}
    print("Received payload:", data)

    # Extract coordinates from payload if available
    payload_lat = data.get('latitude')
    payload_lng = data.get('longitude')

    # fetch persisted user info
    u = UserInfo.query.get(1)
    u_name = u.name if u and u.name else 'Unknown'
    # Get stored coordinates and address
    stored_lat = u.last_latitude if u else None
    stored_lng = u.last_longitude if u else None
    stored_address = u.address if u and u.address else 'No address on record'

    # Determine which location to use
    if payload_lat is not None and payload_lng is not None:
        # Use coordinates from the request payload (most current)
        address_str = f"https://maps.google.com/?q={payload_lat},{payload_lng}"
        location_type = "Live Location"
    elif stored_lat is not None and stored_lng is not None:
        # Use last known coordinates stored in DB
        address_str = f"https://maps.google.com/?q={stored_lat},{stored_lng}"
        location_type = "Last Known Location (DB)"
    else:
        # Fall back to manually entered address string
        address_str = stored_address
        location_type = "Stored Address"

    # Just hardcode the contact name since we're using a hardcoded number anyway
    to_number = EMERGENCY_NUMBER
    c_name = 'Aviral'

    try:
        msg = client.messages.create(
            body=(
                f"🚨 EMERGENCY ALERT 🚨\n"
                f"User: {u_name}\n"
                f"{location_type}: {address_str}\n"
                f"Notify: {c_name} ({to_number})"
            ),
            from_=TWILIO_PHONE_NUMBER,
            to=to_number
        )
        # fetch updated status for debugging
        msg_detail = client.messages(msg.sid).fetch()
        print(f"Twilio SID={msg.sid}, status={msg_detail.status}, error={msg_detail.error_message}")
    except TwilioRestException as e:
        return jsonify({'error': e.msg, 'twilio_code': e.code}), 400

    return jsonify({
        'sms_sid': msg.sid,
        'status': msg_detail.status,
        'error': msg_detail.error_message
    }), 200

