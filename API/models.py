from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey
from db import Base, engine

# Creamos la tabla usuario
class User(Base):
    __tablename__ = 'Users'
    id = Column(Integer, primary_key=True, autoincrement=True)
    nombre_completo = Column(String(50), nullable=False, unique=True)
    email = Column(String(50), nullable=False, unique=True)
    hash_password = Column(String(128))
    matriculacion = Column(String(4), nullable=False)
    descripcion = Column(String(250))

class Insignias(Base):
    __tablename__ = 'Insignias'
    id_insignia = Column(Integer, primary_key=True, nullable=False)
    id_usuario = Column(Integer, ForeignKey('Users.id'), primary_key=True, nullable=False)

# Creamos la tabla Participacion
class Integrante(Base):
    __tablename__ = 'Integrantes'
    id = Column(Integer, primary_key=True, autoincrement=True)
    id_usuario = Column(Integer, ForeignKey('Users.id'), nullable=False)
    id_evento = Column(Integer, ForeignKey('Eventos.id_evento'), nullable=False)

# Creamos la tabla Deportes
class Deporte(Base):
    __tablename__ = 'Deportes'
    id = Column(Integer, primary_key=True, autoincrement=True)
    nombre = Column(String(50), nullable=False)

class Evento(Base):
    __tablename__ = 'Eventos'
    id_evento = Column(Integer, primary_key=True, autoincrement=True)
    id_usuario = Column(Integer, ForeignKey('Users.id'), nullable=False)                        # Foreing key
    id_deporte = Column(Integer, ForeignKey('Deportes.id'), nullable=False)                        # Foreing key                       # Foreing key
    max_participantes = Column(Integer, nullable=False)
    nombre_evento = Column(String(50), nullable=False)
    descripcion_evento = Column(String(250))
    fecha_inicio = Column(DateTime, nullable=False)
    fecha_fin = Column(DateTime, nullable=False)
    hora_inicio = Column(DateTime, nullable=False)
    hora_fin = Column(DateTime, nullable=False)


# Ejecutamos create_all() para crear la tabla en la base de datos
Base.metadata.create_all(engine)