from flask import Blueprint, current_app, request, jsonify
from flask_jwt_extended import create_access_token
from security import VerificarPassword
from models import db, User, Integrante, Insignias


login = Blueprint('login', __name__)

@login.route('/', methods=['POST'])
def ingreso():

    email = request.form['email']
    password = request.form['password']

    if email == None or password == None:
        return jsonify({'status': 'ERROR', 'message': 'Faltan parametros'})
    
    usuario = getUser(email, password)

    print("Usuario: ", usuario)

    if usuario:
        if usuario['activo'] == True:
            usuario['status'] = 'OK'
            usuario['access_token'] = create_access_token(identity=usuario['id'])
            response = jsonify(usuario)
        else:
            usuario['status'] = 'ERROR'
            usuario['message'] = 'Usuario no activado'
            response = jsonify(usuario)
    else:
        response = jsonify({'status':'ERROR', 'message': 'Usuario o contraseña incorrectos'})

    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

# Funciones

def getUser(email, password):
    user = db.session.query(User).filter_by(email=email)
    
    if user.count() == 0:
        return None
    
    user = user.one()

    if VerificarPassword(password, user.hash_password):
        
        participaciones = getParticipaciones(user.id)
        insignias = getInsignias(user.id)

        data = {'id': user.id, 'nombre_completo': user.nombre_completo, 'email': user.email, 'matriculacion': user.matriculacion, 'activo': user.activo, 'participaciones': participaciones, 'insignias': insignias}
        return data

    return None

def getParticipaciones(user_id):
    participaciones = db.session.query(Integrante).filter_by(id_usuario=user_id).count()
    return participaciones

def getInsignias(user_id):
    query = db.session.query(Insignias).filter_by(id_usuario=user_id)
    data = []
    for insignia in query:
        data.append(insignia.id_insignia)
    return data