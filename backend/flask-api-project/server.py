import sys, os
from dotenv import load_dotenv
load_dotenv()

sys.path.insert(0, os.path.dirname(__file__))
import routes
from flask import Flask, jsonify, request
from flask_cors import CORS
from db import db
from sqlalchemy.exc import OperationalError

app = Flask(__name__)
app.config.from_object('config.Config')

# Allow CORS from everywhere with both HTTP and HTTPS support
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

# Seed initial data
db.init_app(app)
with app.app_context():
    from app.models import Contact, Device, UserInfo

    # force rebuild all tables so new columns (last_latitude/last_longitude) are applied
    db.drop_all()
    db.create_all()

    # safely query for default user
    try:
        existing = UserInfo.query.get(1)
    except OperationalError:
        existing = None

    if not existing:
        db.session.add(UserInfo(
            id=1,
            name='Aviral',
            address='Delhi, India',
            phone_number='+919971195728'
        ))
        db.session.commit()

    # Create default Contact if needed
    if not Contact.query.first():
        db.session.add(Contact(
            id=1,
            name='Aviral',
            phone='+919971195728'
        ))
        db.session.commit()

# Register controllers
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

# Add health check endpoint
@app.route('/', methods=['GET'])
def health_check():
    return jsonify({"status": "ok", "message": "RideSafe API running"}), 200

# Test endpoint for API connectivity
@app.route('/test', methods=['GET', 'POST'])
def test_endpoint():
    return jsonify({"status": "success", "message": "API test endpoint reached"}), 200

# Debug endpoint to verify connection
@app.route('/api/ping', methods=['GET', 'POST'])
def ping():
    return jsonify({
        "status": "success", 
        "message": "API is working!",
        "headers": dict(request.headers),
        "remote_addr": request.remote_addr
    }), 200

if __name__ == '__main__':
    port = int(os.getenv('PORT', 5001))
    print(f"* Local API server running at: http://127.0.0.1:{port}/")
    print(f"* For network access, use: http://YOUR_IP_ADDRESS:{port}/")
    app.run(host='0.0.0.0', port=port, debug=True)
