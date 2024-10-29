import os
from flask import Flask
from flask_migrate import Migrate
from db import db
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from resources import resource_bp  
from auth import auth_bp
from datetime import timedelta

migrate = Migrate()
jwt = JWTManager() 

def create_app():
    app = Flask(__name__)

    CORS(app)
    

    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL') or 'sqlite:///app.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(minutes=30)  
    app.config['JWT_REFRESH_TOKEN_EXPIRES'] = timedelta(days=30) 
    app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY') or 'NEMO'
    app.config['DEBUG'] = True


    db.init_app(app)  
    jwt.init_app(app) 
    migrate.init_app(app, db) 

    app.register_blueprint(auth_bp, url_prefix='/auth')
    app.register_blueprint(resource_bp, url_prefix='/api') 

    return app 

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5555))
    app.run(host="0.0.0.0", port=port, debug=True)
