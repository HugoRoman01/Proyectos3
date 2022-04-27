# Creo el modulo de register de Flask

from flask import Blueprint

register = Blueprint('register', __name__)

@register.route('/')
def index():
    return "Hello from register"