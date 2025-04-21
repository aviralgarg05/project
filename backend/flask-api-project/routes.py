from flask import Flask
from flask import Blueprint, request, jsonify
from twilio.rest import Client

# Initialize Flask app
app = Flask(__name__)

# Twilio credentials (replace with your actual credentials)
TWILIO_ACCOUNT_SID = 'AC443ff39b8848da1bb5c5608da917a8f6'
TWILIO_AUTH_TOKEN = '7603ad337e3e29228cd7eee0a6db5c59'
TWILIO_PHONE_NUMBER = '+13156704064'

# Define Blueprint
main = Blueprint('main', __name__)

@main.route('/submit', methods=['POST'])
def submit():
    data = request.get_json()
    name = data.get('name')
    address = data.get('address')
    phone = data.get('phone')
    emergency_number = data.get('emergency_number')  # Collect emergency number

    if not name or not address or not phone or not emergency_number:
        return jsonify({"error": "All fields are required"}), 400

    # Send SMS using Twilio
    try:
        client = Client(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)
        message = client.messages.create(
            body=f"Name: {name}\nAddress: {address}\nPhone: {phone}",
            from_=TWILIO_PHONE_NUMBER,
            to=phone  # The recipient's phone number
        )
    except Exception as e:
        return jsonify({"error": f"Failed to send SMS: {str(e)}"}), 500

    # Initiate an emergency call
    try:
        call = client.calls.create(
            twiml=f'<Response><Say>This is an emergency call for {name}. Please respond immediately.</Say></Response>',
            from_=TWILIO_PHONE_NUMBER,
            to=emergency_number  # The emergency contact's phone number
        )
        return jsonify({
            "message": "Data sent successfully via SMS and emergency call initiated",
            "sms_sid": message.sid,
            "call_sid": call.sid
        }), 200
    except Exception as e:
        return jsonify({"error": f"Failed to initiate emergency call: {str(e)}"}), 500

# Register Blueprint
app.register_blueprint(main, url_prefix='/api')

if __name__ == '__main__':
    app.run(debug=True)