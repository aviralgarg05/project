from flask import Blueprint, request, jsonify

location_bp = Blueprint('location', __name__)
_locations = []

@location_bp.route('', methods=['POST'])
def post_location():
    data = request.get_json() or {}
    _locations.append(data)
    return jsonify({'status': 'ok'}), 201

@location_bp.route('', methods=['GET'])
def get_locations():
    return jsonify(_locations), 200
