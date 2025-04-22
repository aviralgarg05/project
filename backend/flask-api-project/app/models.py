from db import db

class Contact(db.Model):
    id    = db.Column(db.Integer, primary_key=True)
    name  = db.Column(db.String(128), nullable=False)
    phone = db.Column(db.String(32), nullable=False)

    def to_dict(self):
        return {'id': self.id, 'name': self.name, 'phone': self.phone}

class Device(db.Model):
    id        = db.Column(db.Integer, primary_key=True)
    name      = db.Column(db.String(128), nullable=False, default='RideSafe Helmet')
    connected = db.Column(db.Boolean, default=False)

    def to_dict(self):
        return {'id': self.id, 'name': self.name, 'connected': self.connected}

class UserInfo(db.Model):
    id           = db.Column(db.Integer, primary_key=True)
    name         = db.Column(db.String(128), nullable=False)
    address      = db.Column(db.String(256), nullable=True)
    phone_number = db.Column(db.String(32), nullable=False)
    last_latitude  = db.Column(db.Float, nullable=True)
    last_longitude = db.Column(db.Float, nullable=True)

    def to_dict(self):
        return {
            'name': self.name,
            'address': self.address,
            'phone_number': self.phone_number,
            'last_latitude': self.last_latitude,
            'last_longitude': self.last_longitude,
        }
