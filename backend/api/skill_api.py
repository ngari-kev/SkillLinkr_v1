#!/usr/bin/python3
"""Skill-related API endpoints."""

from flask import Blueprint, jsonify, request, abort
from models import storage
from models.skill import Skill

skill_bp = Blueprint('skill_api', __name__)

@skill_bp.route('/', methods=['GET'])
def get_skills():
    """Retrieve all skills."""
    skills = storage.all()
    skill_list = [obj.to_dict() for obj in skills.values() if isinstance(obj, Skill)]
    return jsonify(skill_list)

@skill_bp.route('/<skill_id>', methods=['GET'])
def get_skill(skill_id):
    """Retrieve a specific skill by ID."""
    skill = next((s for s in storage.all().values() if isinstance(s, Skill) and s.id == skill_id), None)
    if skill is None:
        abort(404)
    return jsonify(skill.to_dict())

@skill_bp.route('/', methods=['POST'])
def create_skill():
    """Create a new skill."""
    data = request.get_json()
    if not data or 'name' not in data:
        abort(400, description="Missing required field: name")

    skill = Skill(name=data['name'], description=data.get('description'))
    storage.new(skill)
    storage.save()
    return jsonify(skill.to_dict()), 201

@skill_bp.route('/<skill_id>', methods=['PUT'])
def update_skill(skill_id):
    """Update a specific skill's details."""
    skill = next((s for s in storage.all().values() if isinstance(s, Skill) and s.id == skill_id), None)
    if skill is None:
        abort(404)

    data = request.get_json()
    for key, value in data.items():
        if key not in ['id', 'created_at', 'updated_at']:
            setattr(skill, key, value)
    skill.save()
    return jsonify(skill.to_dict())

@skill_bp.route('/<skill_id>', methods=['DELETE'])
def delete_skill(skill_id):
    """Delete a specific skill by ID."""
    skill = next((s for s in storage.all().values() if isinstance(s, Skill) and s.id == skill_id), None)
    if skill is None:
        abort(404)

    del storage.all()[f"Skill.{skill.id}"]
    storage.save()
    return jsonify({}), 200

