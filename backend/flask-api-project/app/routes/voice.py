from flask import Blueprint, request, jsonify

voice_bp = Blueprint('voice', __name__)
_commands = []

@voice_bp.route('', methods=['POST'])
def post_command():
    data = request.get_json() or {}
    _commands.append(data)
    return jsonify({'received': data}), 201

@voice_bp.route('', methods=['GET'])
def get_commands():
    return jsonify(_commands), 200
