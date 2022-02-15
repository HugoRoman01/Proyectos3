class Config:
    pass

class DevelpmentConfig(Config):
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://prueba:kali@localhost/proyectos3'
    SQLALCHEMY_TRACK_MODIFICATIONS = False

config = {
    'development': DevelpmentConfig
}