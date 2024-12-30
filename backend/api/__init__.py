#!/usr/bin/python3

"""Initilaization of the API"""


from flask import Flask
from .user_api import user_bp
from .skill_api import skill_bp

"""instanciation of the Flask app"""
app = Flask(__name__)

"""Registering blueprints"""
app.register_blueprint(user_bp, url_prefix='/api/v1/users')
app.register_blueprint(skill_bp, url_prefix='/api/v1/skills')

