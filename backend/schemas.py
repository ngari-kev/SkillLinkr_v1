from marshmallow import fields, Schema


class SkillSchema(Schema):
    id = fields.String()
    name = fields.String()


class UserSchema(Schema):
    id = fields.String()
    username = fields.String()
    email = fields.String()
    skills = fields.Nested(SkillSchema, many=True)
