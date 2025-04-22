import os, sys
# add project root (one level up) to sys.path
sys.path.insert(
    0,
    os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
)
from flask import Flask
from config import Config
from app.routes import create_routes

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    
    create_routes(app)

    return app