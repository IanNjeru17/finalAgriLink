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
    

    app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://agrilink_db_user:dbKnYM4sigh6mthBP7VyiCE1KAdnHFXT@dpg-csgf6khu0jms73901e1g-a.oregon-postgres.render.com/agrilink_db"
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
    app = create_app()
    port = int(os.environ.get("PORT", 5555))
    app.run(host="0.0.0.0", port=port, debug=True)
