import sys, os
from dotenv import load_dotenv
load_dotenv()                                # ← load env before routes
sys.path.insert(0, os.path.dirname(__file__))
import routes                                # now TWILIO_* are set
from flask import Flask
from flask_cors import CORS
from pyngrok import ngrok
from pyngrok.exception import PyngrokNgrokError
from db import db               # ← use standalone db

app = Flask(__name__)
app.config.from_object('config.Config')
CORS(app)

db.init_app(app)               # ← initialize db
with app.app_context():
    from app.models import Contact, Device
    db.create_all()

# register controllers
from app.routes.contacts import contacts_bp
from app.routes.bluetooth import bt_bp
from app.routes.location import location_bp
from app.routes.rides import rides_bp
from app.routes.voice import voice_bp
from app.routes.alerts import alerts_bp
from app.routes.user import user_bp

app.register_blueprint(user_bp,     url_prefix='/api/userinfo')
app.register_blueprint(location_bp, url_prefix='/api/location')
app.register_blueprint(contacts_bp, url_prefix='/api/contacts')
app.register_blueprint(voice_bp,    url_prefix='/api/voice-commands')
app.register_blueprint(rides_bp,    url_prefix='/api/rides')
app.register_blueprint(alerts_bp,   url_prefix='/api/alerts')
app.register_blueprint(bt_bp,       url_prefix='/api/bluetooth')
app.register_blueprint(routes.main, url_prefix='/api/emergency')

# add health check at root
@app.route('/', methods=['GET'])
def health_check():
    return {"status": "ok", "message": "RideSafe API running"}, 200

if __name__ == '__main__':
    port = int(os.getenv('PORT', 5000))
    if os.getenv('SKIP_NGROK', '0') != '1':
        try:
            public_url = ngrok.connect(port).public_url
            print(f" * ngrok tunnel running at {public_url}")
        except PyngrokNgrokError as e:
            print("⚠️ ngrok tunnel failed:", e)
            print(f"→ You can manually run: ngrok http {port}")
    app.run(host='0.0.0.0', port=port, debug=True)
