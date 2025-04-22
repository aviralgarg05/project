from flask import Blueprint, request, jsonify, abort
from . import db
from .models import Contact

contacts_bp = Blueprint('contacts', __name__)

@contacts_bp.route('', methods=['GET'])
def list_contacts():
    contacts = Contact.query.all()
    return jsonify([c.to_dict() for c in contacts]), 200

@contacts_bp.route('', methods=['POST'])
def add_contact():
    data = request.get_json() or {}
    if not data.get('name') or not data.get('phone'):
        abort(400, 'name and phone required')
    c = Contact(name=data['name'], phone=data['phone'])
    db.session.add(c)
    db.session.commit()
    return jsonify(c.to_dict()), 201

@contacts_bp.route('/<int:id>', methods=['DELETE'])
def delete_contact(id):
    c = Contact.query.get_or_404(id)
    db.session.delete(c)
    db.session.commit()
    return '', 204
