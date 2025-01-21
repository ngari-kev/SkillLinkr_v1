from main import create_app
from models import User, Skill, db
from uuid import uuid4

def create_test_data():
    # Create skills
    skills_data = [
        {'name': 'Python'},
        {'name': 'Java'},
        {'name': 'JavaScript'},
        {'name': 'React'},
        {'name': 'Node.js'},
        {'name': 'SQL'},
        {'name': 'MongoDB'},
        {'name': 'DevOps'},
        {'name': 'Machine Learning'},
        {'name': 'Cloud Computing'}
    ]

    skills = {}
    for skill_data in skills_data:
        existing_skill = Skill.query.filter_by(name=skill_data['name']).first()
        if not existing_skill:
            skill = Skill(id=skill_data['id'], name=skill_data['name'])
            db.session.add(skill)
            skills[skill_data['name']] = skill
        else:
            skills[skill_data['name']] = existing_skill

    users_data = [
        {
            'username': 'sophia_dev',
            'email': 'sophia@example.com',
            'password': 'sop',
            'skills': ['Python', 'JavaScript', 'React']
        },
        {
            'username': 'alex_coder',
            'email': 'alex@example.com',
            'password': 'ale',
            'skills': ['Java', 'SQL', 'DevOps']
        },
        {
            'username': 'michael_tech',
            'email': 'michael@example.com',
            'password': 'mic',
            'skills': ['Node.js', 'MongoDB', 'JavaScript']
        },
        {
            'username': 'jessica_dev',
            'email': 'jessica@example.com',
            'password': 'jes',
            'skills': ['Machine Learning', 'Python', 'SQL']
        },
        {
            'username': 'david_code',
            'email': 'david@example.com',
            'password': 'dav',
            'skills': ['Cloud Computing', 'DevOps', 'Java']
        }
    ]

    for user_data in users_data:
        existing_user = User.query.filter_by(username=user_data['username']).first()
        if not existing_user:
            user = User(
                username=user_data['username'],
                email=user_data['email']
            )
            user.set_password(user_data['password'])

            for skill_name in user_data['skills']:
                user.skills.append(skills[skill_name])

            db.session.add(user)
            print(f"Created user: {user_data['username']}")
        else:
            print(f"User {user_data['username']} already exists")

    try:
        db.session.commit()
        print("Test data created successfully!")
    except Exception as e:
        db.session.rollback()
        print(f"Error creating test data: {str(e)}")

if __name__ == "__main__":
    app = create_app()
    with app.app_context():
        create_test_data()
