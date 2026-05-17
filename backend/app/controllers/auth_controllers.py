from flask import request, jsonify
from flask_jwt_extended import create_access_token

from app.services.auth_services import create_user, get_user_by_username, verify_password

def register():
    data = request.get_json()

    username = data.get("username")
    password = data.get("password")

    if not username or not password:
        return jsonify({"error": "Missing fields"}), 400

    if get_user_by_username(username):
        return jsonify({"error": "User already exists"}), 400

    user = create_user(username, password)

    return jsonify({
        "message": "User created",
        "user": user.username
    }), 201

def login():
    data = request.get_json()

    username = data.get("username")
    password = data.get("password")

    user = get_user_by_username(username)

    if not user or not verify_password(user, password):
        return jsonify({"error": "Invalid credentials"}), 401

    token = create_access_token(identity=str(user.id))

    return jsonify({
        "access_token": token
    }), 200