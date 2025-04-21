from flask import Blueprint, request, jsonify

user_bp = Blueprint('userinfo', __name__)
_user = {}

@user_bp.route('', methods=['GET'])
def get_user():
    return jsonify(_user or {}), 200

@user_bp.route('', methods=['POST'])
def set_user():
    data = request.get_json() or {}
    _user.clear()
    _user.update(data)
    return jsonify(_user), 201
