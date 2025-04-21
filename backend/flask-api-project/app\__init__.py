from flask import Flask
from config import Config
from app.routes import create_routes

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    
    create_routes(app)

    return app