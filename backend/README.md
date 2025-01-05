# Flask JWT Authentication API

A Flask REST API with JWT authentication and skill management system. Users can register, login, manage their skills, and search for other users based on skills.

## Features

- JWT Authentication (Access & Refresh Tokens)
- User Registration and Login
- Skill Management System
- User Search by Skills
- Token Blacklisting for Logout

## Prerequisites

- Python 3.x
- pip (Python package installer)

## Installation

1. Clone the repository
```bash
git clone <repository-url>
cd <repository-name>
```

2. Create and activate a virtual environment
```bash
# Windows
python -m venv venv
venv\Scripts\activate

# Linux/MacOS
python3 -m venv venv
source venv/bin/activate
```

3. Install dependencies
```bash
pip install -r requirements.txt
```

4. Create a `.env` file in the root directory with the following contents:
```env
# Flask Environment Configuration
FLASK_SECRET_KEY=your_secret_key_here
FLASK_DEBUG=True
FLASK_APP=main.py
FLASK_SQLALCHEMY_DATABASE_URI=sqlite:///db.sqlite3
FLASK_SQLALCHEMY_ECHO=True
FLASK_JWT_SECRET_KEY=your_jwt_secret_key_here
```
Replace `your_secret_key_here` and `your_jwt_secret_key_here` with secure random strings.

## Running the Application

1. Ensure your virtual environment is activated
2. Run the Flask application:
```bash
flask run
```

The API will be available at `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user
- `GET /auth/whoami` - Get current user info
- `GET /auth/refresh` - Refresh access token
- `GET /auth/logout` - Logout user

### Skills
- `POST /skills/add` - Add skill to current user
- `DELETE /skills/remove/<skill_name>` - Remove skill from current user
- `GET /skills/my-skills` - Get current user's skills
- `GET /skills/search?skills=skill1,skill2` - Search users by ANY of the specified skills
- `GET /skills/search-all?skills=skill1,skill2` - Search users by ALL specified skills

### Users
- `GET /users/all` - Get all users (admin only)

## Request Examples

### Register User
```bash
curl -X POST http://localhost:5000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password":"password123"}'
```

### Login
```bash
curl -X POST http://localhost:5000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"password123"}'
```

### Add Skill
```bash
curl -X POST http://localhost:5000/skills/add \
  -H "Authorization: Bearer <your_access_token>" \
  -H "Content-Type: application/json" \
  -d '{"skill_name":"python"}'
```

## Development

To generate secure keys, you can use Python:
```python
import secrets
print(secrets.token_hex(24))
```

## Database

The application uses SQLite by default. The database file will be created automatically in the `instance` folder when you first run the application.

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## Contact
For any inquiries, please contact:

- Author: Kelvin Mukaria
- Email: kevngariwangui@gmail.com
- LinkedIn: [Kelvin Mukaria](https://www.linkedin.com/in/v3k/)
- Location: Nairobi, Kenya
