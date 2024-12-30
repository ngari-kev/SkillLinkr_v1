#!/usr/bin/python3
"""User-related API endpoints."""

from flask import Blueprint, jsonify, request, abort
from models import storage
from models.user import User

user_bp = Blueprint('user_api', __name__)

@user_bp.route('/login', methods=['POST'])
def login():
    """Logging in function"""
    msg = "User logging in"
    print(msg)
    return jsonify(msg)

@user_bp.route('/', methods=['GET'])
def get_users():
    """Retrieve all users."""
    users = storage.all()
    user_list = [obj.to_dict() for obj in users.values() if isinstance(obj, User)]
    return jsonify(user_list)

@user_bp.route('/<user_id>', methods=['GET'])
def get_user(user_id):
    """Retrieve a specific user by their ID."""
    user = next((u for u in storage.all().values() if isinstance(u, User) and u.id == user_id), None)
    if user is None:
        abort(404)
    return jsonify(user.to_dict())

@user_bp.route('/', methods=['POST'])
def create_user():
    """Create a new user."""
    data = request.get_json()
    if not data or 'name' not in data or 'email' not in data:
        abort(400, description="Missing required fields: name and email")

    user = User(name=data['name'], email=data['email'], bio=data.get('bio'), location=data.get('location'))
    storage.new(user)
    storage.save()
    return jsonify(user.to_dict()), 201

@user_bp.route('/<user_id>', methods=['PUT'])
def update_user(user_id):
    """Update a specific user's details."""
    user = next((u for u in storage.all().values() if isinstance(u, User) and u.id == user_id), None)
    if user is None:
        abort(404)

    data = request.get_json()
    for key, value in data.items():
        if key not in ['id', 'created_at', 'updated_at']:
            setattr(user, key, value)
    user.save()
    return jsonify(user.to_dict())

@user_bp.route('/<user_id>', methods=['DELETE'])
def delete_user(user_id):
    """Delete a specific user by their ID."""
    user = next((u for u in storage.all().values() if isinstance(u, User) and u.id == user_id), None)
    if user is None:
        abort(404)

    del storage.all()[f"User.{user.id}"]
    storage.save()
    return jsonify({}), 200
