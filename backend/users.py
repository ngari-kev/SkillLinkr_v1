from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt, current_user
from models import User
from schemas import UserSchema


user_bp = Blueprint('users', __name__)

def serialize_user(user):
    """Serializes a User object into a dictionary, optionally including skills."""
    return UserSchema().dump(user)

@user_bp.get('/all')
@jwt_required()
def get_all_users():
    """Returns a paginated list of all users."""
    page = request.args.get('page', default=1, type=int)
    per_page = request.args.get('per_page', default=4, type=int)

    pagination = User.query.paginate(
        page=page,
        per_page=per_page,
        error_out=False
    )

    serialized_users = [serialize_user(user) for user in pagination.items]

    return jsonify({
        "users": serialized_users,
        "total_pages": pagination.pages,
        "current_page": pagination.page,
        "total_items": pagination.total
    }), 200
