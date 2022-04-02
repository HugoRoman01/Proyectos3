from db import Base, engine
from models import *
from sqlalchemy.orm import sessionmaker
from datetime import datetime, timedelta
import bcrypt

#Creamos una sesión para poder insertar, actualizar y borrar datos
DBSession = sessionmaker(bind=engine)
session = DBSession()

# Contructores de Filas

def crearDeporte(nombre):
    deporte = Deporte(nombre=nombre)
    session.add(deporte)
    session.commit()
    print("Deporte creado!")
    return deporte

def hashearPassword(plain_text_password):
    return bcrypt.hashpw(plain_text_password, bcrypt.gensalt())
def VerificarPassword(plain_text_password, hashed_password):
    return bcrypt.checkpw(plain_text_password, hashed_password)

def crearUsuario(nombre_completo, email, password, matriculacion):
    
    usuario = User(nombre_completo=nombre_completo,
                    email=email,
                    hash_password=hashearPassword(password),
                    matriculacion=matriculacion)
    session.add(usuario)
    session.commit()
    print("Usuario creado!")
    return usuario

def crearEvento(id_usuario, id_deporte, max_participantes, nombre_evento, descripcion_evento, fecha_inicio, fecha_fin, hora_inicio, hora_fin):
    evento = Evento(id_usuario=id_usuario,
                    id_deporte=id_deporte,
                    max_participantes=max_participantes,
                    nombre_evento=nombre_evento,
                    descripcion_evento=descripcion_evento,
                    fecha_inicio=fecha_inicio,
                    fecha_fin=fecha_fin,
                    hora_inicio=hora_inicio,
                    hora_fin=hora_fin)
    session.add(evento)
    session.commit()
    print("Evento creado!")
    return evento

# Getters

def getInsignias(id_usuario):
    query = session.query(Insignias).filter_by(id_usuario=id_usuario)
    data = []
    for insignia in query:
        data.append(insignia.id_insignia)
    return data

def getParticipaciones(id_usuario):
    query = session.query(Integrante).filter_by(id_usuario=id_usuario).count()
    return query

def getUser(id_usuario):
    query = session.query(User).filter_by(id=id_usuario)
    if query.count() == 0:
        return None
    user = query.one()

    participaciones = getParticipaciones(user.id)
    insignias = getInsignias(user.id)

    data = {'id': user.id, 'nombre_completo': user.nombre_completo, 'email': user.email, 'matriculacion': user.matriculacion, 'participaciones': participaciones, 'insignias': insignias}
    return data

def getEventos():
    query = session.query(Evento)
    data = []
    for evento in query:
        data.append(evento.id_evento)
    return data
# Contructores de Consultas

def crearBasico():

    query = session.query(Deporte)

    if query.count() == 0:
        #Creamos los deportes
        crearDeporte("Futbol")
        crearDeporte("Baloncesto")
        crearDeporte("Padel")
    else:
        print("Las entidades ya existen!")

def registro(nombre_completo, email, password, matriculacion):
    query = session.query(User).filter_by(email=email)
    if query.count() == 0:
        usuario = crearUsuario(nombre_completo, email, password, matriculacion)
        return usuario
    else:
        return None

def login(email, password):
    query = session.query(User).filter_by(email=email)
    if query.count() == 0:
        return None
    user = query.one()
    if VerificarPassword(password, user.hash_password):
        
        participaciones = getParticipaciones(user.id)
        insignias = getInsignias(user.id)

        data = {'id': user.id, 'nombre_completo': user.nombre_completo, 'email': user.email, 'matriculacion': user.matriculacion, 'participaciones': participaciones, 'insignias': insignias}
        return data

    return None

def darInsignia(id_usuario, id_insignia):
    insignia = Insignias(id_usuario=id_usuario, id_insignia=id_insignia)
    session.add(insignia)
    session.commit()
    print("Insignia dada!")
    return insignia

def comprobarDisponibilidad(id_deporte,fecha_inicio, fecha_fin, hora_inicio, hora_fin):
    # Aqui hay lio, por las comparaciones de fechas y horas
    query = session.query(Evento).filter(Evento.id_deporte == id_deporte, Evento.fecha_inicio <= fecha_fin, Evento.fecha_fin >= fecha_inicio, Evento.hora_fin >= hora_inicio, Evento.hora_inicio <= hora_fin)

    if query.count() == 0:
        return True
    else:
        return False

