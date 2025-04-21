from flask import Blueprint, request, jsonify

routes = Blueprint('routes', __name__)

@routes.route('/api/userinfo', methods=['POST'])
def collect_user_info():
    data = request.get_json()
    name = data.get('name')
    address = data.get('address')
    phone_number = data.get('phone_number')

    if not name or not address or not phone_number:
        return jsonify({'error': 'Missing data'}), 400

    # Here you would typically save the data to a database

    return jsonify({'message': 'User information collected successfully'}), 201

def create_routes(app):
    app.register_blueprint(routes)