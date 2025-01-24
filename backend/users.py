from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt, current_user
from models import User
from schemas import UserSchema
from extensions import db


user_bp = Blueprint('users', __name__)


@user_bp.get('/all')
@jwt_required()
def get_all_users():
    page = request.args.get('page', default=1, type=int)
    per_page = request.args.get('per_page', default=4, type=int)

    pagination = User.query.paginate(
        page=page,
        per_page=per_page,
        error_out=False
    )

    return jsonify({
        "users": [user.to_dict() for user in pagination.items],
        "total_pages": pagination.pages,
        "current_page": pagination.page,
        "total_items": pagination.total
    }), 200
