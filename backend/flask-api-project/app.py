from flask import Flask
from dotenv import load_dotenv
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

load_dotenv()

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///contacts.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
CORS(app)

db = SQLAlchemy(app)

# import models so tables are created
from app.models import Contact, Device
db.create_all()

# register contacts routes under /api/contacts
from app.routes.contacts import contacts_bp
app.register_blueprint(contacts_bp, url_prefix='/api/contacts')

# register bluetooth routes under /api/bluetooth
from app.routes.bluetooth import bt_bp
app.register_blueprint(bt_bp, url_prefix='/api/bluetooth')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
