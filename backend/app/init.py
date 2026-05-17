from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager

from app.config import Config
from app.database import db
from app.routes.auth_routes import auth_routes
from app.routes.task_routes import task_routes

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    CORS(app)

    db.init_app(app)

    JWTManager(app)

    app.register_blueprint(task_routes)
    app.register_blueprint(auth_routes)

    with app.app_context():
        db.create_all()

    return app