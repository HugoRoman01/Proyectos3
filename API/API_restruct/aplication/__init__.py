from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_mail import Mail
from flask_cors import CORS

# Base de datos
db = SQLAlchemy()
jwt = JWTManager()
mail = Mail()
cors = CORS()

def init_app():
    """Inicializo la aplicación"""
    app = Flask(__name__)
    app.config.from_object('config.Config')

    # Inicializo los plugins
    db.init_app(app)
    jwt.init_app(app)
    mail.init_app(app)
    cors.init_app(app)

    with app.app_context():
        # Incluimos nuestras rutas
        from .modulos.login import login
        from .modulos.registro import registro
        from .modulos.eventos import eventos

        # Registro de blueprints
        app.register_blueprint(login, url_prefix='/api/login')
        app.register_blueprint(registro, url_prefix='/api/registro')
        app.register_blueprint(eventos, url_prefix='/api/eventos')

        return app