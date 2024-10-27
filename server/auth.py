from flask import Blueprint, request, jsonify
from flask_restful import Api, Resource
from flask_jwt_extended import (
    create_access_token,
    create_refresh_token,
    jwt_required,
    get_jwt_identity,
    get_jwt,
)
from werkzeug.security import generate_password_hash, check_password_hash
from models import db, User, TokenBlocklist 
from datetime import timedelta, datetime, timezone




auth_bp = Blueprint('auth', __name__)
api = Api(auth_bp)

class Signup(Resource):
    def post(self):
        data = request.get_json()
        if User.query.filter_by(email=data.get('email')).first():
            return {"msg": f"User with email {data.get('email')} already exists"}, 409
        
        new_user = User(
            first_name=data.get('first_name'),
            last_name=data.get('last_name'),
            email=data.get('email'),
            phone=data.get('phone'),
            password=generate_password_hash(data.get('password')),
            role=data.get('role')  
        )
        db.session.add(new_user)
        db.session.commit()
        return {"msg": "User registration successful"}, 201



class Login(Resource):
    def post(self):
        data = request.get_json()
        user = User.query.filter_by(email=data.get('email')).first()
        if not user:
            return {"msg": f"User with email {data.get('email')} does not exist!"}, 404

        if not check_password_hash(user.password, data.get('password')):
            return {"msg": "Incorrect password"}, 403

        access_token = create_access_token(
            identity={"id": user.id, "role": user.role},
            expires_delta=timedelta(minutes=15) 
        )
        refresh_token = create_refresh_token(identity=user.id)
        return {
            "access_token": access_token,
            "refresh_token": refresh_token,
            "role": user.role  
        }

class Refresh(Resource):  
    @jwt_required(refresh=True)
    def post(self):
        identity = get_jwt_identity()
        access_token = create_access_token(identity=identity, expires_delta=timedelta(minutes=15))
        return jsonify(access_token=access_token)

class Logout(Resource):
    @jwt_required()
    def get(self):
        jti = get_jwt()["jti"]
        now = datetime.now(timezone.utc)
        db.session.add(TokenBlocklist(jti=jti, created_at=now))
        db.session.commit()
        return {"msg": "You have been logged out"}, 200
    

class UserProfile(Resource):
        @jwt_required()
        def get(self):
           
            current_user_identity = get_jwt_identity()

           
            user = User.query.get(current_user_identity['id'])

            if not user:
                return {"msg": "User not found"}, 404

          
            return {
                "id": user.id,
                "first_name": user.first_name,
                "last_name": user.last_name,
                "email": user.email,
                "phone": user.phone,
                "role": user.role
            }, 200

class Protected(Resource):
    @jwt_required()
    def get(self):
        current_user = get_jwt_identity()
        return {"msg": "This is a protected route", "user": current_user}, 403

class AdminOnly(Resource):
    @jwt_required()
    def get(self):
        current_user = get_jwt_identity()
        if current_user['role'] != 'admin':
            return {"msg": "Admins only!"}, 403
        return {"msg": "Welcome, Admin!"}, 200

class FarmerOnly(Resource):
    @jwt_required()
    def get(self):
        current_user = get_jwt_identity()
        if current_user['role'] != 'farmer':
            return {"msg": "Farmers only!"}, 403
        return {"msg": "Welcome, Farmer!"}, 200

class CustomerOnly(Resource):
    @jwt_required()
    def get(self):
        current_user = get_jwt_identity()
        if current_user['role'] != 'customer':
            return {"msg": "Customers only!"}, 403
        return {"msg": "Welcome, Customer!"}, 200


api.add_resource(Signup, '/signup')
api.add_resource(Login, '/login')
api.add_resource(Logout, '/logout')
api.add_resource(Refresh, '/refresh')
api.add_resource(Protected, '/protected')
api.add_resource(AdminOnly, '/admin')
api.add_resource(FarmerOnly, '/farmer')
api.add_resource(CustomerOnly, '/customer')
api.add_resource(UserProfile, '/user-profile')
