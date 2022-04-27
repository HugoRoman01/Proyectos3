# Base de datos

from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import create_engine

# Declaro el objeto - ORM
Base = declarative_base()

# Creo la conexión con el motor de base de datos
engine = create_engine('sqlite:///./deportes.db?check_same_thread=False', echo=True)


# Configuración de la aplicación

from flask import Flask, g, jsonify, request
from flask_jwt_extended import create_access_token, JWTManager, jwt_required, get_jwt_identity
from datetime import timedelta

app = Flask(__name__)

#Configuramos JWT (Json Web Token)
app.config["JWT_SECRET_KEY"] = "t0k3n_D3v3l0p3r"
app.config['JWT_TOKEN_LOCATION'] = ['headers', 'query_string']
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
jwt = JWTManager(app)

