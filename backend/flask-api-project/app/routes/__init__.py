from flask import Blueprint, Flask
from .user import user_bp
from .location import location_bp
from .contacts import contacts_bp
from .voice import voice_bp
from .rides import rides_bp
from .alerts import alerts_bp

def create_routes(app: Flask):
    app.register_blueprint(user_bp,     url_prefix='/api/userinfo')
    app.register_blueprint(location_bp, url_prefix='/api/location')
    app.register_blueprint(contacts_bp, url_prefix='/api/contacts')
    app.register_blueprint(voice_bp,    url_prefix='/api/voice-commands')
    app.register_blueprint(rides_bp,    url_prefix='/api/rides')
    app.register_blueprint(alerts_bp,   url_prefix='/api/alerts')
