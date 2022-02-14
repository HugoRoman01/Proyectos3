from datetime import datetime
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=True, nullable=False)
    created_at = db.Column(db.DateTime(), nullable=False, default=db.func.current_timestamp())

    @classmethod
    def create(cls, username, password):
        user = cls(username=username, password=password)
        return user.save()

    def save(self):

        try:
            db.session.add(self)
            db.session.commit()

            return self

        except:

            return False
    
    def json(self):

        return {
            'id': self.id,
            'user': self.username,
            'password': self.password,
            'created_at': self.created_at
        }