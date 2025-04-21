from flask import Blueprint, request, jsonify
from datetime import datetime

rides_bp = Blueprint('rides', __name__)
_rides = []

@rides_bp.route('', methods=['POST'])
def log_ride():
    data = request.get_json() or {}
    data.setdefault('timestamp', datetime.utcnow().isoformat())
    _rides.append(data)
    return jsonify(data), 201

@rides_bp.route('', methods=['GET'])
def list_rides():
    return jsonify(_rides), 200
