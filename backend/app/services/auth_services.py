from app.models.user import User
from app.database import db
from werkzeug.security import generate_password_hash, check_password_hash

def create_user(username, password):
    hashed_password = generate_password_hash(password)

    user = User(username=username, password=hashed_password)

    db.session.add(user)
    db.session.commit()

    return user

def get_user_by_username(username):
    return User.query.filter_by(username=username).first()

def verify_password(user, password):
    return check_password_hash(user.password, password)