from flask import Blueprint, request, jsonify
from flask_restful import Api, Resource, reqparse
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import db, Product, Order, OrderItem, User,BlogPost

resource_bp = Blueprint('resources', __name__)
api = Api(resource_bp)

order_args = reqparse.RequestParser()
order_args.add_argument('status', type=str, required=True, help='Status of the order is required')
order_args.add_argument('total_amount', type=float, required=True, help='Total amount of the order is required')
order_args.add_argument('order_items', type=list, location='json', required=True, help='Order items are required')




class ProductList(Resource):
    def get(self):
         products = [product.serialize() for product in Product.query.all()]  
         return products, 200

    # @jwt_required()
    def post(self):
        data = request.get_json()
        if not data:
            return {'message': 'No input data provided'}, 400

        required_fields = ['name', 'price', 'description', 'image_url', 'category_id', 'farmer_id']
        for field in required_fields:
            if field not in data:
                return {'message': f'Missing field: {field}'}, 400

        new_product = Product(
            name=data['name'],
            price=data['price'],
            description=data['description'],
            image_url=data['image_url'],
            category_id=data['category_id'],
            farmer_id=data['farmer_id']  
        )

        db.session.add(new_product)
        db.session.commit()

        return new_product.serialize(), 201  

class ProductByID(Resource):
    def get(self, id):
        product = Product.query.get_or_404(id)
        return product.serialize(), 200  
    
    # @jwt_required()
    def delete(self, id):
        product = Product.query.get_or_404(id)

   
        if product.order_items:
            for item in product.order_items:
                db.session.delete(item) 

        db.session.delete(product)
        db.session.commit()
        return '', 204

    # @jwt_required()
    def patch(self, id):
        product = Product.query.get_or_404(id)
        data = request.get_json()

        if 'name' in data:
            product.name = data['name']
        if 'price' in data:
            product.price = data['price']
        if 'description' in data:
            product.description = data['description']
        if 'image_url' in data:
            product.image_url = data['image_url']
        if 'category_id' in data:
            product.category_id = data['category_id']

        db.session.commit()
        return product.serialize(), 200   

class OrderList(Resource):
    @jwt_required()
    def get(self):
        orders = [order.serialize() for order in Order.query.all()]  
        return orders, 200

    @jwt_required()
    def post(self):
        data = request.get_json()
        if not data:
            return {'message': 'No input data provided'}, 400

        if 'status' not in data:
            return {'message': {'status': 'Status is required'}}, 400
        if 'total_amount' not in data:
            return {'message': {'total_amount': 'Total amount is required'}}, 400
        if 'order_items' not in data or not data['order_items']:
            return {'message': {'order_items': 'Order items are required'}}, 400

        user_id = get_jwt_identity()['id']

        new_order = Order(
            user_id=user_id,
            status=data['status'],
            total_amount=data['total_amount']
        )

        db.session.add(new_order)
        db.session.commit()  # Commit the order first to get an ID

        for item in data['order_items']:
            if 'product_id' not in item or 'quantity' not in item or 'price' not in item:
                db.session.rollback()
                return {'message': {'order_items': 'Each item must have product_id, quantity, and price'}}, 400

            product = Product.query.get(item['product_id'])
            if not product:
                db.session.rollback()
                return {'message': {'product_id': f'Product ID {item["product_id"]} not found'}}, 404

            order_item = OrderItem(
                order_id=new_order.id,  # Use the ID of the newly created order
                product_id=item['product_id'],
                quantity=item['quantity'],
                price=item['price']
            )
            db.session.add(order_item)

        db.session.commit()  # Commit all order items after adding them

        return new_order.serialize(), 201

class OrderByID(Resource):
    @jwt_required()
    def get(self, id):
        order = Order.query.get_or_404(id)
        order_items = OrderItem.query.filter_by(order_id=order.id).all()
        items_with_details = []
        
        for item in order_items:
            product = Product.query.get_or_404(item.product_id)
            items_with_details.append({
                'product_id': product.id,
                'product_name': product.name,
                'quantity': item.quantity,
                'price': item.price,
                'total': item.quantity * item.price
            })

        return {
            'order_id': order.id,
            'status': order.status,
            'total_amount': order.total_amount,
            'items': items_with_details
        }, 200

    @jwt_required()
    def patch(self, id):
        order = Order.query.get_or_404(id)
        data = request.get_json()

        if 'status' in data:
            order.status = data['status']
        
        if 'total_amount' in data:
            order.total_amount = data['total_amount']

        if 'order_items' in data:
            for item in data['order_items']:
                order_item = OrderItem.query.filter_by(id=item['id'], order_id=order.id).first()
                if order_item:
                    order_item.quantity = item.get('quantity', order_item.quantity)
                    order_item.price = item.get('price', order_item.price)

        db.session.commit()
        return order.serialize(), 200

    @jwt_required()
    def delete(self, id):
        order = Order.query.get_or_404(id)

        for item in order.order_items:
            db.session.delete(item)

        db.session.delete(order)
        db.session.commit()

        return '', 204



class UserOrders(Resource):
    @jwt_required()
    def get(self):
        user_id = get_jwt_identity()['id']  
       
        
     
        orders = Order.query.filter_by(user_id=user_id).all()

 
        user_orders = []
        for order in orders:
            order_items = OrderItem.query.filter_by(order_id=order.id).all()
            items_with_details = [
                {
                    'product_id': item.product_id,
                    'product_name': Product.query.get(item.product_id).name,
                    'quantity': item.quantity,
                    'price': item.price,
                    'total': item.quantity * item.price
                }
                for item in order_items
            ]
            user_orders.append({
                'order_id': order.id,
                'status': order.status,
                'total_amount': order.total_amount,
                'items': items_with_details
            })

        return user_orders, 200



class FarmerProductsResource(Resource):
    def get(self, id):       
        products = Product.query.filter_by(farmer_id=id).all()
        return [product.serialize() for product in products], 200


    




class Blogs(Resource):
    
    
    def get(self):
        blogs = [blog.serialize() for blog in BlogPost.query.all()]
        return blogs,200
    @jwt_required()
    def post(self):


        current_user = get_jwt_identity()

        data = request.get_json()
        if not data:
            return {'message': 'No input data provided'}, 400

        required_fields = ['title', 'content']
        for field in required_fields:
            if field not in data:
                return {'message': f'Missing field: {field}'}, 400

        new_blog_post = BlogPost(
            title=data['title'],
            content=data['content'],
            farmer_id=current_user['id']
        )

        db.session.add(new_blog_post)
        db.session.commit()

        return new_blog_post.serialize(), 201
        
class BlogByID(Resource):
    @jwt_required()
    def get(self, id):
        blog = BlogPost.query.get_or_404(id)
        return blog.serialize()
    
    @jwt_required()
    def delete(self, id):
       
        blog = BlogPost.query.get_or_404(id)
        current_user = get_jwt_identity()

      
        if blog.farmer_id != current_user['id']:
            return {'message': 'You do not have permission to delete this blog post.'}, 403

        db.session.delete(blog)
        db.session.commit()
        return '', 204
    
    @jwt_required()
    def patch(self, id):
       
        blog = BlogPost.query.get_or_404(id)
        current_user = get_jwt_identity()

      
        if blog.farmer_id != current_user['id']:
            return {'message': 'You do not have permission to update this blog post.'}, 403

        data = request.get_json()
        if 'title' in data:
            blog.title = data['title']
        if 'content' in data:
            blog.content = data['content']

        db.session.commit()
        return blog.serialize(), 200





 

  
api.add_resource(ProductList, '/products')
api.add_resource(ProductByID, '/products/<int:id>')
api.add_resource(OrderList, '/orders')
api.add_resource(UserOrders, '/user/orders')
api.add_resource(OrderByID, '/orders/<int:id>')


api.add_resource(FarmerProductsResource, '/farmer/products/<int:id>')


api.add_resource(Blogs, '/blogs')
api.add_resource(BlogByID, '/blogs/<int:id>')





