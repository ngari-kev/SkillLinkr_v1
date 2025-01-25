from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, current_user
from models import Skill, User
from schemas import UserSchema
from extensions import db

skills_bp = Blueprint('skills', __name__)


def serialize_user(user):
    """Serializes a User object into a dictionary, optionally including skills."""
    return UserSchema().dump(user)


@skills_bp.get('/my-skills')
@jwt_required()
def get_my_skills():
    """Get current user's skills"""
    user = current_user
    if not user:
        return jsonify({"error": "User not found"}), 404

    skills = [{"id": skill.id, "name": skill.name} for skill in user.skills]
    return jsonify({
        "message": "Skills retrieved successfully",
        "skills": skills
    }), 200


@skills_bp.post('/add')
@jwt_required()
def add_skill():
    """Add a skill to the current user's profile"""
    data = request.get_json()
    if not data or 'skill_name' not in data:
        return jsonify({"error": "Skill name is required"}), 400

    skill_name = data.get('skill_name')

    skill = Skill.query.filter_by(name=skill_name).first()
    if not skill:
        skill = Skill(name=skill_name)
        skill.save()

    current_user.add_skill(skill)

    return jsonify({
        "message": "Skill added successfully",
        "user": UserSchema().dump(current_user)
    }), 200


@skills_bp.delete('/remove/<string:skill_name>')
@jwt_required()
def remove_skill(skill_name):
    """Remove a skill from the current user's profile"""
    skill = Skill.query.filter_by(name=skill_name).first()
    if not skill:
        return jsonify({"error": "Skill not found"}), 404

    current_user.remove_skill(skill)

    return jsonify({
        "message": "Skill removed successfully",
        "user": UserSchema().dump(current_user)
    }), 200


@skills_bp.get('/search')
@jwt_required()
def search_users():
    """Search for users based on multiple skills (OR logic) with pagination"""
    skill_names = request.args.get('skills', '').split(',')
    skill_names = [name.strip().lower() for name in skill_names if name.strip()]
    page = request.args.get('page', default=1, type=int)
    per_page = request.args.get('per_page', default=4, type=int)


    if not skill_names:
        return jsonify({"error": "No skills provided"}), 400

    users_query = User.query.join(User.skills).filter(
        db.func.lower(Skill.name).in_(skill_names)
    ).distinct()

    pagination = users_query.paginate(
        page=page,
        per_page=per_page,
        error_out=False
    )


    result = []
    for user in pagination.items:
        user_skills = [{"name": skill.name} for skill in user.skills]
        matching_skills = [skill.name.lower() for skill in user.skills
                         if skill.name.lower() in skill_names]
        result.append({
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "skills": user_skills,
            "matching_skills": matching_skills
        })


    api_res = {
        "users": result,
        "total_pages": pagination.pages,
        "current_page": pagination.page,
        "total_items": pagination.total
    }


    return jsonify(api_res), 200



@skills_bp.get('/search-all')
@jwt_required()
def search_users_all():
    """Search for users who have ALL of the specified skills (AND logic) with pagination"""
    skill_names = request.args.get('skills', '').split(',')
    skill_names = [name.strip().lower() for name in skill_names if name.strip()]
    page = request.args.get('page', default=1, type=int)
    per_page = request.args.get('per_page', default=4, type=int)


    if not skill_names:
         return jsonify({"error": "No skills provided"}), 400


    query = User.query

    for skill_name in skill_names:
        query = query.join(User.skills).filter(db.func.lower(Skill.name) == skill_name)

    users_query = query.distinct()

    pagination = users_query.paginate(
        page=page,
        per_page=per_page,
        error_out=False
    )


    result = []
    for user in pagination.items:
        user_skills = [{"name": skill.name} for skill in user.skills]
        matching_skills = [skill.name.lower() for skill in user.skills
                        if skill.name.lower() in skill_names]
        result.append({
           "id": user.id,
            "username": user.username,
            "email": user.email,
            "skills": user_skills,
            "matching_skills": matching_skills
        })


    api_res = {
        "users": result,
        "total_pages": pagination.pages,
        "current_page": pagination.page,
        "total_items": pagination.total
    }


    return jsonify(api_res), 200
