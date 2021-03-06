from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import db, Evento, Integrante, User
from datetime import datetime, timedelta


eventos = Blueprint('eventos', __name__)

@eventos.route('/getEventos')
def getEventos():
    query = db.session.query(Evento)
    
    data = []

    for evento in query:
        username = getUsernameCreador(evento.id_usuario)
        data.append({'id_evento': evento.id_evento, 'user_creador': username, 'id_deporte': evento.id_deporte, 'max_participantes': evento.max_participantes, 'nombre_evento': evento.nombre_evento, 'descripcion_evento': evento.descripcion_evento, 'fecha_inicio': evento.fecha_inicio, 'fecha_fin': evento.fecha_fin, 'hora_inicio': str(evento.hora_inicio), 'hora_fin': str(evento.hora_fin)})

    data.sort(key=lambda x: x['id_evento'],reverse=True)

    respuesta = jsonify(data)
    respuesta.headers.add('Access-Control-Allow-Origin', '*')
    return respuesta

@eventos.route('/getEventosUser', methods=['GET'])
@jwt_required()
def getEventosUser():

    query = db.session.query(Evento).filter_by(id_usuario=get_jwt_identity())
    
    data = []

    for evento in query:
        username = getUsernameCreador(evento.id_usuario)
        data.append({'id_evento': evento.id_evento, 'user_creador': username, 'id_deporte': evento.id_deporte, 'max_participantes': evento.max_participantes, 'nombre_evento': evento.nombre_evento, 'descripcion_evento': evento.descripcion_evento, 'fecha_inicio': evento.fecha_inicio, 'fecha_fin': evento.fecha_fin, 'hora_inicio': str(evento.hora_inicio), 'hora_fin': str(evento.hora_fin)})

    data.sort(key=lambda x: x['id_evento'],reverse=True)

    respuesta = jsonify(data)
    respuesta.headers.add('Access-Control-Allow-Origin', '*')
    return respuesta

@eventos.route('/inscribir', methods=['GET'])
@jwt_required()
def inscribir():

    current_user_id = get_jwt_identity()

    if id_evento == None:
        response = jsonify({'status': 'ERROR', 'message': 'Faltan parametros'})
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response

    query = db.session.query(Evento).filter_by(id_evento=id_evento)

    if query.count() == 0:
        response = jsonify({'status': 'ERROR', 'message': 'Evento no existe'})
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response
    
    # Meto en la tabla integrantes
    integrante = Integrante(id_evento=id_evento, id_usuario=current_user_id)
    db.session.add(integrante)
    db.session.commit()

    response = jsonify({'status': 'OK', 'message': 'Inscrito correctamente'})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response




@eventos.route('/crearEvento', methods=['GET'])
@jwt_required()
def crearEvento():

    current_user_id = get_jwt_identity()
    
    id_deporte = request.args.get('id_deporte')
    max_participantes = request.args.get('max_participantes')
    nombre_evento = request.args.get('nombre_evento')
    descripcion_evento = request.args.get('descripcion')
    fecha_inicio = request.args.get('fecha_inicio')
    fecha_fin = request.args.get('fecha_fin')
    hora_inicio = request.args.get('hora_inicio')
    hora_fin = request.args.get('hora_fin')

    #Convierto fecha y hora a formato datetime
    fecha_inicio = datetime.strptime(fecha_inicio, '%Y-%m-%d')
    fecha_fin = datetime.strptime(fecha_fin, '%Y-%m-%d')

    hora_inicio = datetime.strptime(hora_inicio, '%H:%M').time()
    hora_fin = datetime.strptime(hora_fin, '%H:%M').time()

    print("Horas: ", hora_inicio, hora_fin)

    # Si el usuario no es administrador (id = 1) solo puede crear eventos hasta 15 dias
    if current_user_id != 1:
        if fecha_inicio > datetime.now() + timedelta(days=15) or fecha_fin > datetime.now() + timedelta(days=15):
            respuesta = jsonify({'message': 'No puedes crear eventos con menos de 15 dias de antelacion'})
            respuesta.headers.add('Access-Control-Allow-Origin', '*')
            return respuesta

    # Primero comprobamos que el inicio sea anterior al fin tanto en fecha como en hora
    if fecha_inicio > fecha_fin or (fecha_inicio == fecha_fin and hora_inicio > hora_fin) or (hora_inicio >= hora_fin):
        respuesta = jsonify({'status': 'ERROR', 'message': 'La fecha o la hora de inicio debe ser anterior a la fecha de fin'})
    else:
        # Segundo comprobamos si hay alg??n otro evento en ese horario
        if comprobarDisponibilidad(id_deporte, fecha_inicio, hora_inicio, fecha_fin, hora_fin):
            
            # Creo el evento

            evento = Evento(id_usuario=current_user_id,
                    id_deporte=id_deporte,
                    max_participantes=max_participantes,
                    nombre_evento=nombre_evento,
                    descripcion_evento=descripcion_evento,
                    fecha_inicio=fecha_inicio,
                    fecha_fin=fecha_fin,
                    hora_inicio=hora_inicio,
                    hora_fin=hora_fin)
            db.session.add(evento)
            db.session.commit()

            print("Evento creado!")

            respuesta = jsonify({'status':'OK'})
        else:
            respuesta = jsonify({'status': 'ERROR', 'message': 'Ya hay un evento en ese horario'})

    respuesta.headers.add('Access-Control-Allow-Origin', '*')
    return respuesta

# Funciones

@eventos.route('/test')
def test():
    return jsonify({'status':'OK'})

def comprobarDisponibilidad(id_deporte, fecha_inicio, fecha_fin, hora_inicio, hora_fin):
    
    query = db.session.query(Evento).filter(Evento.id_deporte == id_deporte, Evento.fecha_inicio <= fecha_fin, Evento.fecha_fin >= fecha_inicio, Evento.hora_inicio <= hora_fin, Evento.hora_fin >= hora_inicio)

    if query.count() == 0:
        return True
    else:
        return False


def getUsernameCreador(user_id):
    query = db.session.query(User).filter_by(id=user_id)
    return query.first().nombre_completo
