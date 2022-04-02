import json
import db_functions as db
from flask import Flask, jsonify, request
from flask_jwt_extended import create_access_token, JWTManager, jwt_required, get_jwt_identity

app = Flask(__name__)

#Configuramos JWT (Json Web Token)
app.config["JWT_SECRET_KEY"] = "t0k3n_D3v3l0p3r"
jwt = JWTManager(app)

@app.route('/', methods=['GET'])
def hello_world():
    response = jsonify({'message': 'Hello World!'})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

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


@app.route('/api/registro', methods=['POST'])
def registro():

    nombre_completo = request.form['nombre_completo']
    email = request.form['email']
    password = request.form['password']
    matriculacion = request.form['matriculacion']

    if nombre_completo == None or email == None or password == None or matriculacion == None:
        respuesta = {'status': 'ERROR', 'message': 'Faltan parametros'}

    usuario = db.registro(nombre_completo, email, password, matriculacion)

    if usuario:
        respuesta = {'status':'OK','id': usuario.id, 'nombre_completo': usuario.nombre_completo, 'email': usuario.email, 'matriculacion': usuario.matriculacion}
    else:
        respuesta = {'status':'ERROR', 'message': 'Usuario ya existe'}

    respuesta.headers.add('Access-Control-Allow-Origin', '*')
    return jsonify(respuesta)

@app.route('/api/darInsignia', methods=['POST'])
def insignias():
    
        id_usuario = request.args.get('id_usuario')
        id_insignia = request.args.get('id_insignia')
    
        if id_usuario == None or id_insignia == None:
            respuesta = {'status': 'ERROR', 'message': 'Faltan parametros'}
    
        db.darInsignia(id_usuario, id_insignia)
    
        if insignias:
            respuesta = {'status':'OK'}
        else:
            respuesta = {'status':'ERROR', 'message': 'Usuario no existe'}
        
        respuesta.headers.add('Access-Control-Allow-Origin', '*')
        return jsonify(respuesta)    


@app.route('/api/crearEvento', methods=['POST'])
@jwt_required()
def crearEvento():
    current_user_id = get_jwt_identity()
    id_deporte = request.form['id_deporte']
    max_participantes = request.form['max_participantes']
    nombre_evento = request.form['nombre_evento']
    descripcion_evento = request.form['descripcion_evento']
    
    fecha_inicio = request.form['fecha_inicio']
    fecha_fin = request.form['fecha_fin']
    hora_inicio = request.form['hora_inicio']
    hora_fin = request.form['hora_fin']

    # Primero comprobamos si hay algún otro evento en ese horario
    if db.comprobarDisponibilidad(id_deporte, fecha_inicio, fecha_fin, hora_inicio, hora_fin):
        db.crearEvento(current_user_id, id_deporte, max_participantes, nombre_evento, descripcion_evento, fecha_inicio, fecha_fin, hora_inicio, hora_fin)
        respuesta = {'status':'OK'}
    else:
        respuesta = {'status':'ERROR', 'message': 'No hay disponibilidad'}

    respuesta.headers.add('Access-Control-Allow-Origin', '*')
    return jsonify(respuesta)

@app.route('/api/getEventos')
def getEventos():
    respuesta = db.getEventos()
    respuesta.headers.add('Access-Control-Allow-Origin', '*')
    return jsonify(respuesta)

if __name__ == '__main__':
    app.run()