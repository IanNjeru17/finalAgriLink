from flask_restful import Resource
from flask_jwt_extended import jwt_required, get_jwt_identity

class Protected(Resource):
    @jwt_required()
    def get(self):
        current_user = get_jwt_identity()
        return {"msg": "This is a protected route", "user": current_user}, 200

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
