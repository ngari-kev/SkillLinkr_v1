from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt, current_user
from models import User
from schemas import UserSchema
from uploads import upload_image
from extensions import db


user_bp = Blueprint('users', __name__)


@user_bp.get('/all')
@jwt_required()
def get_all_users():
    claims = get_jwt()
    if claims.get('is_dev'):
        page = request.args.get('page', default=1, type=int)
        per_page = request.args.get('per_page', default=3, type=int)
        users = User.query.paginate(
            page = page,
            per_page = per_page,
        )

        result = UserSchema().dump(users, many=True)

        return jsonify({
            "users":result,
        }), 200

    return jsonify({
        "message":"Unauthorized access"
    }), 401

@user_bp.route('upload-photo', methods=['POST'])
@jwt_required()
def upload_photo():
    if 'profile_image' not in request.files:
            return jsonify({'error': 'No file part'}), 400

    file = request.files['profile_image']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    try:
        image_url = upload_image(file)
        current_user.profile_photo = image_url
        db.session.commit()

        return jsonify({
            'message': 'File uploaded successfully',
            'image_url': image_url
        }), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500
