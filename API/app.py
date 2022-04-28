from datetime import datetime
from config import app, jsonify, create_access_token, jwt_required, get_jwt_identity, request
import db_functions as db

from modulos.login import login


@app.route('/', methods=['GET','POST'])
def hello_world():
    response = jsonify({'message': 'Hello World!'})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

app.register_blueprint(login, url_prefix='/api/login_mod')

@app.route('/api/login', methods=['POST'])
def login():

    email = request.form['email']
    password = request.form['password']

    if email == None or password == None:
        respuesta = {'status': 'ERROR', 'message': 'Faltan parametros'}

    usuario = db.login(email, password)

    if usuario:
        usuario['status'] = 'OK'
        usuario['access_token'] = create_access_token(identity=usuario['id'])
        respuesta = jsonify(usuario)
    else:
        respuesta = jsonify({'status':'ERROR', 'message': 'Usuario o contraseña incorrectos'})

    respuesta.headers.add('Access-Control-Allow-Origin', '*')
    return respuesta

@app.route('/api/getUser', methods=['GET'])
@jwt_required()
def getUser():

    current_user_id = get_jwt_identity()
    usuario = db.getUser(current_user_id)
    usuario['status'] = 'OK'
    respuesta = jsonify(usuario)
    respuesta.headers.add('Access-Control-Allow-Origin', '*')
    return respuesta


@app.route('/api/registro', methods=['POST'])
def registro():

    nombre_completo = request.form['nombre_completo']
    email = request.form['email']
    password = request.form['password']
    matriculacion = request.form['matriculacion']

    if nombre_completo == None or email == None or password == None or matriculacion == None:
        respuesta = {'status': 'ERROR', 'message': 'Faltan parametros'}
        return jsonify(respuesta)

    usuario = db.registro(nombre_completo, email, password, matriculacion)

    if usuario:
        respuesta = jsonify({'status':'OK','id': usuario.id, 'nombre_completo': usuario.nombre_completo, 'email': usuario.email, 'matriculacion': usuario.matriculacion})
    else:
        respuesta = jsonify({'status':'ERROR', 'message': 'Usuario ya existe'})

    respuesta.headers.add('Access-Control-Allow-Origin', '*')
    return respuesta

@app.route('/api/darInsignia', methods=['POST'])
def insignias():
    
        id_usuario = request.args.get('id_usuario')
        id_insignia = request.args.get('id_insignia')
    
        if id_usuario == None or id_insignia == None:
            respuesta = {'status': 'ERROR', 'message': 'Faltan parametros'}
    
        db.darInsignia(id_usuario, id_insignia)
    
        if insignias:
            respuesta = jsonify({'status':'OK'})
        else:
            respuesta = jsonify({'status':'ERROR', 'message': 'Usuario no existe'})
        
        respuesta.headers.add('Access-Control-Allow-Origin', '*')
        return respuesta


@app.route('/api/crearEvento', methods=['GET'])
@jwt_required()
def crearEvento():
    current_user_id = get_jwt_identity()

    id_deporte = request.args.get('id_deporte')
    max_participantes = request.args.get('max_participantes')
    nombre_evento = request.args.get('nombre_evento')
    descripcion_evento = request.args.get('descripcion_evento')
    fecha_inicio = request.args.get('fecha_inicio')
    fecha_fin = request.args.get('fecha_fin')
    hora_inicio = request.args.get('hora_inicio')
    hora_fin = request.args.get('hora_fin')

    #Convierto fecha y hora a formato datetime
    fecha_inicio = datetime.strptime(fecha_inicio, '%Y-%m-%d')
    fecha_fin = datetime.strptime(fecha_fin, '%Y-%m-%d')

    hora_inicio = datetime.strptime(hora_inicio, '%H:%M').time()
    hora_fin = datetime.strptime(hora_fin, '%H:%M').time()

    # Primero comprobamos que el inicio sea anterior al fin tanto en fecha como en hora
    if fecha_inicio > fecha_fin or (fecha_inicio == fecha_fin and hora_inicio > hora_fin) or (hora_inicio >= hora_fin):
        respuesta = jsonify({'status': 'ERROR', 'message': 'La fecha o la hora de inicio debe ser anterior a la fecha de fin'})
        
    else:
        # Segundo comprobamos si hay algún otro evento en ese horario
        if db.comprobarDisponibilidad(id_deporte, fecha_inicio, fecha_fin, hora_inicio, hora_fin):
            db.crearEvento(current_user_id, id_deporte, max_participantes, nombre_evento, descripcion_evento, fecha_inicio, fecha_fin, hora_inicio, hora_fin)
            respuesta = jsonify({'status':'OK'})
        else:
            respuesta = jsonify({'status':'ERROR', 'message': 'No hay disponibilidad'})

    respuesta.headers.add('Access-Control-Allow-Origin', '*')
    return respuesta

@app.route('/api/getEventos')
@jwt_required()
def getEventos():
    respuesta = jsonify(db.getEventos())
    respuesta.headers.add('Access-Control-Allow-Origin', '*')
    return respuesta

if __name__ == '__main__':
    app.run()
