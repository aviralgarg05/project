import os
from twilio.rest import Client

# Load credentials from env
account_sid = os.getenv("TWILIO_ACCOUNT_SID")
auth_token  = os.getenv("TWILIO_AUTH_TOKEN")
from_number = os.getenv("TWILIO_PHONE_NUMBER")
to_number   = os.getenv("TEST_RECIPIENT_PHONE")  # set this in your .env

client = Client(account_sid, auth_token)

message = client.messages.create(
    body="🚀 RideSafe test message",
    from_=from_number,
    to=to_number
)
print("Message SID:", message.sid)
