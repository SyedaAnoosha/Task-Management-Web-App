from flask import Blueprint
from app.controllers.auth_controllers import register, login

auth_routes = Blueprint("auth_routes", __name__)

@auth_routes.route("/auth/register", methods=["POST"])
def register_route():
    return register()

@auth_routes.route("/auth/login", methods=["POST"])
def login_route():
    return login()