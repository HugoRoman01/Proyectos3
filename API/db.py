from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import create_engine

# Declaro el objeto - ORM
Base = declarative_base()

# Creo la conexión con el motor de base de datos
engine = create_engine('sqlite:///./deportes.db?check_same_thread=False', echo=True)