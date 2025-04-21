from flask import Blueprint, jsonify

alerts_bp = Blueprint('alerts', __name__)
_alerts = [
    {'id': 1, 'type': 'helmet-off', 'message': 'Helmet not detected!'},
    {'id': 2, 'type': 'low-battery', 'message': 'Battery below 20%!'},
]

@alerts_bp.route('', methods=['GET'])
def get_alerts():
    return jsonify(_alerts), 200
