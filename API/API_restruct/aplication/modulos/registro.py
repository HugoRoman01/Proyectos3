from flask import Blueprint, request, jsonify, current_app
from models import db, User, Token
from security import enviarEmailConfirmacion, hashearPassword, generarTokenAleatorio

registro = Blueprint('registro', __name__)

@registro.route('/crearCuenta' , methods=['GET'])
def register():

    nombre_completo = request.args.get('nombre_completo')
    email = request.args.get('email')
    password = request.args.get('password')
    matriculacion = request.args.get('matriculacion')
    descripcion = request.args.get('descripcion')
    

    if nombre_completo == None or email == None or password == None or matriculacion == None:
        respuesta = jsonify({'status': 'ERROR', 'message': 'Faltan parametros'})
        respuesta.headers.add('Access-Control-Allow-Origin', '*')

        return jsonify(respuesta)

    usuario = registrar(nombre_completo, email, password, matriculacion, descripcion)

    if usuario:
        respuesta = jsonify({'status':'OK','id': usuario.id, 'nombre_completo': usuario.nombre_completo, 'email': usuario.email, 'matriculacion': usuario.matriculacion})
    else:
        respuesta = jsonify({'status':'ERROR', 'message': 'Usuario ya existe'})

    respuesta.headers.add('Access-Control-Allow-Origin', '*')

    return respuesta

@registro.route('/confirmar', methods=['GET'])
def confirmar():
    token = request.args.get('token')
    print(token)

    if token == None:
        respuesta = {'status': 'ERROR', 'message': 'Faltan parametros'}
        return jsonify(respuesta)

    token_db = db.session.query(Token).filter_by(token=token)

    if token_db.count() == 0:
        respuesta = {'status': 'ERROR', 'message': 'Token no existe'}
        return jsonify(respuesta)
    
    token_db = token_db.one()

    activarUsuario(token_db.user_id)

    respuesta = {'status': 'OK', 'message': 'Cuenta activada'}

    return jsonify(respuesta)

@registro.route('/test')
def test():
    return jsonify({'status': 'OK'})


def registrar(nombre_completo, email, password, matriculacion, descripcion):

    user = db.session.query(User).filter_by(email=email)

    if user.count() == 0:
        usuario = crearUsuario(nombre_completo, email, password, matriculacion, descripcion)

        # Creo un token aleatorio
        token = generarTokenAleatorio()

        # Lo guardo en la base de datos
        guardarToken(token=token, user_id=usuario.id)

        # Envio el email de confirmaci??n
        enviarEmailConfirmacion(email, token)

        return usuario
    else:
        return None

def crearUsuario(nombre_completo, email, password, matriculacion, descripcion):
    
    usuario = User(nombre_completo=nombre_completo,
                    email=email,
                    hash_password=hashearPassword(password),
                    matriculacion=matriculacion,
                    descripcion=descripcion)
    db.session.add(usuario)
    db.session.commit()
    print("Usuario creado!")

    return usuario

def guardarToken(token, user_id):
    token_db = Token(token=token, user_id=user_id)
    db.session.add(token_db)
    db.session.commit()
    return token_db

def activarUsuario(id):
    usuario = db.session.query(User).filter_by(id=id)

    if usuario.count() == 0:
        respuesta = {'status': 'ERROR', 'message': 'Usuario no existe'}
        return jsonify(respuesta)

    usuario = usuario.one()

    usuario.activo = True

    # Elimino el token

    token = db.session.query(Token).filter_by(user_id=usuario.id)
    
    token = token.one()

    db.session.delete(token)

    db.session.commit()

    return usuario
