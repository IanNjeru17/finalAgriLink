from datetime import datetime
from db import db
from models import User, Role, Order, OrderItem, Product, Category

def seed_data():
  
    farmer_role = Role(name='Farmer')
    customer_role = Role(name='Customer')
    
    db.session.add_all([farmer_role, customer_role])
    db.session.commit()

    farmer_user = User(
        first_name='Homes',
        last_name='Allan',
        email='allan@example.com',
        phone='0987654321',
        password='hashed_password', 
        role='farmer'
    )

    customer_user = User(
        first_name='Owen',
        last_name='Wilson',
        email='owen@example.com',
        phone='5555555555',
        password="hashed_password",
        role='customer'
    )

    db.session.add_all([farmer_user, customer_user])
    db.session.commit()

   
    farmer_user.roles.append(farmer_role)
    customer_user.roles.append(customer_role)
    db.session.commit()

   
    category_fruits = Category(name='Poultry')
    category_vegetables = Category(name='Grains')

    db.session.add_all([category_fruits, category_vegetables])
    db.session.commit()

   
    product_apple = Product(
        name='Apple',
        category_id=category_fruits.id, 
        price=0.5,
        description='Fresh red apples.',
        image_url='https://upload.wikimedia.org/wikipedia/commons/1/15/Red_Apple.jpg', 
        farmer_id=farmer_user.id 
    )

    product_carrot = Product(
        name='Carrot',
        category_id=category_vegetables.id, 
        price=0.3,
        description='Organic carrots.',
        image_url='https://upload.wikimedia.org/wikipedia/commons/5/5b/Carrot_with_top.jpg',  
        farmer_id=farmer_user.id  
    )

    db.session.add_all([product_apple, product_carrot])
    db.session.commit()

    
    order = Order(
        user_id=customer_user.id, 
        status='Pending',
        total_amount=1.8 
    )

    db.session.add(order)
    db.session.commit()

   
    order_item_1 = OrderItem(
        order_id=order.id, 
        product_id=product_apple.id,  
        quantity=3,
        price=product_apple.price
    )

    order_item_2 = OrderItem(
        order_id=order.id,
        product_id=product_carrot.id, 
        quantity=2,
        price=product_carrot.price
    )

    db.session.add_all([order_item_1, order_item_2])
    db.session.commit()

if __name__ == '__main__':
    from app import create_app  
    app = create_app() 
    with app.app_context():
        seed_data()
