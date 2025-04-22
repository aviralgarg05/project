from . import db

class Contact(db.Model):
    id    = db.Column(db.Integer, primary_key=True)
    name  = db.Column(db.String(128), nullable=False)
    phone = db.Column(db.String(32), nullable=False)

    def to_dict(self):
        return {'id': self.id, 'name': self.name, 'phone': self.phone}
