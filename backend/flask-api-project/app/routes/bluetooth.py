from flask import Blueprint, jsonify, abort
from . import db
from ..models import Device

bt_bp = Blueprint('bluetooth', __name__)

def _get_device():
    d = Device.query.get(1)
    if not d:
        d = Device(id=1)
        db.session.add(d)
        db.session.commit()
    return d

@bt_bp.route('', methods=['GET'])
def status():
    d = _get_device()
    return jsonify(d.to_dict()), 200

@bt_bp.route('', methods=['POST'])
def connect():
    d = _get_device()
    d.connected = True
    db.session.commit()
    return jsonify(d.to_dict()), 200

@bt_bp.route('', methods=['DELETE'])
def disconnect():
    d = _get_device()
    d.connected = False
    db.session.commit()
    return jsonify(d.to_dict()), 200
