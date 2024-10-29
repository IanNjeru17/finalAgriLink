from datetime import datetime
from db import db
from sqlalchemy_serializer import SerializerMixin

user_roles = db.Table('user_roles',
    db.Column('user_id', db.Integer, db.ForeignKey('users.id'), primary_key=True),
    db.Column('role_id', db.Integer, db.ForeignKey('roles.id'), primary_key=True)
)

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String, nullable=False)
    last_name = db.Column(db.String, nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)
    phone = db.Column(db.String, nullable=False)
    password = db.Column(db.String, nullable=False)
    role = db.Column(db.String, nullable=False) 
    
    roles = db.relationship('Role', secondary=user_roles, back_populates='users')
    orders = db.relationship('Order', back_populates='customer')
    products = db.relationship('Product', back_populates='farmer')
    blog_posts = db.relationship('BlogPost', back_populates='farmer', cascade='all, delete-orphan')

    serialize_rules = ('-password', '-orders.customer', '-products.farmer')  
    
    def serialize(self):
        return {
            'id': self.id,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'email': self.email,
            'phone': self.phone,
            'role': self.role,
        }

class Role(db.Model, SerializerMixin):
    __tablename__ = "roles"
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    
    users = db.relationship('User', secondary=user_roles, back_populates='roles')

    serialize_rules = ('-users.roles',)

class Order(db.Model, SerializerMixin):
    __tablename__ = 'orders'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    status = db.Column(db.String, nullable=False)
    total_amount = db.Column(db.Float, nullable=False)
    
    customer = db.relationship('User', back_populates='orders')
    order_items = db.relationship('OrderItem', back_populates='order')

    serialize_rules = ('-customer.orders',)  # Prevent recursion

    def serialize(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'status': self.status,
            'total_amount': self.total_amount,
            'order_items': [item.serialize() for item in self.order_items],  # Avoid recursion
            'customer_id': self.user_id,  # Only include user_id
        }

class OrderItem(db.Model, SerializerMixin):
    __tablename__ = 'order_items'
    
    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.Integer, db.ForeignKey('orders.id'), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    price = db.Column(db.Float, nullable=False)
    
    order = db.relationship('Order', back_populates='order_items')
    product = db.relationship('Product', back_populates='order_items')

    serialize_rules = ('-order.order_items', '-product.order_items')  # Prevent recursion

    def serialize(self):
        return {
            'id': self.id,
            'order_id': self.order_id,
            'product_id': self.product_id,
            'quantity': self.quantity,
            'price': self.price,
            'product': self.product.serialize() if self.product else None,  # Only serialize if product exists
        }

class Product(db.Model, SerializerMixin):
    __tablename__ = 'products'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey('categories.id'), nullable=True)
    price = db.Column(db.Float, nullable=True)
    description = db.Column(db.Text, nullable=True)
    image_url = db.Column(db.String, nullable=True)
    farmer_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=True) 
    
    category = db.relationship('Category', back_populates='products', lazy='joined')
    farmer = db.relationship('User', back_populates='products', lazy='joined')
    order_items = db.relationship('OrderItem', back_populates='product', lazy='joined')

    serialize_rules = ('-farmer.products',) 

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "price": self.price,
            "description": self.description,
            "image_url": self.image_url,
            "category_id": self.category_id,
            "farmer_id": self.farmer_id,
        }

class Category(db.Model, SerializerMixin):
    __tablename__ = 'categories'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, unique=True, nullable=False)
    
    products = db.relationship('Product', back_populates='category')

    serialize_rules = ('-products.category',)

class BlogPost(db.Model, SerializerMixin):
    __tablename__ = 'blog_posts'
    
    id = db.Column(db.Integer, primary_key=True)
    farmer_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    title = db.Column(db.String, nullable=False)
    content = db.Column(db.Text, nullable=False)
    date_created = db.Column(db.DateTime, default=datetime.utcnow)
    date_updated = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    farmer = db.relationship('User', back_populates='blog_posts')

    serialize_rules = ('-farmer.blog_posts',)  # Prevent recursion

    def serialize(self):
        return {
            'id': self.id,
            'farmer_id': self.farmer_id,
            'title': self.title,
            'content': self.content,
            'date_created': self.date_created.isoformat(),
            'date_updated': self.date_updated.isoformat(),
            'farmer': self.farmer.serialize() if self.farmer else None,
        }




class TokenBlocklist(db.Model, SerializerMixin):
    __tablename__ = 'token_blocklist'
    
    id = db.Column(db.Integer, primary_key=True)
    jti = db.Column(db.String, unique=True, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    serialize_rules = ()
