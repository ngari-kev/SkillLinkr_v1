from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, current_user
from models import Skill, User
from schemas import UserSchema
from extensions import db

skills_bp = Blueprint('skills', __name__)

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
def search_users_by_skills():
    """
    Search for users based on multiple skills (OR logic)
    """
    skill_names = request.args.get('skills', '').split(',')
    skill_names = [name.strip().lower() for name in skill_names if name.strip()]

    if not skill_names:
        return jsonify({"error": "No skills provided"}), 400

    users = User.query.join(User.skills).filter(
        db.func.lower(Skill.name).in_(skill_names)
    ).distinct().all()

    if not users:
        return jsonify({"users": [], "total_users": 0}), 200

    result = []
    for user in users:
        user_skills = [{"name": skill.name} for skill in user.skills]
        result.append({
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "skills": user_skills
        })

    return jsonify({
        "users": result,
        "total_users": len(result)
    }), 200

@skills_bp.get('/search-all')
def search_users_by_all_skills():
    """
    Search for users who have ALL of the specified skills (AND logic)
    """
    skill_names = request.args.get('skills', '').split(',')
    skill_names = [name.strip().lower() for name in skill_names if name.strip()]

    if not skill_names:
        return jsonify({"error": "No skills provided"}), 400

    query = User.query

    for skill_name in skill_names:
        query = query.join(User.skills).filter(db.func.lower(Skill.name) == skill_name)

    users = query.distinct().all()

    if not users:
        return jsonify({"users": [], "total_users": 0}), 200

    result = []
    for user in users:
        user_skills = [{"name": skill.name} for skill in user.skills]
        result.append({
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "skills": user_skills
        })

    return jsonify({
        "users": result,
        "total_users": len(result)
    }), 200

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
