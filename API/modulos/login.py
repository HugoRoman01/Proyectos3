# Creo el modulo de login de Flask

from flask import Blueprint

login = Blueprint('login', __name__)

@login.route('/')
def index():
    return "Hello from login"