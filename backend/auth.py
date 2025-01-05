#!/usr/bin/python3

"""
Authentication Blueprint for Flask Application
This module handles user authentication routes including registration, login, identity verification, and token refresh.

Routes:
-------
/register (POST)
    Registers a new user in the system.

/login (POST)
    Authenticates a user and provides JWT access and refresh tokens.

/whoami (GET)
    Returns current authenticated user's details.

/refresh (GET)
    Generates a new access token using a valid refresh token.
"""

from flask import Blueprint, jsonify, request
from models import User, TokenBlockList
from flask_jwt_extended import create_access_token, create_refresh_token, jwt_required, current_user, get_jwt_identity, get_jwt

auth_bp = Blueprint('auth', __name__)

@auth_bp.post('/register')
def register_user():
    """
        Handles user registration.

        Expects JSON payload with:
        - username: string
        - email: string
        - password: string

        Returns:
        - 201: User successfully created
        - 403: Username already exists
    """

    data = request.get_json()
    user = User.get_user_by_username(username = data.get('username'))

    if user is not None:
        return jsonify({"error":"user already exists"}), 403

    username = data.get('username')
    email = data.get('email')

    new_user = User(username=username, email=email)

    new_user.set_password(password=data.get('password'))
    new_user.save()

    return jsonify ({"message":"User created"}), 201

@auth_bp.post('/login')
def login_user():
    """
        Handles user authentication.

        Expects JSON payload with:
        - username: string
        - password: string

        Returns:
        - 200: Successfully authenticated, returns access and refresh tokens
        - 400: Invalid credentials
    """

    data = request.get_json()

    user = User.get_user_by_username(username=data.get('username'))

    if user and (user.check_password(password = data.get('password'))):
        access_token = create_access_token(identity=user.username)
        refresh_token = create_refresh_token(identity=user.username)
        return jsonify(
            {
                "message":"Logged in",
                "tokens":{
                    "access":access_token,
                    "refresh":refresh_token
                }
            }
        ), 200

    return jsonify({"error":"Invalid username or password"}), 400

@auth_bp.get('/whoami')
@jwt_required()
def whoami():
    """
        Returns authenticated user's information.
        Requires valid JWT access token.

        Returns:
        - JSON object containing username and email of current user
    """

    return jsonify({
        "username":current_user.username,
        "email":current_user.email
    })

@auth_bp.get('/refresh')
@jwt_required(refresh=True)
def refresh_access():
    """
        Generates new access token using refresh token.
        Requires valid JWT refresh token.

        Returns:
        - JSON object containing username and new access token
    """

    identity = get_jwt_identity()
    new_access_token = create_access_token(identity = identity)
    return jsonify({
        "username":identity,
        "access_token":new_access_token
    })

@auth_bp.get('/logout')
@jwt_required()
def logout_user():
    jti = get_jwt()['jti']
    # jti = jwt['jti']
    token_to_blacklist = TokenBlockList(jti=jti)
    token_to_blacklist.save()

    return jsonify({
        "message":"Logged out sucessfully"
    }), 200