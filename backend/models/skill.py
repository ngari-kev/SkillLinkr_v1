#!/usr/bin/python3

"""
    This module defines the Skill object and the methods that
    apply to the class objects
"""

from models.base import Base


class Skill(Base):
    """Defines Skill object"""
    def __init__(self, name, description=None, users=None, **kwargs):
        """Constructor"""
        super().__init__(**kwargs)
        self.name = name
        self.description = description
        self.users = users or []

    def add_user(self, user):
        """Add a user to this skill."""
        self.users.append(user)

    def remove_user(self, user):
        """Remove a user from this skill."""
        self.users.remove(user)

    def get_users(self):
        """Retrieve users associated with this skill."""
        return self.users

    def to_dict(self):
        """Extend the base to_dict method."""
        base_dict = super().to_dict()
        base_dict.update({
            'name': self.name,
            'description': self.description,
            'users': [user.to_dict() for user in self.users]
        })
        return base_dict

