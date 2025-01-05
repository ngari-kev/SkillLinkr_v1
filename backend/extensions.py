#!/usr/bin/python3

"""
Flask Extensions Configuration Module

This module initializes and configures Flask extensions used throughout the application.

Extensions:
    - SQLAlchemy (db): Database ORM for handling database operations
    - JWTManager (jwt): JSON Web Token manager for handling authentication

These extension instances are created here to avoid circular imports and are initialized
with the Flask application instance later using the init_app() pattern.
"""

from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager


db = SQLAlchemy()
jwt = JWTManager()
