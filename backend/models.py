from datetime import datetime
from extensions import db
from uuid import uuid4
from werkzeug.security import generate_password_hash, check_password_hash

user_skills = db.Table(
    'user_skills',
    db.Column('user_id', db.String(), db.ForeignKey('users.id')),
    db.Column('skill_id', db.String(), db.ForeignKey('skills.id')))


class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.String(), primary_key=True, default = str(uuid4()))
    username = db.Column(db.String(), nullable=False)
    email = db.Column(db.String(), nullable=False)
    password = db.Column(db.Text())
    skills = db.relationship('Skill', secondary=user_skills, backref='users')

    def __init__(self, username, email):
        self.username = username
        self.email = email

    def __repr__(self):
        return f"<User {self.username}>"

    def set_password(self, password):
        self.password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    @classmethod
    def get_user_by_username(cls, username):
        return cls.query.filter_by(username= username).first()

    def add_skill(self, skill):
        if skill not in self.skills:
            self.skills.append(skill)
            self.save()

    def remove_skill(self, skill):
        if skill in self.skills:
            self.skills.remove(skill)
            self.save()

    def save(self):
        db.session.add(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()


class TokenBlockList(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    jti = db.Column(db.String(), nullable=False)
    created_at = db.Column(db.DateTime(), default=datetime.utcnow)

    def __repr__(self):
        return f"<Token {self.jti}>"

    def save(self):
        db.session.add(self)
        db.session.commit()


class Skill(db.Model):
    __tablename__ = 'skills'
    id = db.Column(db.String(), primary_key=True, default = str(uuid4()))
    name = db.Column(db.String(50), unique=True, nullable=False)

    def __repr__(self):
        return f"<Skill: {self.name}>"

    def save(self):
        db.session.add(self)
        db.session.commit()
