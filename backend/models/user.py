#!/usr/bin/python3

"""
    This module defines the User object and the methods that
    apply to the class objects
"""

from models.base import Base


class User(Base):
    """Defines User Object"""
    def __init__(self, name="", email="", bio=None, location=None, skills=None, **kwargs):
        """Constructor"""
        super().__init__(**kwargs)
        self.name = name
        self.email = email
        self.bio = bio
        self.location = location
        self.skills = skills or []

    def add_skill(self, skill):
        """Add a skill to the user's profile."""
        self.skills.append(skill)

    def remove_skill(self, skill):
        """Remove a skill from the user's profile."""
        self.skills.remove(skill)

    def get_skills(self):
        """Retrieve the user's skills."""
        return self.skills

    def to_dict(self):
        """Extend the base to_dict method."""
        base_dict = super().to_dict()
        base_dict.update({
            'name': self.name,
            'email': self.email,
            'bio': self.bio,
            'location': self.location,
            'skills': [skill.to_dict() for skill in self.skills]
        })
        return base_dict

