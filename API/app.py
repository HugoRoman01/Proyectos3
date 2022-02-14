from flask import Flask
from flask import jsonify
from flask import request
from config import config
from models import db
from models import User

def create_app(enviroment):
    app = Flask(__name__)

    app.config.from_object(enviroment)

    with app.app_context():
        db.init_app(app)
        db.create_all()
    
    return app

enviroment = config['development']
app = create_app(enviroment)

app.route('/')
def get_users():
    response = {'message': 'success'}
    return jsonify(response)

@app.route('/create-user', methods=['GET'])
def create_user():

    json = request.args

    username = json.get('username')
    password = json.get('password')

    if username is None:
        return jsonify({'message': 'No user provided'})

    user = User.create(username, password)

    return jsonify({'user': user.json()})

app.route('/delete-user', methods=['GET'])
def delete_user():
    response = {'message': 'success'}
    return jsonify(response)

app.route('/update-user', methods=['GET'])
def update_user():
    response = {'message': 'success'}
    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True, port=8080)