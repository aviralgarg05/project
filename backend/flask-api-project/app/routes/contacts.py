from flask import Blueprint, request, jsonify

contacts_bp = Blueprint('contacts', __name__)
_contacts = []

@contacts_bp.route('', methods=['GET'])
def list_contacts():
    return jsonify(_contacts), 200

@contacts_bp.route('', methods=['POST'])
def add_contact():
    data = request.get_json() or {}
    _contacts.append(data)
    return jsonify(data), 201
