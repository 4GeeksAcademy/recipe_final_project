"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from api.models import db, User
from api.utils import generate_sitemap, APIException

api = Blueprint('api', __name__)

@api.route("/signup", methods=["POST"])
def signup():
    email = request.json.get("email", None)
    username = request.json.get("username", None)
    password = request.json.get("password", None)

    existing_user_email = User.query.filter_by(email=email).first()
    existing_user_username = User.query.filter_by(username=username).first()
    if existing_user_email is not None or existing_user_username is not None:
        return jsonify({"msg": "email or username already in use"}), 401
    
    user = User(
        email=email,
        username=username,
        password=password,
        is_active=True
    )

    db.session.add(user)
    db.session.commit()

    return jsonify({"msg": "user created correctly"}), 200

@api.route("/login", methods=["POST"])
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    
    user = User.query.filter_by(email=email, password=password).first()
    if user is None:
        return jsonify({"msg": "Bad username or password"}), 401
    
    access_token = create_access_token(identity=user.id)
    return jsonify({ "token": access_token, "user_id": user.id })

@api.route("/resetpassword", methods=["POST"])
@jwt_required()
def reset_password():
    email = get_jwt_identity()
    print(email)
    password = request.json.get("password", None)

    user = User.query.filter_by(email=email).first()
    if user is None:
        return jsonify({"msg": "User with this email doesn't exist"}), 401
    
    user.password = password
    db.session.commit()

    return jsonify({ "msg": "success" }), 200