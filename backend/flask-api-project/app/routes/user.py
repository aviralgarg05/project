from flask import Blueprint, request, jsonify, current_app
from db import db
from app.models import UserInfo

user_bp = Blueprint('userinfo', __name__)

@user_bp.route('', methods=['GET'])
def get_user():
    u = UserInfo.query.get(1)
    return jsonify(u.to_dict() if u else {}), 200

@user_bp.route('', methods=['POST'])
def set_user():
    data = request.get_json() or {}
    u = UserInfo.query.get(1)
    if not u:
        u = UserInfo(
            id=1,
            name=data.get('name', ''),
            address=data.get('address', ''),
            phone_number=data.get('phone_number', ''),
            last_latitude=data.get('latitude'),
            last_longitude=data.get('longitude')
        )
        db.session.add(u)
    else:
        u.name = data.get('name', u.name)
        u.address = data.get('address', u.address)
        u.phone_number = data.get('phone_number', u.phone_number)
        if 'latitude' in data:
            u.last_latitude = data.get('latitude')
        if 'longitude' in data:
            u.last_longitude = data.get('longitude')
    db.session.commit()
    return jsonify(u.to_dict()), 201
