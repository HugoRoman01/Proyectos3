import email
from app.db import db, AppDeportesDB

class Usuarios(db.Model, AppDeportesDB):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String)
    nombre = db.Column(db.String)
    apellidos = db.Column(db.String)
    user = db.Column(db.String)
    password = db.Column(db.String)

    def __init__(self, email, nombre, apellidos, user, password):
        self.email = email
        self.nombre = nombre
        self.apellidos = apellidos
        self.user = user
        self.password = password

    def __repr__(self, user):
        return f'Usuarios({self.user})'

    def __str__(self):
        return f'{self.user}'

class Deportes(db.Model, AppDeportesDB):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String)
    modalidad = db.Column(db.String)

    def __init__(self, nombre, modalidad):
        self.nombre = nombre
        self.modalidad = modalidad

    def __repr__(self, nombre):
        return f'Deportes({self.nombre})'
    
    def __str__(self):
        return f'{self.nombre}'

class Pistas(db.Model, AppDeportesDB):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String)

    def __init__(self, nombre):
        self.nombre = nombre
    
    def __repr__(self, nombre):
        return f'Pistas({self.nombre})'

    def __str__(self):
        return f'{self.nombre}'

class Eventos(db.Model, AppDeportesDB):
    id = db.Column(db.Integer, primary_key=True)
    id_user = db.Column(db.Integer, ForeignKey('Usuarios.id'))
    id_deporte = db.Column(db.Integer)
    n_participantes = db.Column(db.Integer)
    participantes_actuales = db.Column(db.Integer)
    activo = db.Column(db.Boolean)
    fecha_inicio = db.Column(db.DateTime)
    fecha_fin = db.Column(db.DateTime)