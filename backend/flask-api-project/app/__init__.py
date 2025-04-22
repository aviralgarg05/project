import os, sys
# add project root (one level up) to sys.path
sys.path.insert(
    0,
    os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
)
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from config import Config
from app.routes import create_routes

db = SQLAlchemy()

# import models so create_all picks them up
from app import models

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///contacts.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    CORS(app)  # enable cross‑origin
    db.init_app(app)

    with app.app_context():
        db.create_all()

    create_routes(app)

    from .routes.contacts import contacts_bp
    app.register_blueprint(contacts_bp, url_prefix='/contacts')

    return app