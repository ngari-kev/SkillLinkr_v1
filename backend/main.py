
#!/usr/bin/python3

"""
This module contains the Flask application factory and JWT configuration.

The create_app() function serves as a factory that initializes and configures
a Flask application with JWT authentication, database connections, and error handlers.
"""

from flask import Flask
from flask.json import jsonify
from extensions import db, jwt
from auth import auth_bp
from skills import skills_bp
from users import user_bp
from chat import socketio
from models import User, TokenBlockList
from flask_cors import CORS



def create_app():
    """
    Factory function that creates and configures a Flask application instance.

    Returns:
        Flask: Configured Flask application instance
    """
    '''Create a new Flask application instance'''
    app = Flask(__name__)
    CORS(app, resources={
        r"/auth/*": {"origins":
        "https://skilllinkr.ngarikev.tech"},
        r"/socket.io/*": {
            "origins": ["https://skilllinkr.ngarikev.tech"],
            "allow_headers": ["*"],
            "expose_headers":["*"],
            "methods": ["GET", "POST", "OPTIONS"],
            "supports_credentials": True
        }
    })

    # Load environment variables prefixed with "FLASK_" from .env file
    # Example: FLASK_SECRET_KEY=xyz will be loaded as app.config["SECRET_KEY"]
    app.config.from_prefixed_env()

    # Initialize the database with the Flask application
    # This connects the database instance to this specific Flask app
    db.init_app(app)
    jwt.init_app(app)
    socketio.init_app(app,
        cors_allowed_origins=["*"],
        path="/socket.io",
        ping_timeour=5000,
        ping_interval=25000,
        async_mode="gevent",
        websocket=True
    )

    #health check for server
    @app.route('/health')
    def health_check():
        return jsonify({"status": "healthy"}), 200

    #register blueprint
    app.register_blueprint(auth_bp, url_prefix='/auth')
    app.register_blueprint(user_bp, url_prefix='/users')
    app.register_blueprint(skills_bp, url_prefix='/skills')

    #load user
    @jwt.user_lookup_loader
    def user_lookup_callback(_jwt_headers, jwt_data):
        """
            Callback to load user object from database based on JWT identity.

            Args:
                _jwt_headers: JWT header information
                jwt_data: JWT payload data

            Returns:
                User: User object if found, None otherwise
        """
        identity = jwt_data['sub']
        return User.query.filter_by(username = identity).one_or_none()

    #additional jwt claims
    @jwt.additional_claims_loader
    def make_additional_claims(identity):
        """
            Adds custom claims to JWT tokens based on user identity.

            Args:
                identity: User identity from JWT

            Returns:
                dict: Custom claims to add to JWT
        """
        if identity == "kev":
            return {"is_dev":True}
        return {"is_dev":False}

    #jwt error handlers
    @jwt.expired_token_loader
    def expired_token_callback(jwt_header, jwt_data):
        """
            Handler for expired JWT tokens.

                Args:
                    jwt_header: JWT header information
                    jwt_data: JWT payload data

                Returns:
                    tuple: JSON response with 401 status code
        """
        return jsonify({
            "message":"Token has expired",
            "error":"token_expired"
        }), 401

    @jwt.invalid_token_loader
    def invalid_token_callback(error):
        """
            Handler for invalid JWT tokens.

            Args:
                error: Error information

            Returns:
                tuple: JSON response with 401 status code
        """
        return jsonify({
            "message":"Signature verification failed",
            "error":"invalid_token"
        }), 401

    @jwt.unauthorized_loader
    def missing_token_callback(error):
        """
            Handler for missing JWT tokens.

            Args:
                error: Error information

            Returns:
                tuple: JSON response with 401 status code
            """
        return jsonify({
            "message":"Request does not contain a valid token",
            "error":"authorization _required"
        }), 401

    @jwt.token_in_blocklist_loader
    def token_in_blocklist_callback(jwt_header, jwt_data):
        """Checks if a JWT token has been blocklisted.

               Args:
                   jwt_header: JWT header information
                   jwt_data: JWT payload data

               Returns:
                   bool: True if token is blocklisted, False otherwise
        """
        jti = jwt_data['jti']

        token = db.session.query(TokenBlockList).filter(TokenBlockList.jti == jti).scalar()

        return token is not None

    with app.app_context():
        db.create_all()

    return app

app = create_app()

if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=5000, allow_unsafe_werkzeug=True)
