from flask_socketio import SocketIO, emit, disconnect
from flask_jwt_extended import decode_token
from flask import request
import jwt

socketio = SocketIO(cors_allowed_origins="*", logger=True, engineio_logger=True)

# Store active users and their socket IDs
active_users = {}

@socketio.on('connect')
def handle_connect():
    try:
        token = request.args.get('token')
        print(f"Raw token received: {token}")

        if not token:
            print("No token provided")
            return False

        # Decode token to get username
        try:
            decoded_token = decode_token(token)
            print(f"Decoded token: {decoded_token}")
            username = decoded_token['sub']

            is_blocklisted = TokenBlocklist.query.filter_by(jti=decoded_token['jti']).first is None
            if is_blocklisted:
                print(f"Token for {username} is blocklisted")
                return False

            # Store user's socket ID
            active_users[username] = request.sid
            print(f"User connected: {username}")
            print(f"Active users: {active_users}")

            # Emit updated user list to all clients
            emit('users_update', list(active_users.keys()), broadcast=True)
            return True

        except jwt.ExpiredSignatureError:
            print("Token expired")
            return False
        except jwt.InvalidTokenError:
            print("Invalid token")
            return False

    except Exception as e:
        print(f"Connection error: {e}")
        return False

@socketio.on('disconnect')
def handle_disconnect():
    try:
        # Remove user from active users
        username = next((user for user, sid in active_users.items() if sid == request.sid), None)
        if username:
            del active_users[username]
            print(f"User disconnected: {username}")
            print(f"Active users: {active_users}")
            emit('users_update', list(active_users.keys()), broadcast=True)
    except Exception as e:
        print(f"Disconnect error: {e}")

@socketio.on_error()
def error_handler(e):
    print(f"SocketIO error: {e}")
